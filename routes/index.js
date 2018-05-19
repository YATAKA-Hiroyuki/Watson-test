// MemoApp - routes\index.js

// (a)使用モジュールの読み込み
var express = require('express');
var uuid = require('node-uuid');
var moment = require('moment');
var memo = require('../models/memo');
var package = require('../package.json');
var async = require('async');

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  username: '8f3c04ad-d8f8-4437-8833-ee8845c39810',
  password: 'CVWN0S85kokE'
});


// (b)ルーターの作成
var router = express.Router();

// (1)メモ一覧の表示(ページ表示)
router.get('/', function(req, res) {
  memo.list(function(err) {
    res.render('index', {
      version: package.version,
      content: ""
    });
  });
});


// test
router.post('/submit', function(req, res) {



  console.log(req.body.message2);
  var content = {
    user_message: req.body.message2,
  };
  var msg = content.user_message;
  console.log("req=" + msg);
  // (watson-developer-cloud)


  var toneParams = {
    'tone_input': {
      'text': msg
    },
    'content_type': 'application/json'
  };

  async.waterfall([

    function(callback) {
      toneAnalyzer.tone(toneParams, function(error, analysis) {
        if (error) {
          console.log(error);
        } else {
          var result = JSON.stringify(analysis, null, 2);
          console.log("json result is -> " + result);
          callback(null, result);
        };

      });
    },
    function(arg1, callback) {

      console.log("arg = " + arg1);

      memo.submit(arg1, function(err, arg1) {

        console.log("start rendering");
        res.render('index', {
          content: arg1
        });
      });
    }
  ], function(err, results) {
    if (err) {
      console.log("err[" + err + "]");
    }
    console.log("result -> " + results);

  });

});





module.exports = router;
