/**
 * 函数功能：ajax函数的封装
 * @param  {string} method  请求数据的方法
 * @param  {string} url     请求的地址
 * @param  {string} data    请求的参数
 * @param  {[function]} success [请求成功之后执行的函数]
 * @return {[none]}         none
 */

 
function ajax(method,url,data,success){

    var xhr = null;

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }

    if (method === 'get' && data) {
        url += '?' + data;
    }

    xhr.open(method,url,true);

    if(method === 'get'){
        xhr.send();
    }else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function () {
        // console.log(xhr.readyState);
        // console.log(xhr.status);
        if(xhr.readyState === 4 && xhr.status === 200){
            success && success(xhr.responseText);
        }


    }
}