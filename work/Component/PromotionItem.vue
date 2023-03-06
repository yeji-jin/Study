<template>
    <!-- 프로모션상품에 관련된 체험상품-->
    <div class="cart-prdt-ex">
        <a href="#">
            <div class="prdt-item">
                <div class="prdt-thumb">
                    <img class="thumb-type1" :src="pmItemThumbs" :alt="pmItemName">
                </div>
                <!-- info -->
                <div class="prdt-info">
                    <span class="prdt-in-date">03/15 13:08까지 유효</span>
                    <span class="prdt-head-copy ellipsis2">[체험상품] {{pmItemName}}</span>
                    <span class="prdt-price">수량 1개</span>
                    <span class="prdt-desc">해당 체험상품은 도서산간 배송이 안되는 상품입니다</span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
    module.exports = {
        props:['pmItemThumbs', 'pmItemName']
    }
</script>

<style scoped>
.cart-prdt-ex .prdt-thumb img{ width:50px; height:50px;}
.cart-prdt-ex{margin:20px 0 14px 26px; padding: 12px 12px 16px 12px; box-shadow: 0 1px 4px 0 rgba(0,0,0,.13); border-radius: 4px;} 
.cart-prdt-ex .prdt-thumb{padding-left:0}
.cart-prdt-ex .prdt-head-copy{padding:2px 0 4px; display: -webkit-box; font-size: 13px; color:#000; }
.cart-prdt-ex .prdt-price{margin:0;}
.cart-prdt-ex .prdt-desc{ display: block; padding-top: 10px; line-height: 16px; }
.prdt-in-date{color:#f46100;}
</style>
