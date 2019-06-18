/* 
 *  获取注册成功后本地存储的用户名和密码
 */


let usernameLo = localStorage.getItem("username");
let passwordLo = localStorage.getItem("password");


let username2 = document.getElementById("username");
let u1 = document.getElementById("u1");
// console.log(username2)

let password2 = document.getElementById("password");
let u2 = document.getElementById("u2");


/* 
 *  倒计时跳转主页中
 */
let numTime = 3;
var URL = "../../index.html";

function doUpdate() {
    if (numTime != 0) {
        alert("页面将在" + numTime + "秒后跳转");
        numTime--;
        window.setTimeout("doUpdate()", 1000);
    } else {
        numTime = 3;
        window.location = URL;
    }
}



/* 
 *  判断浏览器是否禁止用cookie
 */

/* function IsAllowCookie() {
        var flag = false;
        if ($.browser.msie) {
            var cookieStr = "wb_check=kcehc_bw";
            document.cookie = cookieStr;
            if (document.cookie.indexOf(cookieStr) > -1) {
                flag = true;
                var date = new Date();
                date.setTime(date.getTime() - 1000);
                document.cookie = cookieStr + "; expires=" + date.toGMTString();
            }
        } else {
            flag = navigator.cookieEnabled;
        }
        return flag;
    }
IsAllowCookie(); */



/* 
 *  存入cookie 的封装函数
 */

function setCookie(cname, cvalue, exdays) {
    // console.log(222)
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/;";
}


// let usernameCok = username2.value;
// let passwordCok = password2.value;
/* btn3.onclick = function () {
    let usernameCok = username2.value;
    let passwordCok = password2.value;
    console.log(usernameCok)
    
        
            //    console.log(111)
        
        
               setCookie("username", usernameCok, 5);
                setCookie("password", passwordCok, 5);
         */


// console.log(usernameCok)



/* 
 * 点击按钮登录
 */
btn3.onclick = function () {

    let usernameCok = username2.value;
    let passwordCok = password2.value;

    if (usernameCok === usernameLo && passwordCok=== passwordLo) {
        alert("登录成功！");
       
      /*   console.log(usernameCok);
        console.log(passwordCok); */

        // 登录成功后存入cookie
        setCookie("username", usernameCok, 7);
        setCookie("password", passwordCok, 7);

        window.setTimeout("doUpdate()", 1000);
        
        alert("欢迎"+usernameCok+"登录");

    } else {
        alert("登录失败！");

        if (username2.value !== usernameLo) {
            u1.innerHTML = "用户名错误";
            u1.style.color = "red";
        } else if (password2.value !== passwordLo) {
            u2.innerHTML = "密码错误";
            u2.style.color = "red";
        }

    }

}
