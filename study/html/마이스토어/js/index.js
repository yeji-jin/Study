$(function(){

  $('.btn_menu').on('click' , function(){
    $('.menu').addClass('on');
    $('body').css('overflow','hidden');
  });

  $('.btn_close').on('click' , function(){
    $(this).parent().removeClass('on');
    $('body').removeAttr('style');

  });

  $('.tab_manu li').on('click', function(){
    var idx = $(this).index();
    var tab_con = $(this).parent().parent().siblings('.tab_content');
    console.log(idx);

    $(this).addClass('on');
    $(this).siblings().removeClass('on');
    //탭내용 활성화
    tab_con.removeClass('on');
    tab_con.eq(idx).addClass('on');

  });

  $('.more').on('click' ,function(){
    $(this).toggleClass('on');
    $('.noti_cont').toggleClass('on');
    $('.noti_cont').slideToggle(500);
  });

  //검색창
  $('.btn_search').on('click', function(){
    $('.search_box').addClass('on');
    if($('.search_box').hasClass('on')){
      $('body').css('overflow', 'hidden');
    }else{
      $('body').removeAttr('style');
    }
  });

  $('.close_search').on('click', function(){
    $('.search_box').removeClass('on');
    $('body').removeAttr('style');
  });

});
