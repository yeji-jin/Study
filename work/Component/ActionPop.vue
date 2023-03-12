<template>
       <div class="action-pop">
            <div class="pop-inner">
                <div class="prdt-info">
                    <img src="https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp" alt="" class="pop-thums">
                    <div class="">
                        <span class="head-copy"></span>
                        <span class="name"></span>
                        <strong class="price"></strong>
                    </div>
                </div>
                <btn-count></btn-count>
            </div>
            <div class="dim" @click="removeDim"></div>
       </div>
</template>

<script>
    module.exports = {
        components:{
            'btn-count': httpVueLoader('./BtnCount.vue'),
        },
        data() {
            return {
                count:0,
                modalFlag:false,
            }
        },
        methods: {
            removeDim(){
                this.$emit('remove-dim', false);
            }
        }
    }
</script>

<style scpoed>
.action-pop{ position: sticky; bottom: 0; width:100%; height:100%;margin-top: -100px;  display: flex; flex-direction: column-reverse; z-index: 100;}
.action-pop .dim{ position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,.5); z-index: -1;}
.action-pop .pop-inner{ padding:30px 24px; min-height: 200px; animation: startActionSheet .3s cubic-bezier(0.4, 0, 0.2, 1); border-top-left-radius: 20px; border-top-right-radius: 20px; background: #fff;}
.action-pop .btn-count{ right:24px; bottom: 30px; border-color:#999; }
.action-pop .pop-thums{ width:50px; }
@keyframes startActionSheet {
    0%{transform: translateY(100%);}
    100%{transform: translateY(0);}
}
</style>
