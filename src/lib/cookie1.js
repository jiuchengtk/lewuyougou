/*
* 函数功能：设置cookie
* cname: cookie的名字
* cvalue: cookie的值
* exdays: cookie过期的天数
* 将访问者的名字存储在 cookie 变量中
*/

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



/*
* 函数功能：获取cookie
* cname: cookie作为参数
* 返回指定 cookie 的值
*/
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



/*
* 函数功能： 检测cookie
* 如果已设置 cookie，将显示一个问候
* 如果未设置 cookie，会显示一个提示框，询问用户的名字，并存储用户名 cookie 365 天
*/
function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}