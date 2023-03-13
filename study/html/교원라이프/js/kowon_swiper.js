$(function(){

  //메인슬라이드
  var swiper1 = new Swiper('.slide' , {
    effect: 'fade',
    navigation:{
        nextEl:'.slide .right',
        prevEl:'.slide .left'
      },
    pagination:{
      el:'.slide .paging',
      clickable:true,
    },
    autoplay:{
       delay:3000,
       disableOnInteraction:false
     },
    loop:true,
  });

  //메인서비스 슬라이드
  var swiper2 = new Swiper('.slide2', {
     slidesPerView: 'auto',
     navigation: {
        nextEl: '.slide2 .next',
        prevEl: '.slide2 .pre',
      },
      observer: true,
      observeParents: true,


  });
});
