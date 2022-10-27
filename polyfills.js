// MAP
Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};
// Filter
Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};
//  Reduce
Array.prototype.myReduce = function (cb, initialvalue) {
  let accumulator = initialvalue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
  }
  return accumulator;
};
//  Flat
Array.prototype.myFlat = function (depth) {
  let temp = [];
  function flattner(array, depth) {
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(i) && depth) {
        flattner(i, depth - 1);
      } else {
        temp.push(i);
      }
    }
  }
  flattner(this, depth);
  return temp;
};
// call
Function.prototype.myCall = function (context, ...args) {
  context.func = this;
  return context.func(...args);
};
//  apply
Function.prototype.myApply = function (context, args) {
  context.func = this;
  return context.func(...args);
};
// bind
Function.prototype.myBind = function (context, ...args) {
  context.func = this;
  return function (...args) {
    context.func(...args);
  };
};
// promise.all
Promise.prototype.myAll = function (promises) {
  let count = 0;
  let results = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          results[index] = data;
          count++;
          if (count === promises.length) return resolve(results);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
// promise.allsetteled
function myPromise(executor) {
  let onResolve,
    isFullfilled = false,
    isCalled = false,
    value;
  const resolve = function (val) {
    isFullfilled = true;
    value = val;
    if (typeof onResolve === "function" && !isCalled) {
      onResolve(value);
      isCalled = true;
    }
  };
  const reject = function () {};
  this.then = (cb) => {
    onResolve = cb;
    if (!isCalled && isFullfilled) {
      onResolve(value);
      isCalled = true;
    }
  };
  this.catch = () => {};
  executor(resolve, reject);
}
