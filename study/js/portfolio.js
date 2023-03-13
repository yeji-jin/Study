$(function(){

  //메뉴버튼
  $('.menu').on('click' , function(){
    $('.gnb ,.menu_ico ').toggleClass('on');
    $('.dim').toggle();
    return false;
  });

  //메뉴이동애니메이션
  $('.gnb ul li a').on('click',function(e){
      e.preventDefault();
      if($(this.hash).offset()){
        $('html, body').animate({scrollTop:$(this.hash).offset().top},500);
      }
  });

  //스크롤버튼
  $('.btn_top').on('click' , function(){
    $('html').animate({
      scrollTop:0
    } , 700);
  });

  $('.btn_bottom').on('click' , function(){

    var height = $(document).height();
    $('html').animate({
      scrollTop:height
    } , 700);
  });

  //탭메뉴
  //tab1
  $('.home_btn li').on('click' , function(){

    var idx = $(this).index();
    console.log(idx);
    var tab_cont = $(this).parent().siblings('.txt_box').find('.change_txt').children().children();

    $(this).addClass('on')
    $(this).siblings().removeClass('on');
    tab_cont.removeClass('on');
    tab_cont.eq(idx).addClass('on');

    });

  //tab2
  $('.tab_menu > ul > li > a').on('click' , function(){

     var idx = $(this).parent().index();
     var tab_cont = $(this).parent().parent().siblings('.tab_cont');

     $(this).parent().addClass('on');
     $(this).parent().siblings().removeClass('on');
     tab_cont.removeClass('on');
     tab_cont.eq(idx).addClass('on');

      return false;
  });

  //acc_popup

  $('.acc_popup').on('click', function(){
    $('.acc_content').show();
    $('.dim').show();
    $('body').css('overflow' , 'hidden');
    return false;
  });

  $('.btn_close').on('click' , function(){
    $('.acc_content').hide();
    $('.dim').hide();
    $('body').removeAttr('style');
  });

  $('.paging > li > button').on('click' , function(){

     var idx = $(this).parent().index();

     $(this).addClass('on');
     $(this).parent().siblings().find('button').removeClass('on');
     $('.acc_img li').siblings().removeClass('on');
     $('.acc_img li').eq(idx).addClass('on')
     $('.web_acc').siblings().removeClass('on');
     $('.web_acc').eq(idx).addClass('on')
  });

  //스크롤 이벤트

  var profile = $('.profile');
  var profile_offset = profile.offset().top;
  var txt_box1 = $('.about .txt_box').offset().top;
  var txt_box2 = $('.about .txt_box2').offset().top;
  var txt_box3 = $('.study .txt_box3').offset().top;
  var txt_box4 = $('.work .txt_box').offset().top;
  var txt_box5 = $('.animation .txt_box').offset().top;
  var txt_box6 = $('.js_game .txt_box').offset().top;
  var work_box = $('.work_box').offset().top;
  var js_game = $('.js_game').offset().top;
  var secAbout = $('.about').height() / 10;

  //스크롤이벤트
  $(window).on('scroll' ,function(){
    var wScroll = $(this).scrollTop();
    var secWork = $('.work_content');

    //프로필카드
    if(wScroll > profile_offset - secAbout){
      $('.profile_img , .profile_content').addClass('on');
    }

    //작업물 css애니메이션
    if(wScroll >= secWork.offset().top){
      if(wScroll >= $('.work_box01').offset().top - 50){
        $('.work_box01').addClass('on');
      }
      if(wScroll >= $('.work_box02').offset().top - 50){
        $('.work_box02').addClass('on');
      }
      if(wScroll >= $('.work_box03').offset().top - 50){
        $('.work_box03').addClass('on');
      }
      if(wScroll >= $('.work_box04').offset().top - 50){
        $('.work_box04').addClass('on');
      }
    }

    //텍스트애니메이션
    if(wScroll > txt_box1 - 250){
      $('.about .txt_box').addClass('on');
    }
    if(wScroll > txt_box2 - 250){
      $('.about .txt_box2').addClass('on');
    }
    if(wScroll > txt_box3 - 250){
      $('.study .txt_box3').addClass('on');
    }
    if(wScroll > txt_box4 - 250){
        $('.work .txt_box').addClass('on');
    }
    if(wScroll > txt_box5 - 250){
      $('.animation .txt_box').addClass('on');
    }
    if(wScroll > txt_box6 - 250){
      $('.js_game .txt_box').addClass('on');
    }

    //chat
    var contacOffset = $('.contact_box').offset().top;
    if(wScroll >= contacOffset){
        $('.chat > ul li').addClass('on');
    }

  });

  //선물
  $('.gift').on('click',function(e){
    e.preventDefault();
    $('.wrap_card').show();
  });
  $('.btn-idcard').on('click',function(e){
    $('.wrap_card').hide();
  });



});
