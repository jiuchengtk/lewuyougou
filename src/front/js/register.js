var checkOne, checkTwo, checkThree, checkFour, checkFive;

/* 
 *   用户名的校验
 */

let username = document.getElementById("username");
let userinfo1 = document.getElementById("info1");

username.onblur = function () {
    if (username.value.search(/^[A-Za-z_@.]{6,10}$/) === -1) {
        userinfo1.innerHTML = "用户名错误,需要6-10位之间的字母、下划线，并且不能以数字开头";
        userinfo1.style.color = "red";
        return false;
    } else {
        userinfo1.innerHTML = "用户名正确";
        userinfo1.style.color = "green";
        userinfo1 = username.value;
        checkOne = true;
    }
};



/* 
 *  设置密码的校验
 */
let password = document.getElementById("password");
let userinfo2 = document.getElementById("info2");

password.onblur = function () {
    if (password.value.search(/\w{6,10}/) === -1) {
        userinfo2.innerHTML = "密码错误，需要6-10位，字母数字下划线";
        userinfo2.style.color = "red";
        return false;
    } else {
        userinfo2.innerHTML = "密码正确";
        userinfo2.style.color = "green";
        userinfo2 = password.value;
        checkTwo = true;
    }

    if (password.value === "") {
        userinfo2.innerHTML = "密码不能为空";
        userinfo2.style.color = "red";
        return false;
    }
}



/* 
 * 确认密码的校验
 */

let password2 = document.getElementById("password2");
let userinfo3 = document.getElementById("info3");

password2.onblur = function () {
    if (password2.value == password.value) {
        userinfo3.innerHTML = "两次密码一致";
        userinfo3.style.color = "green";
        userinfo3 = password2.value;
        checkThree = true;
    } else {
        userinfo3.innerHTML = "两次密码不一致，请重新输入";
        userinfo3.style.color = "red";
        return false;
    }

    if (password2.value === "") {
        userinfo3.innerHTML = "密码不能为空";
        userinfo3.style.color = "red";
        return false;
    }

}



/* 
 *  手机号的验证
 */

let telephone = document.getElementById("telephone");
let userinfo4 = document.getElementById("info4");

telephone.onblur = function () {

    if (telephone.value.search(/^1\d{10}$/) === -1) {
        userinfo4.innerHTML = "手机号错误，需要11位数字";
        userinfo4.style.color = "red";
        return false;
    } else {
        userinfo4.innerHTML = "手机号正确";
        userinfo4.style.color = "green";
        userinfo4 = telephone.value;
        checkFour = true;
    }

}



/* 
 *  短信验证码的校验
 */


let random_arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let text = document.getElementById("mes");
let info5 = document.getElementById("info5");
let btn1 = document.getElementById("btn1");

// 点击按钮发生事件,生成验证码
btn1.onclick = function () {

    /* var n = random_arr[Math.floor(Math.random()*random_arr.length)];
     console.log(n);*/
    var n1 = getRandomArrayElements(random_arr, 6);
    var n2 = n1.toString();
    var n3 = n2.replace(/,/g, "");
    alert("您的验证码为" + n3 + "，请输入到文本框中");

    // 倒计时禁用
    btn1.disabled = true;
    //input.disabled = true;
    var time = 8;
    var timer = setInterval(fn1, 1000);

    function fn1() {
        time--;
        if (time >= 0) {
            btn1.innerHTML = time + "s后重新发送";
        } else {
            btn1.innerHTML = "点击发送短信";
            btn1.disabled = false;
            clearTimeout(timer);
            time = 8;
        }
    }


    // 校验验证码是否正确
    text.onblur = function () {
        if (n3 === text.value) {
            info5.innerHTML = "输入正确";
            info5.style.color = "green";
            checkFive = true;
        } else {
            info5.innerHTML = "输入错误";
            info5.style.color = "red";
        }
    }

};


//  封装函数：随机获取数组多个元素
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}



/* 
 *  点击按钮 注册
 */

let btn2 = document.getElementById("btn2");
/* let username = document.getElementById("username");
let password = document.getElementById("password"); */

/* 
*  倒计时跳转到登录页面
*/
let numTime = 3;
var URL = "./login.html";

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
*  点击注册
*/
btn2.onclick = function () {
    //  校验是否都满足正确并且用户名和密码的值都是不能为空的
    if (checkOne == true && username.value !== "" && checkTwo == true && password !== "" && checkThree == true && checkFour == true && checkFive == true) {

        let temp1 = localStorage.getItem("username");
        let temp2 = localStorage.getItem("password");

        // 对之前本地存储进行数值判断，非空删除，不为空就存
        if (temp1 != null && temp2 != null) {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        } else {
            localStorage.setItem("username", username.value);
            localStorage.setItem("password", password.value);
            localStorage.setItem("telephone",telephone.value);
            localStorage.setItem("text",text.value);
            alert("注册成功！");
            window.setTimeout("doUpdate()", 1000);
        }

        /* 
         localStorage.setItem("username", username.value);
         localStorage.setItem("password", password.value);
         alert("注册成功！");
         window.setTimeout("doUpdate()", 1000); */
    } else {
        alert("注册失败！");
    }
}