<template>
    <div class="list-wrapper">
        <ul>
            <li class="cart-list" v-for="(delivery , index) in deliveryType" :key="index">
                <!-- 배송종류 -->
                <div class="list-tit">
                    <div class="delivery-detail">
                        <strong class="tit">{{delivery.title}}</strong>
                        <span class="desc">{{delivery.desc}}</span>
                    </div>
                    <span class="delivery-info">{{delivery.info}}</span> 
                </div>
                <!-- 리스트 -->
                <ul class="list-cont">
                    <cart-item-list v-for="(item, index) in cartItemList" :key="index"
                        :disabled = item.disabled
                        :detail-page = item.detailPage
                        :label="item.label"
                        :thumb= item.thumb
                        :name= item.name
                        :status= item.status
                        :price = item.price
                        :promotion="item.promotion"
                    ></cart-item-list>
                </ul>
                <!-- 배송비조건 -->
                <div class="delivery-fee-info" v-if="delivery.deliveryFree">
                    <strong class="fee">배송비 +<span class="space-0">3,000</span>원</strong>
                    <span class="space-0">36,800</span>원 추가 구매 시 무료배송
                </div>
                <div class="delivery-fee-info" v-else>무료배송</div>
            </li>
        </ul>

        <div class="pop">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam tempora quaerat perspiciatis, expedita inventore incidunt odit consectetur corporis rerum, ea accusamus ipsum sed provident ipsam doloremque quo, iure dolores nisi!
        </div>

    </div>
</template>

<script>
    module.exports = {
        components: {
            'cart-item-list': httpVueLoader('./cartItemList.vue'), 
        },
        props:[],
        data() {
            return {
                deliveryType:[],
                cartItemList:[],
            }
        },
        created(){
            this.deliveryType = [
                {
                    title:'일반배송',
                    desc:'새벽 7시까지 배송됩니다',
                    info:'내일(화) 새벽도착 예정',
                    deliveryFree:false,
                    
                },
                {
                    title:'새벽배송',
                    desc:'새벽 7시까지 배송됩니다',
                    info:'내일(화) 새벽도착 예정',
                    deliveryFree:true
                    
                },
                {
                    title:'초고속배송',
                    desc:'새벽 7시까지 배송됩니다',
                    info:'내일(화) 새벽도착 예정',
                    deliveryFree:false,
                    
                },
                {
                    title:'일반배송',
                    desc:'새벽 7시까지 배송됩니다',
                    info:'내일(화) 새벽도착 예정',
                    deliveryFree:false,
                    
                },
            ]
            this.cartItemList = [
                { //detault 
                        disabled:false,
                        detailPage:'#',
                        label:'new',
                        thumb:'../common/images/tmp/tmp-food_2.jpg',
                        name:'상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이',
                        status:'ice',
                        price:'4,500',
                        promotion:true
                },  
                { //disabled case
                        disabled:true,
                        label:'soldout',
                        detailPage:'#',
                        label:'soldout',
                        thumb:'../common/images/tmp/tmp-food_2.jpg',
                        name:'상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이',
                        status:'frozen',
                        price:'4,500'
                },  
                { //soldout case
                        disabled:false,
                        detailPage:'',
                        label:'best',
                        thumb:'../common/images/tmp/tmp-food_2.jpg',
                        name:'상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이',
                        status:'ice',
                        price:'4,500'
                },  
                { //discount case
                        disabled:false,
                        detailPage:'',
                        thumb:'../common/images/tmp/tmp-food_2.jpg',
                        name:'상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이',
                        status:'ice',
                        price:'4,500'
                },  
                { //freeGift case
                        disabled:false,
                        detailPage:'',
                        thumb:'../common/images/tmp/tmp-food_2.jpg',
                        name:'상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이상품명최대길이',
                        status:'ice',
                        price:'4,500'
                },  
            ]
        },
        methods: {
            
        }
    };
</script>
<style scoped>
    .list-wrapper{ position: relative; height: 600px; overflow: auto; overscroll-behavior: none; }
    .cart-list .list-tit{ position: sticky; top:0; z-index: 1; display: flex; justify-content: space-between; padding:16px; font-size: 12px; border-bottom:1px solid #eee; background: #fff; }
    .cart-list .list-cont{ padding:16px 14px; }
    .delivery-detail .tit{ font-size: 16px; color:#000; }
    .delivery-detail .desc{ display: block; font-size: 12px; }
    .delivery-fee-info{ margin:24px 16px 0; padding: 14px 12px; text-align: center; font-size: 14px; background: #f9f9f9; color:#000; border-radius: 4px; }
    .delivery-fee-info .fee{ display: block; margin-bottom: 2px; color:#65cac0; }
</style>


