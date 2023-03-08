<template>
    <div class="btn-count">
        <button type="button" class="btn-minus" aria-label="수량내리기" :disabled="count == 0 || disabled" @click="countChange('minus')">
            <span class="skip">감소</span>
        </button>
        <span class="count" :class="{'disabled' : disabled}">{{count}}</span>
        <button type="button" class="btn-plus" aria-label="수량올리기" :disabled="disabled" @click="countChange('plus')">
            <span class="skip">증가</span>
        </button>
    </div>
</template>

<script>
    module.exports = {
        props:[
           'disabled'
        ],
        data() {
            return {
                count:0
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
            }
        }
    }
</script>

<style scpoed>
/* count */
.btn-count { position: absolute; right:0; bottom:-2px; display: flex; width: 104px; padding: 7px; background: #fff; border: 1px solid #eee; border-radius: 20px;}
.btn-count button { width: 24px; height: 24px; background-size: 24px;}
.btn-minus{background: url(../../common/images/Icon_Button_Minus_24_normal.svg);}
.btn-minus:disabled{background: url(../../common/images/Icon_Button_Minus_24_disable.svg);}
.btn-plus{background: url(../../common/images/Icon_Button_Plus_24_normal.svg);}
.btn-plus:disabled{background: url(../../common/images/Icon_Button_Plus_24_diable.svg);}
.skip { position: absolute; left: -9999px; top: -9999px; text-indent: -9999px;}
.btn-count .count { display: block; width: 35px; text-align: center; font-size: 17px; font-weight: 700; color: #000; line-height: 24px;}
.count.disabled {color: #ddd;}
</style>
