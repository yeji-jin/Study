$(function(){

  //메뉴
  $('.btn_menu').on('click' , function(){
    $('.menu').addClass('on');
    $('.dim').show();
    $('body').css('overflow' , 'hidden');
  });
  $('.dim').on('click' , function(){
    $(this).hide();
    $('.menu').removeClass('on');
    $('body').removeAttr('style');
  });

  //알람
  $('.btn_news').on('click' , function(){
    $('.alram').addClass('on');
    $('.dim').show();
    $('body').css('overflow' , 'hidden');
  });
  $('.dim , .dim3').on('click' , function(){
    $(this).hide();
    $('.alram').removeClass('on');
    $('.popup').removeClass('on');
    $('.search_box').hide();
    $('body').removeAttr('style');
  });

  //팝업
  $('.btn_more').on('click' , function(){
    $('.popup').addClass('on');
    $('.dim').show();
  });
  $('.btn_popup').on('click' , function(){
    $('.popup').removeClass('on');
    $('.dim').hide();
  });

  //탭메뉴
  $('.tab_menu > li').on('click' , function(){
    var idx = $(this).index();
    //console.log(idx);
    var tab_cont = $(this).parent().parent().siblings('.tab_cont');

    $(this).addClass('on');
    $(this).siblings().removeClass('on');
    //탭내용 활성화
    tab_cont.removeClass('on');
    tab_cont.eq(idx).addClass('on');

    swiper6.update();
    new Swiper('.gift_slide').update();

  });

  //전체메뉴 탭메뉴
  $('.lnb > li , .snb > li ,.tab_slide > li').on('click' , function(){
    $(this).addClass('on');
    $(this).siblings().removeClass('on');
  });

  //검색창
  $('.btn_serarch').on('click' , function(){
    $('.search_box').show();
    $('.dim3').show();
  });
  $('.btn_cancel').on('click' , function(){
    $('.search_box').hide();
    $('.dim3').hide();
  });


  $('.data').on('click' , function(e){
      event.preventDefault();
    });

  //tab3
  $('.data').on('click' , function(){
    $('.wrap').stop().slideToggle(500);
    $(this).children('.right').children().toggleClass('on');
  });

   var swiper = new Swiper('.menu_visual' ,{
     navigation: {
       nextEl: '.swiper-container .right',
       prevEl: '.swiper-container .left',
     },
     pagination: {
        el: '.paging',
      },
      autoplay: {
         delay: 2500,
         disableOnInteraction: false,
       },
     loop:true,
   });

   var swiper2 = new Swiper('.visual' ,{
     autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
     loop:true,
     pagination:{
        el:'.slide',
        type:'fraction'
      },
   });

   var swiper3 = new Swiper('.gift_slide' , {
     autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
         el: '.gift_slide .paging',
       },
     loop:true,
     /*observer: true,
     observeParents: true,
     observeSlideChildren: true,*/
   });


    var swiper4 = new Swiper('.list_slide' ,{
      slidesPerView: 'auto',
      grabCursor: true,
    });

    var swiper5 = new Swiper('.slide_visual' , {
      autoplay: {
         delay: 2500,
         disableOnInteraction: false,
       },
       pagination: {
          el: '.slide_visual .paging',
        },
      loop:true,
    });

    var swiper6 = new Swiper('.list_slide2' ,{
      slidesPerView: 'auto',
      grabCursor: true,
    });



});
