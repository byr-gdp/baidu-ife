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
  // return Array.isArray(arr);

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
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串i
// 尝试使用一行简洁的正则表达式完成该题目
// 正则
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



// 3. DOM

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
  var oldClassName = element.className;
  element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
  // 以下有待验证
  // element.className += " newClassName";
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
  // element.classList 返回数组
  // element.className 返回字符串
  var oldClassList = element.classList;
  var newClassName = "";
  for(var i=0; i<oldClassList.length; i++) {
    if(oldClassList[i] !== oldClassName) {
      newClassName = newClassName + " " + oldClassList[i];
    }
  }
  element.className = newClassName;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
  // parentNode 和 parentElement 区别
  return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
  // 各种长宽意义
}

// 实现一个简单的Query
function $(selector) {

}



// 4. 事件

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener);
    } else if(element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
         element.removeEventListener(event, listener);
    } else if(element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
  if(element.addEventListener) {
    element.addEventListener("click", listener);
  } else if(element.attachEvent) {
    element.attachEvent("onclick", listener);
  }
  // addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
  addEvent(element, "keydown", function(event) {
    if(event.keyCode == 13) {
      listener();
    }
  });
}

// 事件代理
function delegateEvent(element,tag,eventName,listener){
  addEvent(element, eventName, function(event){
    var target = event.target || event.srcElement;
    if(target.tagName.toLowerCase() == tag.toLowerCase()) {
      listener.call(target, event);
    }
  });
}

//估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：

$.on(selector, event, listener) {
  addEvent($(selector), event, listener);
}

$.click(selector, listener) {
  addClickEvent($(selector), listener);
}

$.un(selector, event, listener) {
  removeEvent($(selector), event, listener);
}

$.delegate(selector, tag, event, listener) {
  delegateEvent($(selector), tag, event, listener);
}

// 5. BOM

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
  var ua = navigator.userAgent.toLowerCase();
  console.log(ua);
  // TODO
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
  var cookie = cookieName + "=" + cookieValue;
  if(typeof expiredays === 'number') {
    cookie += ";max-age=" + (expiredays * 60 * 60 * 24);
  }
  document.cookie = cookie;
}

// 获取所有 cookie 值
function getAllCookie() {
  var all = document.cookie;
  var cookie = {};
  if(all == "") {
    return cookie;
  }
  var s = cookie.split(";");
  for(var i = 0; i < s.length; i++) {
    var p = s[i].indexOf("=");
    var name = s[i].substr(0, p);
    var value = s[i].substr(p + 1);
    value = decodeURIComponent(value);
    cookie[name] = value;
  }
  return cookie;
}

// 获取 cookie
function getCookie(cookieName) {
  var all = document.cookie;
  var cookieValue;
  if(all == "") {
    return;
  }
  var s = cookie.split(";");
  for(var i = 0; i < s.length; i++) {
    var p = s[i].indexOf("=");
    var name = s[i].substr(0, p);
    if(name === cookieName) {
      var value = s[i].substr(p + 1);
      return decodeURIComponent(value);
    }
  }
}

// 6. AJAX

function ajax(url, options) {
  // var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
  var xmlhttp;
  if(window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState == 4) {
      if(xmlhttp.status == 200) {
        if(options.onsuccess) {
          options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
        }
      } else {
        if(options.onfail) {
          options.onfail();
        }
      }
    }
  };

  var method = options.type || "GET";
  var url    = options.url;
  var data;

  if(typeof options.data === "object") {
    var str = "";
    for(var c in options.data) {
      str += c + "=" + options.data[c] + "&";
    }
    str = str.substring(0, str.length - 1);
    data = str;
  }

  xmlhttp.open(method, url, true);
  if(method === "GET") {
    xmlhttp.send(null);
  } else {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  }
}
