<template>
    <div class="random-wrap">
        <div class="detail">
            <strong class="txt-1">매일 누구나 100% 당첨</strong>
            <span class="txt-2">💙 랜덤 혜택 💙</span>
            <p class="txt-3">
                500 캐시 ~ 30,000 캐시 즉시 당첨!<br>
                무료배송 행운까지
            </p>
            <div class="line-bg rotate">
                <button class="random-button" type="button" @click="showGiftPop">
                    <img src="https://img.glyde.co.kr/event/event79/illu-box-click2.webp" alt="" class="px-24">
                </button>
            </div>
            <p class="txt-4">
                선 넘은 간편식을 클릭하면<br>
                하루 한번 누구나 100% 당첨!<br>
                배송비 무료 티켓부터 3만 캐시까지~!
                <span class="fc_red" style="display: block; padding-top: 10px; font-size: 14px;">* 혜택 사용기한 : 발급 당일까지</span>
            </p>
            <div class="line-bg rotate2" style="height: 97px;"></div>
        </div>

        <!-- 팝업 -->
        <div class="modal-wrap random-item" v-show="giftModal">
            <div class="modal-layer">
                <div class="modal_cont">
                    <div class="alrt_txt scr_txt">
                        <div class="event-item">
                            <img src="https://img.glyde.co.kr/event/event79/popup-img-500-cash.webp" alt="">
                        </div>
                        <div class="prize">
                            당첨을 축하드립니다<br>
                            <strong class="item-name">" 500캐시 혜택 "</strong>이 지급되었습니다
                            <br><br>
                            <strong>유효기간</strong>&nbsp;&nbsp;<span class="space-0">2099.12.31</span> 까지
                        </div>
                    </div>
                </div>
                <div >
                    <button type="button" class="modal_btn" @click="showGiftPop">
                        <span>확인</span>
                    </button>
                </div>
            </div>
            <div class="dim"></div>
        </div>
        <!-- //팝업 -->	
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
               giftModal:false
            }
        },
        mounted(){
           
        },
        methods: {
			showGiftPop(){
                const randomBtn = document.querySelector('.random-button');
                const randomPopup = document.querySelector('.modal-wrap.random-item');
                const randomItem = document.querySelector('.event-item img');
                const itemName = document.querySelector('.item-name');
                const randomItemBox = [
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-500-cash.webp',
                    itemName:'500캐시',
                    },
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-1000-cash.webp',
                    itemName:'1,000캐시',
                    },
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-2000-cash.webp',
                    itemName:'2,000캐시',
                    },
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-5000-cash.webp',
                    itemName:'5,000캐시',
                    },
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-10000-cash.webp',
                    itemName:'10,000캐시',
                    },
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-30000-cash.webp',
                    itemName:'30,000캐시',
                    },
                    {
                    imgSrc:'https://img.glyde.co.kr/event/event79/popup-img-freeticket.webp',
                    itemName:'배송비 무료 티켓',
                    }
                ];
                this.giftModal = !this.giftModal; 
                //랜덤아이템
                let randomNum = Math.floor(Math.random() * randomItemBox.length);
                randomItem.setAttribute('src', randomItemBox[randomNum].imgSrc);
                itemName.innerHTML = randomItemBox[randomNum].itemName;
            }
        }
    }
</script>

<style scpoed>
.random-wrap{position: relative;}
.detail{ padding: 60px 0; text-align: center; background: linear-gradient(to bottom right, #4d2a86,#4d2a86,#002b67); overflow: hidden; color:#fff; }
.detail .txt-1{ display: inline-block; position: relative; font-size: 28px; line-height: 28px; letter-spacing: -1.3px; z-index: 1;}
.detail .txt-2{ display:block; padding:10px 0 15px; font-size: 20px; line-height: 30px; font-weight: 700;}
.detail .txt-3{ font-size: 16px; line-height: 26px; color:#f9f9f9;}
.detail .txt-4{ padding-top: 20px; font-size: 16px; line-height: 26px; color:#f5f5f5;}
.detail .detail-terms{ margin:20px 24px 30px; padding:15px 0; background: #333;}
.detail .txt-1::before{content: ""; position: absolute; display: block; left: 0; bottom: 0; width: 100%; height: 10px; background: #0fd6f7; opacity: 0.8; z-index: -1; }
.line-bg{ position: relative; z-index: 1;}
.line-bg::before{ content: ""; display: block; position: absolute; top: 125px; left: -100%; width: 300%; height: 1px; background: #0ad6f7; z-index: -1; transform: rotate(16deg);}
.line-bg.rotate{ padding-top: 50px;}
.line-bg.rotate::before{ top: 50%; transform: rotate(196deg);}
.line-bg.rotate2::before{ top: 65%; transform: rotate(348deg);}
.limit-label{ position: absolute; top: 15px; right: 40px; width: 62px; height: 62px; background: #fff; border-radius: 50%; font-size: 13px; color: #000; line-height: 64px;}
.limit-label span{ font-size: 17px; letter-spacing: -1px; vertical-align: -1px;}
.kit-info{position: absolute; left:0; width: 100%; bottom: 6%; }
.kit-name{ font-size: 14px; }
.kit-item{ font-size: 14px; line-height: 22px; color:#f5f5f5;}
img{width: 100%;}
</style>
