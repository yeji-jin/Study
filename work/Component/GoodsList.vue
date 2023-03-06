<template>
    <li>
        <div class="cart-disable-mask" :class="{disable : disabled}"> <!-- 20220408: :class="{disabled : disabled}" 추가 -->
            <!-- Label case -->
            <div class="label-area">
                <i :class="labelClass" v-if="labelClass">{{labelName}}</i> <!-- 20220408: :labelClass / labelName 수정-->
                <i :class="labelClass2" v-if="labelClass2">{{labelName2}}</i> <!-- 20220408: :labelClass2 / labelName2 수정-->
                <!-- <i class="label-tip" v-if="TipLabel">맛개선</i>
                <i class="label-event" v-if="eventLabel">이벤트</i>
                <i class="label-soldout" v-if="soldOutLabel">일시품절</i>
                <i class="label-best" v-if="bestLabel">베스트</i>
                <i class="label-new" v-if="newLabel">신규상품</i>
                <i class="label-set" v-if="setLabel">세트상품</i>
                <i class="label-giftset" v-if="giftLabel">선물하기</i>
                <i class="label-delivery-dawn" v-if="dawnLabel">새벽배송</i>
                <i class="label-limit" v-if="limitLabel">한정수량</i> -->
            </div>
            <a href="#">
                <div class="prdt-item">
                    <div class="prdt-thumb">
                        <div class="crop">
                            <img class="thumb-type1" :src="thumbType1"/>
                        </div>
                        <!-- 일시품절 메세지영역 -->
                        <div class="soldout-box" v-if="this.disabled">
                            <div class="soldout-msg">
                                <p class="msg-1">일이삼사오육칠팔구</p>
                                <span class="msg-2">일이삼사오육칠팔구십일이삼사</span>
                            </div>
                        </div>
                        <!-- 20220818 : 입고알람/대체상품 버튼 추가 -->
                        <button type="button" class="restock-btn" v-if="this.disabled" @click.prevent="showToastMsg">
                            <i class="icon-restock-alarm">입고시 알람</i>
                        </button>
                        <button type="button" class="replace-btn" v-if="this.disabled" @click.prevent="showRecommendSheet('replace-goods')">
                            <span class="ico-arrow-right16-white">대체상품</span>
                        </button>
                    </div>
                    <div class="prdt-info">
                        <dl>
                            <dt class="prdt-head-copy">
                                <span class="prd-info-label-s" v-show="infoLabel">{{infoLabel}}</span>{{ headCopy }}</dt> <!-- label > infoLabel 변경 -->
                            <dd class="prdt-name">{{ productName }}</dd>
                            <!-- 상품 전시별점 (리뷰+별점 존재 / 리뷰만 존재 / 둘다 없는 CASE) -->
							<dd class="prdt-evalution" :class="{'off': !reviewNum}"> <!-- 리뷰없을시 off :class -->
								<div class="evaluation-table">
									<img src="../common/images/detail/icon-info-review-star-full.svg" alt="" class="img-star" v-if="reviewScore"> 
									<strong class="score" v-if="reviewScore">{{reviewScore}}</strong> 
									<span class="review-info">리뷰 <em class="num">{{reviewNum}}</em></span> 
								</div>
							</dd>
                            <!-- 20220929 : 유통기한임박상품 할인 -->
                            <dd class="prdt-price-serving" :class="{ 'discount' : cost }"> <!-- 20221109 : class 조건변경 -->
                                <span v-if="discount" class="prdt-discount">{{discount}}%</span>
                                <span class="prdt-price"><em class="num-type1">{{ price | toNumber }}</em>원</span>
                                <span class="prdt-cost" v-if="cost"><em class="num-type5">{{cost}}</em>원</span> <!-- 20221109 : v-if조건삭제 -->
                            </dd>
                        </dl>
                    </div>
                </div>
            </a>
            <btn-add-cart :cartmain="false" :cart-disable="disabled" :class="{ 'discount' : cost }"></btn-add-cart> <!-- 20221109 : class 조건변경 -->
        </div>
    </li>
</template>

<script>
    //# sourceURL=/vcomps/goods/WideTileComponent.vue
    module.exports = {
        props: [
            'thumbType1',
            'infoLabel',
            'headCopy',
            'productName',
            'price',
            'labelClass',
            'labelName',
            'labelClass2',
            'labelName2',
            'disabled',
            'reviewScore', 
            'reviewNum',  
            'discount', //20220929 할인율
            'cost' //20220929 원가
        ], 
         data:function(){
            return{
               
            }
        },
        components: {
            'btn-add-cart': httpVueLoader('../common/button/BtnAddCart.vue'),
        },
        methods:{
            showRecommendSheet:function(ActionSheetclass){ //20220818 추가
                new ActionSheet('.' + ActionSheetclass).show();
			},
            showToastMsg:function(){ //20220818 추가
                this.$emit('toast');
            }
        }
    }
</script>
