<template>
       <button type="button" class="btn-cart" @click="showItemModal">
            <span class="skip">장바구니 담기</span>
       </button>
</template>

<script>
    module.exports = {
        props:[
           'disabled'
        ],
        data() {
            return {
                count:0,
                modalFlag:false,
            }
        },
        methods: {
            countChange(calc){
                if(this.count >= 0){
                    if(calc == 'plus'){
                        this.count++
                    }else{
                         this.count--;
                    }
                }
            },
            showItemModal(){
                this.modalFlag = !this.modalFlag;
                this.$emit('cart', this.modalFlag);
            },
        }
    }
</script>

<style scpoed>
.btn-cart{ position: absolute; bottom:4px; right:8px; width: 36px; height:36px; background: url(../../common/images/button/ico-bag.png) no-repeat center / 50%; border-radius: 50%; border:1px solid #ccc; }
</style>
