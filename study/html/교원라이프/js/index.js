$(function(){

  //pc메뉴
  var gnb = $('nav > ul')
  var nav_wrap = $('.nav_wrap')
  var width = $(window).width();

  gnb.on('mouseenter focusin' , function(){
    if(width > 800){
      $(this).find('ul').show();
      nav_wrap.show();
    }
  });

  gnb.on('mouseleave' , function(){
    if(width > 800){
      $(this).find('ul').hide();
      nav_wrap.hide();
    }
  });

  $('nav > ul li:last-child li:last-child a').on('focusout' , function(){
    gnb.find('ul').hide();
    nav_wrap.hide();
  });


  $(window).on('resize' , function(){
    var width = $(window).width();

    if (width > 800) {//pc
      //pc로 다시 펼쳤을 때 모바일용 펼쳐진 것 삭제
      if( $('.nav').hasClass('active') ){
          $('.nav').removeClass('active');
          $('body').removeAttr('style');
          $('.nav ul ul').css('display','none');
          $('header nav > ul > li > a').removeClass('active')
      }
      gnb.on('mouseenter focusin' , function(){
          $(this).find('ul').show();
          nav_wrap.show();
      });
      gnb.on('mouseleave' , function(){
          $(this).find('ul').hide();
          nav_wrap.hide();
      });
    }else{//mobile
      gnb.off('mouseenter mouseleave');
      nav_wrap.hide();
      //모바일 메뉴 호버시 자꾸 전체 ul과 ㅂㅐ경이나옴;
    }

    //모바일 메뉴resize
    $('.menu').on('click' , function(){
      if (width > 800) {
        $('body').removeAttr('style');
        gnb.find('ul').toggle();
        nav_wrap.toggle();
      }else{
        $('body').css('overflow','hidden');
        $('.nav').addClass('active');
        gnb.find('ul').css('display','none');
        nav_wrap.css('display','none');
      }
    });

    //모바일 메뉴 화살표
    $('header nav > ul > li > a').on('click',function(e){
      var siblings =  $(this).parent().siblings();
      var after = $(this).parent().siblings().children('a')

      if(width <= 800){//mb
        $(this).next('ul').stop().slideToggle();
        siblings.children('ul').hide();
        $(this).toggleClass('active');
        after.removeClass('active');
      }else{//pc
        e.preventDefault();
        siblings.children('ul').show();
      }
    });


  });


  //모바일 메뉴
  $('.menu').on('click' , function(){

    if (width > 800) {
      $('body').removeAttr('style');
      gnb.find('ul').toggle();
      nav_wrap.toggle();
    }else{
      $('.nav').addClass('active');
      $('body').css('overflow','hidden');
      gnb.find('ul').css('display','none');
      nav_wrap.css('display','none');
    }

  });

  $('.close').on('click' , function(){
    $('.nav').removeClass('active');
    $('body').removeAttr('style');
    if(width <= 800){
      $('nav ul ul').css('display' , 'none');
      $('header nav > ul > li > a').removeClass('active');
    }
  });

  //모바일 메뉴 화살표
  $('header nav > ul > li > a').on('click' ,function(){
    var siblings =  $(this).parent().siblings();
    var after = $(this).parent().siblings().children('a')

    if(width <= 800){
      $(this).next('ul').stop().slideToggle();
      siblings.children('ul').hide();
      $(this).toggleClass('active');
      after.removeClass('active');
    }
  });

  //index_tabslide
  $('.service_tap > li').on('click' , function(){
    var idx = $(this).index();
    //var tab_cont = $(this).parent().parent().siblings().children('.service_slide');
    var tab_cont = $(this).parent().parent().siblings('.slide2');

    $(this).addClass('on');
    $(this).siblings().removeClass('on');
    tab_cont.removeClass('on');
    tab_cont.eq(idx).addClass('on');

  });


  //a:link block
  $('.qna > li > a , .service_tap > li > a').on('click' , function(e){
    event.preventDefault();
  });

  //address
  $('.btn_address').on('click' , function(){
    $(this).next().stop().slideToggle();
  });

  //sub Q&A
  $('.qna_tit').on('click' ,function(){
     var qna_a = $(this).parent().parent().siblings().children().children('.qna_txt')

    $(this).next().stop().slideToggle();
    qna_a.hide();
  });


});
