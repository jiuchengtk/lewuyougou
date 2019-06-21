//请求json数据拼接字符串，并在URL传参数id跳转
//请求json数据拼接字符串，并在URL传参数id跳转
$(function(){
    $.ajax({
     type:"get",
     url:"data/data.json",
     dataType:"json",
     success:function(res){
      var str = "<ul class='con_ul'>";
      $.each(res.books, function(idx,val) {
       str +="<li class=\"sec_li\"><a href='goodsDetail.html?booksId="+val.id+"' class='lp_li_a'><div class='lp_li_imgWrap'><img src='"+val.imgUrl+"'/></div><p class='lp_li_name'>"
         +val.title+"</p><p class='lp_li_price'>"
         +'￥'+val.price+"</p></a><li>";
      });
      str += "</ul>";
      $('.content').append(str);
     },error:function(){
      alert(error)
     }
    });
   })