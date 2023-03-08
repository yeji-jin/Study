<template>
    <li class="cart-item-list">
        <div class="cart-item" :class=" {'disabled' : disabled }"> <!-- 일시품절/판매중지case -->
            <a :href="detailPage">
                <div class="prdt-item">
                    <div class="prdt-label" v-if="label">
                        <span v-if="label == 'soldout'" class="label soldout">일시품절</span>
                        <span v-if="label == 'best'" class="label best">베스트</span>
                        <span v-if="label == 'new'" class="label new">신규상품</span>
                    </div>
                    <div class="prdt-thumb">
                        <img :src="thumb" :alt="name" class="thumb-type1">
                    </div>
                    <div class="prdt-info">
                        <span class="prdt-name ellipsis">{{name}}</span>    
                        <span class="prdt-status" v-if="status == 'ice'">냉장&middot;냉장보관</span>    
                        <span class="prdt-status" v-if="status == 'frozen'">냉동&middot;냉동</span>    
                        <strong class="prdt-price"><em class="space-0">{{price}}</em>원</strong> 
                    </div>   
                </div>
            </a>
            <!-- btn-count-->
            <btn-count
                :disabled="label == 'soldout'">
            </btn-count>
        </div> 
        <!-- item delivery msg -->
        <div v-if="label == 'soldout'" class="item-desc">더 좋은 상품으로 찾아뵙겠습니다.</div>
        <!-- promotion item-->
        <promotion-free-item
            v-if="promotion"
            :pm-item-thumbs="thumb"
            :pm-item-name="name">
        </promotion-free-item>
    </li>
</template>

<script>
    module.exports = {
        components:{
            'btn-count': httpVueLoader('./BtnCount.vue'),
            'promotion-free-item': httpVueLoader('./PromotionItem.vue'),
        },
        props:[
            'disabled',
            'detailPage',
            'label',
            'thumb',
            'name',
            'status',
            'price',
            'promotion'
        ],
        data() {
            return {
                
            }
        },
        created(){

        },
        methods: {
            
        }
    }
</script>

<style scoped>
.cart-item-list + .cart-item-list{ margin-top:34px;}
.prdt-item{ position: relative; display: flex;}
.cart-item{ position: relative; }
.cart-item.disabled .prdt-item::before{ content: ""; position: absolute; left:0; top:0; width:100%; height: 100%; background: rgba(255,255,255,0.7); }
.prdt-item .prdt-info{ margin: 4px 0 0 12px; width:calc(100% - 72px);}
.prdt-item .prdt-info span{display: block;}
.thumb-type1{width:72px; border-radius: 4px; }
.prdt-name{ padding-bottom:6px; font-size: 14px; font-weight: 400; color:#000; }
.prdt-price{ font-size: 12px; color:#000; }
.prdt-price em{ margin-right: 2px; font-size: 16px; }
.prdt-status{ padding-bottom: 5px; line-height: 18px; }
.item-desc{margin-top: 20px; padding:5px 8px; text-align: center; font-size: 14px; background:#f9f9f9; border-radius: 4px;}

</style>
