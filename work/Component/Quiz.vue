<template>
    <div class="quiz-wrap">
        <ul class="quiz-list">
            <li>
                <span class="label">Q1</span>
                <p class="question">
                    101살 할머니의 입맛도 넘은
                    <strong>글라이드 <em class="underline">OOO 치즈 피자!</em></strong>
                </p>
                <ul class="answer-list">
                    <li>
                        <label for="chk1-1" class="chk-box rd">
                            <input type="radio" id="chk1-1" name="e_chk1">
                            <span class="form-txt">정답</span>
                        </label>
                    </li>
                    <li>
                        <label for="chk1-2" class="chk-box rd">
                            <input type="radio" id="chk1-2" name="e_chk1">
                            <span class="form-txt">오답</span>
                        </label>
                    </li>
                    <li>
                        <label for="chk1-3" class="chk-box rd">
                            <input type="radio" id="chk1-3" name="e_chk1">
                            <span class="form-txt">오답</span>
                        </label>
                    </li>
                </ul>
            </li>
            <li>
                <span class="label">Q2</span>
                <p class="question">
                    갈빗대 두개로! 먹방의 즐거움이 가득한
                    <strong>글라이드 <em class="underline">OOO OOO 왕갈비탕</em></strong>
                </p>
                <ul class="answer-list">
                    <li>
                        <label for="chk2-1" class="chk-box rd">
                            <input type="radio" id="chk2-1" name="e_chk2">
                            <span class="form-txt">오답</span>
                        </label>
                    </li>
                    <li>
                        <label for="chk2-2" class="chk-box rd">
                            <input type="radio" id="chk2-2" name="e_chk2">
                            <span class="form-txt">정답</span>
                        </label>
                    </li>
                    <li>
                        <label for="chk2-3" class="chk-box rd">
                            <input type="radio" id="chk2-3" name="e_chk2">
                            <span class="form-txt">오답</span>
                        </label>
                    </li>
                </ul>
            </li>
            <li>
                <span class="label">Q3</span>
                <p class="question">
                    우리 가족의 새로운 단골 맛집이 된
                    <strong>글라이드 <em class="underline">통뼈그대로 OOO 감자탕</em></strong>
                </p>
                <ul class="answer-list">
                    <li>
                        <label for="chk3-1" class="chk-box rd">
                            <input type="radio" id="chk3-1" name="e_chk3">
                            <span class="form-txt">오답</span>
                        </label>
                    </li>
                    <li>
                        <label for="chk3-2" class="chk-box rd">
                            <input type="radio" id="chk3-2" name="e_chk3">
                            <span class="form-txt">오답</span>
                        </label>
                    </li>
                    <li>
                        <label for="chk3-3" class="chk-box rd">
                            <input type="radio" id="chk3-3" name="e_chk3">
                            <span class="form-txt">정답</span>
                        </label>
                    </li>
                </ul>
            </li>
        </ul>
        <button class="quiz-btn" type="button" @click="fnCheckQuiz">정답 확인하기</button>
        <!-- 팝업 -->
        <div class="modal-wrap" v-show="giftModal">
            <div class="modal-layer">
                <div class="modal_cont">
                    <div class="alrt_txt scr_txt">
                        <div class="event-item">
                            <img src="https://img.glyde.co.kr/event/event79/popup-img-500-cash.webp" alt="" class="item-img">
                        </div>
                        <div class="prize">
                            {{modalMsg}}<br>
                            <strong class="item-name">" 500캐시 혜택 "</strong>이 지급되었습니다
                            <br><br>
                            <strong>유효기간</strong>&nbsp;&nbsp;<span class="space-0">2099.12.31</span> 까지
                        </div>
                    </div>
                </div>
                <button type="button" class="modal_btn" @click="showGiftPop">
                    <span>확인</span>
                </button>
            </div>
            <div class="dim"></div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
               giftModal:false,
               modalMsg:''
            }
        },
        methods: {
            showGiftPop() {
                const randomPopup = document.querySelector('.modal-wrap');
                const randomItem = document.querySelector('.item-img');
                // const itemName = randomPopup.querySelector('.prize.type1 .item-name');
                // const itemName2 = randomPopup.querySelector('.prize.type2 .item-name');
                // const itemTxt = randomPopup.querySelector('.prize.type1');
                // const itemTxt2 = randomPopup.querySelector('.prize.type2');
                // const itemDay = randomPopup.querySelector('.item-day');
                const randomItemBox = [
                    //즉시지급 아이템(캐시/배송비쿠폰)
                    {   
                    type:'type1',
                    imgSrc:'https://img.glyde.co.kr/event/event82/popup-img-30000-cash.webp',
                    itemName:'글라이드 캐시 30,000원',
                    day:7
                    },
                    {  
                    type:'type1',
                    imgSrc:'https://img.glyde.co.kr/event/event82/popup-img-freeticket.webp',
                    itemName:'배송비 무료 티켓',
                    day:3
                    },
                    //기타출고 아이템(상품)
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-beefribsoup.webp',
                    itemName:'통갈비 그대로 왕갈비탕 1000g',
                    },
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-pizza.webp',
                    itemName:'4가지 자연치즈 콰트로 치즈 피자',
                    },
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-porkstew.webp',
                    itemName:'통뼈그대로 우거지 감자탕 1000g',
                    },
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-beefribsoup-4-kg.webp',
                    itemName:'통갈비 그대로 왕갈비탕 선물세트 4kg',
                    },
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-brownrice.webp',
                    itemName:'쌀과 물로만 지은 현미집밥 210g x 20개입',
                    },
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-ramen.webp',
                    itemName:'칼칼라면 용기 Non Fried 105g x 24개입',
                    },
                    {  
                    type:'type2',
                    imgSrc:'https://img.glyde.co.kr/event/event82/img-whiterice.webp',
                    itemName:'쌀과 물로만 지은 집밥 210g x 24개입',
                    },
                ];
                
                //랜덤아이템
                let randomNum = Math.floor(Math.random() * randomItemBox.length);
                randomItem.setAttribute('src', randomItemBox[randomNum].imgSrc);
                console.log(randomItem)
                this.giftModal = !this.giftModal;
                this.modalMsg = '당첨을 축하드립니다!';
            },
            showFailMsg(){//퀴즈 오답
                this.modalMsg = '오답이 있어요!';
            },
            fnCheckQuiz(){//퀴즈 체크
                var quiz1 = document.getElementById('chk1-1').checked;
                var quiz2 = document.getElementById('chk2-3').checked;
                var quiz3 = document.getElementById('chk3-2').checked;
                 this.giftModal = !this.giftModal;

                if(quiz1 && quiz2 && quiz3){
                    this.showGiftPop();
                }else{
                    this.showFailMsg();
                }
            } 
        }
    }
</script>

<style scpoed>
.quiz-wrap{ padding: 60px 24px 40px;}
.quiz-list{ padding-bottom: 30px;}
.quiz-list > li{ position: relative; border:1px solid #0D4C92; border-radius: 4px; }
.quiz-list > li + li{ margin-top:53px;}
.quiz-list .label{ display: block; position: absolute; left:50%; top:-22.5px; transform: translateX(-50%); width: 45px; height: 45px; text-align: center; font-size: 16px; line-height: 45px; color: #fff; background: #0D4C92; border-radius: 50%; }
.quiz-list .question{ padding: 37px 0 30px; text-align: center; font-size: 18px; background: #e5fbff; color: #000; border-radius: 4px;}
.quiz-list .question strong{ display: block; font-size: 20px; line-height: 30px;}
.answer-list{ padding: 0 27px; text-align: left;}
.answer-list li + li{ border-top:1px solid #eee;}
.answer-list label{ display: block; height: 60px; line-height: 60px; font-size: 16px; color:#000;}
.quiz-btn{ display: block; width: 100%; height: 48px; line-height: 48px; text-align: center; font-size: 16px; font-weight: 700; background: #0D4C92; color: #fff; border-radius: 4px;}
</style>
