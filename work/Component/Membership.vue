<template>
            <div class="membership-wrap">
                <div class="grade-info">
                    <div class="grade-txt">
                        <p class="txt-sty1">
                            <span>홍길동</span>님의 이번 달 레벨은<br>Level 1입니다
                        </p>
                        <span class="txt-sty2">다음달 예상 레벨은 Level 2입니다.</span>
                    </div>
                    <div class="grade-bg" :style="{'background-color' : gradeBg[gradeIndex]}">
                        <img :src="glydeGrade[gradeIndex].gradeImg" alt="" class="grade-img">
                    </div>
                </div>
                <div class="grade-benefit">
                    <strong class="benefit-tit">레벨별 혜택</strong>
                    <ul class="grade-list">
                        <li>
                            <button type="button" @click="showBenefit(0)">
                                <img src="../common/images/icon/ico-membership-level-1.png" alt="" class="grade-icon">
                                <span class="grade-name" :class="{'on' : gradeIndex == 0}">Level 1</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" @click="showBenefit(1)">
                                <img src="../common/images/icon/ico-membership-level-2.png" alt="" class="grade-icon">
                                <span class="grade-name" :class="{'on' : gradeIndex == 1}">Level 2</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" @click="showBenefit(2)">
                                <img src="../common/images/icon/ico-membership-level-3.png" alt="" class="grade-icon">
                                <span class="grade-name" :class="{'on' : gradeIndex == 2}">Level 3</span>
                            </button>
                        </li>
                        <li>
                            <button type="button" @click="showBenefit(3)">
                                <img src="../common/images/icon/ico-membership-level-4.png" alt="" class="grade-icon">
                                <span class="grade-name" :class="{'on' : gradeIndex == 3}">Level 4</span>
                            </button>
                        </li>
                    </ul>

                    <!--유저등급 혜택-->
                    <div class="user-benefit" v-if="gradeIndex > 0">
                        <span class="sub-tit">{{glydeGrade[gradeIndex].gradeName}} 혜택</span>
                        <ul class="benefit-list">
                            <li class="benefit txt-sty2 delivery">
                                배송비 티켓
                                <strong v-html="glydeGrade[gradeIndex].gradeBenefit.coupon"></strong>
                            </li>
                            <li class="benefit txt-sty2 new" v-if="gradeIndex >= 2">
                                {{freeProductTxt}}
                                <strong v-html="glydeGrade[gradeIndex].gradeBenefit.newMenu"></strong>
                            </li>
                            <li class="benefit txt-sty2 cash" v-if="gradeIndex >= 2">
                                캐시 지급
                                <strong v-html="glydeGrade[gradeIndex].gradeBenefit.cash"></strong>
                            </li>
                            <li class="benefit txt-sty2 percent">
                                구매 적립
                                <strong v-html="glydeGrade[gradeIndex].gradeBenefit.percentage"></strong>
                            </li>
                        </ul> 
                    </div>
                    
                    <!--모든 레벨혜택-->
                    <div class="common-benefit-wrap">
                        <span class="sub-tit2">모든 레벨 혜택</span>
                        <ul class="benefit-list">
                            <li class="benefit txt-sty2 birthday">
                                생일 당일 선물
                                <strong>소고기 미역국</strong>
                            </li>
                            <li class="benefit txt-sty2">
                                앱 구매 시
                                <strong><em class="space-0">1.5%</em> 추가 적립</strong>
                            </li>
                        </ul>
                    </div>

                     <!--등급기준-->
                     <div class="grade-standard">
                        <span class="sub-tit user" :class="{'pure' : gradeIndex == 1 , 'happy' : gradeIndex == 2, 'loyal' : gradeIndex == 3}">등급 기준(최근 3개월)</span> 
                        <div class="standard-list">
                            <div class="list">
                                <span>실 결제 금액</span>
                                <span class="terms" v-html="glydeGrade[gradeIndex].detail.pay"></span>
                            </div>
                            <div class="list">
                                <span>구매 횟수</span>
                                <span class="terms" v-html="glydeGrade[gradeIndex].detail.buy"></span>
                            </div>
                            <div class="list">
                                <span>리뷰 작성</span>
                                <span class="terms" v-html="glydeGrade[gradeIndex].detail.review"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!--최근 이용내역-->
                <div class="usage-details">
                    <div class="details">
                        <strong class="txt-tit-black2">최근 3개월 이용내역</strong>
                        <p class="details-date">
                            2022.09.01~2022.11.30
                            <span>배송완료 기준</span>
                        </p>
                        <div class="list">
                            <span>실 결제 금액</span>
                            <span class="terms"><em class="space-0">{{userUsage.pay}}</em>원</span>
                        </div>
                        <div class="list">
                            <span>구매 횟수</span>
                            <span class="terms"><em class="space-0">{{userUsage.buy}}</em>회</span>
                        </div>
                        <div class="list">
                            <span>리뷰 작성</span>
                            <span class="terms"><em class="space-0">{{userUsage.review}}</em>건</span>
                        </div>
                        <span class="grade-terms">
                            최근 3개월 실 결제 금액으로 등급이 산정됩니다.<br>
                            (글라이드 캐시 사용분, 배송비, 반품 건 제외)
                        </span>
                    </div>
                </div>

            </div>
</template>

<script>
    module.exports = {
		data() {
			return {
				pageTitle: '등급 혜택',
                glydeGrade:[],
                gradeIndex:0, //user 등급 
                gradeBg:['#e9edf7','#dbf3ff','#ffe5ea','#4997f1'],
                userUsage:{
                    pay: '10,000',
                    buy: '1',
                    review: '0',
                },
                freeProductTxt:'신메뉴 체험' 

			}
		},
        created(){
         this.glydeGrade = [
            {
                gradeName:'Level 1',
                gradeImg:'../common/images/icon/ico-membership-level-1.png',
                detail:{
                    pay: '<em class="space-0">5</em>만원 미만',
                    buy: '<em class="space-0">1</em>회 미만',
                    review: '<em class="space-0">5</em>건 미만',
                },
                gradeBenefit:{
                    coupon: '1장',
                    percentage: '1%',
                }
            },
            {
                gradeName:'Level 2',
                gradeImg:'../common/images/icon/ico-membership-level-2.png',
                detail:{
                    pay: '<em class="space-0">5</em>만원 이상',
                    buy: '<em class="space-0">1</em>회이상',
                    review: '<em class="space-0">5</em>건이상',
                },
                gradeBenefit:{
                    coupon: '<em class="space-0">1</em>장',
                    percentage: '<em class="space-0">1%</em>',
                }
            },
            {
                gradeName:'Level 3',
                gradeImg:'../common/images/icon/ico-membership-level-3.png',
                detail:{
                    pay: '<em class="space-0">10</em>만원 이상',
                    buy: '<em class="space-0">3</em>회이상',
                    review: '<em class="space-0">10</em>건이상',
                },
                gradeBenefit:{
                    coupon: '<em class="space-0">2</em>장',
                    percentage: '<em class="space-0">2%</em>',
                    newMenu : '<em class="space-0">1</em>개',
                    cash: '<em class="space-0">2</em>천원'
                }
            },
            {
                gradeName:'Level 4',
                gradeImg:'../common/images/icon/ico-membership-level-4.png',
                detail:{
                    pay: '<em class="space-0">15</em>만원 이상',
                    buy: '<em class="space-0">5</em>회이상',
                    review: '<em class="space-0">10</em>건이상',
                },
                gradeBenefit:{
                    coupon: '무제한',
                    percentage: '<em class="space-0">3%</em>',
                    newMenu : '<em class="space-0">1</em>개',
                    cash: '<em class="space-0">3</em>천원'
                }
            },
         ]
        },
		methods:{
            showBenefit(gradeIndex){
                this.gradeIndex = gradeIndex;
                if(gradeIndex == 3){
                    this.freeProductTxt = '베스트메뉴 체험';
                }else{
                    this.freeProductTxt = '신메뉴 체험';
                }
            }
		}
    }
</script>

<style scpoed>
.membership-wrap .grade-bg{ background: #e9edf7; }
.membership-wrap .sub-tit{ font-size: 16px; color:#000; }
.membership-wrap .sub-tit2{ font-size: 12px; color:#aaa; }
.membership-wrap .space-0{ font-size: 15px;}
.membership-wrap .grade-info .txt-sty1{ margin-bottom: 14px; }
.membership-wrap .grade-info .grade-txt{ padding: 40px 16px 20px; }
.membership-wrap .grade-info .grade-img{ display: block; margin:0 auto; padding:20px 0; max-width: 200px; }
.membership-wrap .user-benefit{ padding-bottom:16px; }
.membership-wrap .grade-benefit{ padding:24px 16px 32px; }
.membership-wrap .grade-benefit .benefit-tit{ font-size: 16px; color:#000;}
.membership-wrap .grade-list{ display:flex; padding: 20px 0 30px; text-align: center; }
.membership-wrap .grade-list li{ flex:1; }
.membership-wrap .grade-list button{ width: 100%; }
.membership-wrap .grade-list .grade-icon{ width:48px; height: 48px;}
.membership-wrap .grade-list .grade-name{ display: block; margin-top: 8px; font-size: 14px; letter-spacing: 0; color:#aaa; }
.membership-wrap .grade-list .grade-name.on{ font-weight: 700; color:#3E54AC; }
.membership-wrap .grade-list li:nth-child(2) .grade-name.on{ color:#655DBB; }
.membership-wrap .grade-list li:nth-child(3) .grade-name.on{ color:#67ace6; }
.membership-wrap .grade-list li:nth-child(4) .grade-name.on{ color:#2375d8; }
.membership-wrap .benefit-list{ display: flex; flex-wrap: wrap;}
.membership-wrap .benefit-list li{ margin-top: 8px; padding: 14px 16px; width: calc(50% - 4px); background: #f9f9f9; border-radius: 4px;}
.membership-wrap .benefit-list li:nth-child(odd){ margin-right: 8px;}
.membership-wrap .benefit-list li strong{ display: block; margin-top: 3px; font-weight: 500; color:#000;}
.membership-wrap .grade-standard{ padding-top: 40px; }
.membership-wrap .grade-standard .sub-tit.user{ display: block; padding-left: 28px; line-height: 24px; background: url(../../common/images/icon/ico-membership-level-1.png) no-repeat left center / 24px; }
.membership-wrap .grade-standard .sub-tit.user.pure{ background-image: url(../../common/images/icon/ico-membership-level-2.png); }
.membership-wrap .grade-standard .sub-tit.user.happy{ background-image: url(../../common/images/icon/ico-membership-level-3.png); }
.membership-wrap .grade-standard .sub-tit.user.loyal{ background-image: url(../../common/images/icon/ico-membership-level-4.png); }
.membership-wrap .standard-list{ margin-top:14px; padding: 16px 22px 16px 17px; border:1px solid #eee; border-radius: 4px; }
.membership-wrap .list{ display: flex; justify-content: space-between; align-items: center; font-size: 14px; color:#888; }
.membership-wrap .list + .list{ margin-top: 10px; }
.membership-wrap .list .terms{ font-size: 14px; color:#000; }
.membership-wrap .grade-terms{ display: block; margin-top:20px; padding-top:14px; font-size: 12px; line-height: 18px; color: #888; border-top: 1px solid #eee; }
.membership-wrap .grade-benefit-info{ padding:24px 16px 32px; border-top: 10px solid #f5f5f5;}
.membership-wrap .usage-details{ border-top:10px solid #eee; }
.membership-wrap .details{ padding: 24px 16px 32px;}
.membership-wrap .details .details-date{ margin: 6px 0 20px; color:#888; }
.membership-wrap .details .details-date span{ padding-left: 2px; }
.membership-wrap .notice-list > li{ margin-top: 14px; }
.membership-wrap .dot-gray-ul > li{ margin-top:4px; color: #666;}
.membership-wrap .dot-gray-ul li:first-child{ margin-top:8px;}
.membership-wrap .notice-list .txt-tit-black{ font-weight: 500;}
.membership-wrap .btn-promotion{ margin: -4px 0 24px; height:48px;line-height: 48px; border: 1px solid #c7c7c7; border-radius: 4px;}
.membership-wrap .btn-promotion span{ padding-left: 6px; }
</style>
