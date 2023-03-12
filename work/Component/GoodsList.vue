<template>
    <li class="category-list">
        <div class="cart-disable-mask" :class="{disable : disabled}"> 
            <a href="javascipt:void(0)">
                <!-- Label case -->
                <div class="prdt-label" v-if="label">
                    <span v-if="label == 'soldout'" class="label soldout">일시품절</span>
                    <span v-if="label == 'best'" class="label best">베스트</span>
                    <span v-if="label == 'new'" class="label new">신규상품</span>
                </div>
                <!-- thumb -->
                <div class="prdt-item">
                    <div class="prdt-thumb">
                        <img class="thumb" :src="thumb"/>
                        <!-- 일시품절 메세지영역 -->
                        <!-- <div class="soldout-box" v-if="this.disabled">
                            <div class="soldout-msg">
                                <p class="msg-1">일이삼사오육칠팔구</p>
                                <span class="msg-2">일이삼사오육칠팔구십일이삼사</span>
                            </div>
                        </div> -->
                        <!-- 입고알람/대체상품 버튼 추가 -->
                        <!-- <button type="button" class="restock-btn" v-if="this.disabled" @click.prevent="showToastMsg">
                            <i class="icon-restock-alarm">입고시 알람</i>
                        </button>
                        <button type="button" class="replace-btn" v-if="this.disabled" @click.prevent="showRecommendSheet('replace-goods')">
                            <span class="ico-arrow-right16-white">대체상품</span>
                        </button> -->
                    </div>
                    <!-- info -->
                    <div class="prdt-info">
                        <div class="prdt-head-copy ellipsis">
                            <strong class="info-label" v-if="info">{{info}}</strong>
                            {{ headCopy }}
                        </div>
                        <div class="prdt-name ellipsis2">{{ name }}</div>
					    <div class="prdt-evalution" :class="{'off': !reviewNum}"> <!-- 리뷰없을시 off :class -->
					    	<div class="evaluation-table">
                                <em class="star" v-if="score">★</em> 
					    		<strong class="score space-0" v-if="score">{{score}}</strong> 
					    		<span class="review-info">리뷰 <em class="num">{{reviewNum}}</em></span> 
					    	</div>
					    </div>
                        <!-- 할인 -->
                        <div class="prdt-price-serving" :class="{ 'discount' : cost }"> 
                            <span v-if="discount" class="prdt-discount">{{discount}}%</span>
                            <span class="prdt-price"><em class="space-0">{{ price }}</em>원</span>
                            <del class="prdt-cost" v-if="cost"><em class="num-type5">{{cost}}</em>원</del> 
                        </div>
                    </div>
                </div>
            </a>
            <btn-cart @cart="transActionSheet"></btn-cart> 
        </div>
    </li>
</template>

<script>
    module.exports = {
        props: [
            'thumb',
            'info',
            'headCopy',
            'name',
            'price',
            'label',
            'disabled',
            'score', 
            'reviewNum',  
            'discount', 
            'cost'
        ], 
         data:function(){
            return{
                cartModal:false
            }
        },
        components: {
            'btn-cart': httpVueLoader('./BtnCart.vue'),
        },
        methods:{
            transActionSheet(){
                this.cartModal = true
                this.$emit('action-sheet', this.cartModal)
            }
        }
    }
</script>

<style scoped>
.category-list{ padding:0 4px 40px; width:50%; }
.category-list .cart-disable-mask{ position: relative; }
.category-list .thumb{ width: 100%;}
.category-list .prdt-info{ padding-top:10px;}
.info-label{ padding:2px 4px; margin-right: 2px; font-size: 10px; background: #a09d9d; color:#fff; border-radius: 2px;}
.star{font-size: 16px; margin-right: 2px;  color:orange;}
.score::after{content: ""; display: inline-block; margin:3px 4px; width:2px; height: 2px; background: #999 ; }
.prdt-head-copy{font-size: 13px;}
.prdt-name{ margin:4px 0 8px; font-size: 14px; color:#000;}
.evaluation-table{ display: flex; align-items: center; min-height:24px; font-size: 12px; color:#333; }
.prdt-price{font-size:14px; color:#000; font-weight: 700; vertical-align: bottom; }
.prdt-price .space-0{ margin-right: 2px; font-size:16px; }
.prdt-discount{ padding-right: 2px; font-size: 14px; font-weight: 700; letter-spacing: 0; color:red; }
.prdt-cost{ display: block; padding-top: 2px; color:#999;}
</style>
