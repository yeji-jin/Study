$(function(){

  //헤더고정
  var hd = $( '.header' ).offset().top;

  $(window).on('scroll',function(){

    var window = $(this).scrollTop();
    if(hd <= window){
      $( '.header' ).addClass( 'fixed' );
    }
    else{
      $( '.header' ).removeClass( 'fixed' );
    }
  });

  //pc대메뉴
  $('.lnb > ul > li').on('mouseenter focusin' , function(){
    $(this).addClass('on');
    $('.dim').show();
    $(this).siblings().removeClass('on');
  });

  $('.lnb > ul > li').on('mouseleave focusout' , function(){
    $(this).removeClass('on');
    $('.dim').hide();
  });



  //lnb2
  $('.accordion').on('click' , function(){

    var siblings =   $(this).parent().siblings();

    $(this).next('ul').toggleClass('on');
    siblings.find('ul').removeClass('on');
    $(this).toggleClass('on');
    siblings.find('.accordion').removeClass('on');
    return false;
  });

  //search_box
  $('.search , .pc_search').on('click', function(){
    $('.search_box').toggleClass('on');

    if($('.search_box').hasClass('on')){
      $('body').css('overflow', 'hidden');
    }
    else{
      $('body').removeAttr('style');
    }
    return false;
  });

  $('.search_box_close > button').on('click', function(){
    $('.search_box').removeClass('on');
    $('body').removeAttr('style');
  });

  //tab
  $('.area > li').on('click', function(){
    var idx = $(this).index();
    var tab_con = $(this).parent().next().find('.list_wrap');

    $(this).addClass('on');
    $(this).siblings().removeClass('on');
    tab_con.removeClass('on');
    tab_con.eq(idx).addClass('on');
    return false;
  });

  $('.tit li').on('click',function(e){
    e.preventDefault();

    var idx = $(this).index();
    var tab_con = $(this).parent().siblings('.banner_list');

    $(this).addClass('on');
    $(this).siblings().removeClass('on');
    tab_con.removeClass('on');
    tab_con.eq(idx).addClass('on');
  });

  //mb_menu
  $('.btn_menu').on('click', function(){
    $('.mb_open').addClass('on');
    $('body').css('overflow','hidden');
    return false;
  });
  $('.mb_close').on('click' , function(){
    $('.mb_open').removeClass('on');
    $('body').removeAttr('style');
  });

  $('.m_nav > ul > li ').on('click' , function(){
    var siblings =  $(this).siblings();
    $('.m_nav ul ul').stop().slideToggle();
    siblings.children('ul').hide();
    $(this).toggleClass('on');
    siblings.removeClass('on');
  });

  /*swiper*/

  var swiper1 = new Swiper('.banner_slide', {
      navigation: {
        nextEl: '.banner_slide .right',
        prevEl: '.banner_slide .left',
      },
      loop:true,
    });

    var swiper2 = new Swiper('.festival_list', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      navigation: {
        nextEl: '.festival_list .right',
        prevEl: '.festival_list .left',
      },
    });

    var swiper3 = new Swiper('.banner_list', {
      slidesPerView:3,
      touchRatio: 0,
      breakpoints: {
        771: {
          slidesPerView: 1,
          spaceBetween: 20,
          touchRatio: 1,
          grabCursor:true,
        },
      },
      observer: true,
      observeParents: true,
    });

    /*hot place*/

    var swiper3 = new Swiper('.place_slide', {
      slidesPerView: 'auto',
      touchRatio: 0,
      breakpoints: {
        771: {
          spaceBetween: 30,
          touchRatio: 1,
        },
      }


    });



});
