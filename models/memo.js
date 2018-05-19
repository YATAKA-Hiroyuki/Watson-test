// MemoApp – models\memo.js (メモリー版)





// トップ画面の表示
exports.list = function(callback) {

  process.nextTick(function() {
    callback(null);
  });
};


// test
exports.submit = function(arg, callback) {

  process.nextTick(function() {
    callback(null, arg);
  });
};
