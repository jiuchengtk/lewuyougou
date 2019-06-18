/*
*  函数功能：封装cookie,对于cookie进行设置、获取和删除
*/

//设置
function setCookie(sName,sValue,iDay){
    if(iDay){ //有时候我们并不会存时间，所有要判断一下
        var oDate=new Date(); //先new一个时间对象，
        oDate.setDate(oDate.getDate()+iDay); //设置时间对象：我们要给cookie到期时间
        document.cookie=sName+'='+sValue+'; expires='+oDate+'; path=/'; //开始存
    }else{
        document.cookie=sName+'='+sValue+'; path=/'; //如果不需要时间的话，这样存
    }
}
//获取
function getCookie(sName){
    var str=document.cookie; //cookie获取下来是一串字符串，
    var arr=str.split('; '); //然后我们切成数组
    // arr ->  password=123,n2=qq,abc=123
    for(var i=0;i<arr.length;i++){ //循环数组，
        //arr[i] ->  password=123
        var arr2=arr[i].split('='); //在把每一条切开成数组
        //[password,123]
        if(arr2[0]==sName){ //用我们要的那条cookie名字和每一条cookie的名字对比
            return arr2[1] //如果一样，就把值给返回出去。
        }
    }
    return '' //如果最后没有我们也返回相同的数据格式，空字符串
}
//删除
function removeCookie(sName){
    setCookie(sName,'',-1); //删除就直接把那条cookie时间设置成-1就行
}