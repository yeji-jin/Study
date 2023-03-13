$(function(){

  //메인슬라이드
  var swiper = new Swiper('.slides' ,{
    autoplay: {
       delay: 2500,
       disableOnInteraction: false,
     },
    loop:true,
  });


  var swiper = new Swiper('.swiper-container', {
     slidesPerView: 'auto',
     grabCursor: true,
   });

  var swiper2 = new Swiper('.screen' , {
    pagination:{
      el:'.screen .swiper-pagination',
      clickable:true,
    },
    slidesPerView: 'auto',
    grabCursor: true,
  });
    
});
