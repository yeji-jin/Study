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
                            <img src="{{itemImg}}" alt="" class="item-img">
                        </div>
                        <div class="prize" v-if="answer">
                            {{modalMsg}}<br>
                            <strong class="item-name">" {{itemName}} "</strong>이 지급되었습니다
                            <br><br>
                            <strong>유효기간</strong>&nbsp;&nbsp;<span class="space-0">2099.12.31</span> 까지
                        </div>
                        <div class="prize" v-else>{{modalMsg}}</div>
                    </div>
                </div>
                <button type="button" class="modal_btn" @click="fnCheckQuiz">
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
               modalMsg:'',
               answer:false,
               itemImg:'../common/images/icon/ico-randombox.png',
               itemName : '5000캐시 혜택'
            }
        },
        methods: {
            showGiftPop() {
                const randomItem = document.querySelector('.item-img');
                const randomItemBox = [
                    {   
                        imgSrc:'../common/images/icon/ico-randombox.png',
                        itemName:'당첨상품-1',
                    },
                    {  
                        imgSrc:'../common/images/icon/ico-randombox.png',
                        itemName:'당첨상품-2',
                    },
                    {  
                        imgSrc:'../common/images/icon/ico-randombox.png',
                        itemName:'당첨상품-3',
                    },
                    {  
                        imgSrc:'../common/images/icon/ico-randombox.png',
                        itemName:'당첨상품-4',
                    },
                    {  
                        imgSrc:'../common/images/icon/ico-randombox.png',
                        itemName:'당첨상품-5',
                    },
                ];
                
                //랜덤아이템
                let randomNum = Math.floor(Math.random() * randomItemBox.length);
                randomItem.setAttribute('src', randomItemBox[randomNum].imgSrc);
                this.itemName = randomItemBox[randomNum].itemName;
                this.modalMsg = '당첨을 축하드립니다!';
            },
            showFailMsg(status){//퀴즈 오답
                const randomItem = document.querySelector('.item-img');
                randomItem.setAttribute('src', '../common/images/icon/icon-amazed.png');
                status == 'no-chk' ? this.modalMsg = '문제를 체크해주세요!' : this.modalMsg = '오답이 있어요! 다시 한 번 풀어보세요!'
                
            },
            fnCheckQuiz(){//퀴즈 체크
                let isQuizChecked = [];
                document.querySelectorAll('.quiz-wrap input').forEach(input =>{
                    if(input.checked) isQuizChecked.push(input.checked);
                });
                var quiz1 = document.getElementById('chk1-1').checked;
                var quiz2 = document.getElementById('chk2-2').checked;
                var quiz3 = document.getElementById('chk3-3').checked;
                this.giftModal = !this.giftModal;

                if(quiz1 && quiz2 && quiz3){
                    this.answer = true;
                    this.showGiftPop();
                }else{
                    this.answer = false;
                    isQuizChecked.length < 3 ? this.showFailMsg('no-chk') : this.showFailMsg();
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
.event-item{ margin:0 auto; max-width: 200px;}
</style>
