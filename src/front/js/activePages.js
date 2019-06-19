

/* 
 *  用户状态判断  
 */

let usernameLo = localStorage.getItem("username");
let passwordLo = localStorage.getItem("password");

let userStatus = document.getElementById("userStatus");
let userLogout = document.getElementById("userLogout");

if (usernameLo !== null && passwordLo !== null) {

    userStatus.innerHTML = usernameLo + "已登录";
    userLogout.innerHTML = "点击注销";
    userLogout.style.color = "#27c0ab";

    userLogout.onclick = function () {

        confirm("确认要注销吗？");

        localStorage.removeItem("username");
        localStorage.removeItem("password");

        alert("注销成功！");
    }
}




/* 
 *   商品搜索功能的实现，跨域访问百度的数据
 */

var ul = document.getElementById("list");
let text1 = document.getElementById("text1");
let search = document.getElementsByClassName("search");
let input = document.getElementsByTagName("input");
text1.onkeyup = function () {
    if (this.value != '') {
        var script = document.createElement("script");
        script.src = 'http://suggestion.baidu.com/su?wd=' + this.value + '&cb=fn';
        // script.src = 'https://list.tmall.com/search_product.htm?q=' + this.value + '&=fn';
        document.body.appendChild(script);
        /*  script.style.margin = "2px 10px";
         script.style.color = "#333"; */
    } else {
        ul.style.display = "none";
    }
}

// 输入框的聚焦事件
text1.onfocus = function () {
    if (text1.value === "好宝贝，等你搜") {
        text1.value = "";
        text1.style.color = "#ccc";
        ul.style.display = "block";
        search.style.border = "1px solid red";
        text1.style.border = "2px solid red";
        text1.style.background = "red";
        input.style.border = "2px solid red";
    }
};

// 输入框的离焦事件
text1.onblur = function () {
    if (text1.value === "") {
        text1.value = "好宝贝，等你搜";
        text1.style.color = "#333";
        ul.style.display = "none";
    }
};

/*   document.click = function(e){
     var target = e.target;
     ul.style.display = "none";
  } */


function fn(data) {
    var html = "";
    var ul = document.getElementById("list");
    if (data.s.length) {
        ul.style.display = "block";
        for (var i = 0; i < data.s.length; i++) {
            //html += '<li><a target="_blank" href="http://www.baidu.com/s?wd=' + data.s[i] + '">' + data.s[i] + '</a></li>';
            html += '<li><a target="_blank" href="http://www.baidu.com/s?wd=' + data.s[i] + '">' + data.s[i] + '</a></li>';
            // html += '<li><a target="_blank" href="https://list.tmall.com/search_product.htm?q='+data.s[i]+'">'+ data.s[i] +'</a></li>';
            // list1.style.margin = "10px 10px";
        }
        ul.innerHTML = html;
    } else {
        ul.style.display = "none";
    }
}
