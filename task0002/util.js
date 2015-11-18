function isArray(arr) {
  // typeof Array 返回 "object"

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

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
  // 头部处理

  while(str[0] == " " || str[0] == "\t") {
    str = str.slice(1);
  }

  // 尾部处理
  while(str[str.length-1] == " " || str[str.length-1] == "\t") {
    str = str.slice(0, -1);
  }

  return str;
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
  if(str.length != -1) {
    return str.replace(/^\s+|\s+$/g, '');
  }
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
  for(var i in arr) {
    fn(arr[i], i);
  }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
  // 实现一
  // var len = 0;
  // for(var i in obj) {
  //   len++;
  // }
  // return len;

  // 实现二  
  return Object.keys(obj).length;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
  var pattern = /^(\w+)(\.\w+)*@(\w+)(\.\w+)+$/
  return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
  // your implement
}
