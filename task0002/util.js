function isArray(arr) {
  // 实现一
  // return arr instanceof Array;
  
  // 实现二
  // return arr.constructor === Array;
  
  // 实现三
  return Object.prototype.toString.call(arr) === "[object Array]";
  
  // 实现四 需要浏览器支持
  // if( typeof Array.isArray === 'Function')
  return Array.isArray(arr);

}

function isFunction(fn) {
  // 实现一
  // return fn instanceof Function;

  // 实现二
  return typeof fn === 'function';

  // 实现三
  // return fn.constructor === Function;
}

function cloneObject(src) {
  var o;
  if(Object.prototype.toString.call(src) === "[object Array]") {
    // 判断该对象为 Array
    o = [];
  } else {
    // 判断该对象为 object
    o = {};
  }

  for(i in src) {
    if(src.hasOwnProperty(i)) {
      if(typeof src[i] === "object") {
        // 递归clone
        o[i] = cloneObject(src[i]);
      } else {
        // 直接赋值
        o[i] = src[i]
      }
    }
  }
  return o;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
  var newArr = new Array;

  // 实现一
  arr = arr.sort();
  for(var i=0; i<arr.length; i++) {
    if(arr[i] !== arr[i+1]) {
      newArr.push(arr[i]);
    }
  }

  // 实现二
  // for(var i in arr) {
  //   if(newArr.indexOf(arr[i]) == -1) {
  //     newArr.push(arr[i]);
  //   }
  // }
  
  return newArr;
}