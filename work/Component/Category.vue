<template>
    <div class="category-wrap" :class="{'hold' : ActionSheet}">
        <!-- 카테고리 header -->
        <div class="category-header">
            <button class="category-nav" type="button" role="button" @click="catClikc" :class="{'on' : catActive }">{{selectedNav}}</button>
            <div class="category-nav-list" :class="{'on' : catActive }">
                <ul>
                    <li v-for="(name,index) in category" :key="index" @click="changeNav(name,index)">
                        <a href="javascript:void(0)">
                            {{name}}{{index}}
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 카테고리 서브 메뉴 -->
            <div class="swiper-container sub-nav">
                <ul class="swiper-wrapper">
                    <li v-for="(subCat,index) in subList" :key="index" class="swiper-slide sub-list" :class="{'on' : index == currentIdx}" @click="changeSubCat(index)">
                        <a href="javascript:void(0)" role="button">
                            {{subCat}}{{index}}
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 필터 -->
            <ul class="sorting-wrap">
                <li>
                    <button type="button" class="btn-sorting step1" @click="sortingView('step1')">
                        <span>1단 배열로 상품보기</span>
                    </button>
                </li>
                <li>
                    <button type="button" class="btn-sorting step2"  @click="sortingView('step2')">
                        <span>2단 배열로 상품보기</span>
                    </button>
                </li>
            </ul>
        </div>
        
        <!-- 카테고리 컨테이너 -->
        <div class="category-container">
            <ul class="category-wrapper" :class="{'step-1' : sorting == 'step-1' , 'step-2' : sorting == 'step-2'}">
                <goods-list v-show="currentIdx % 2 == 0" v-for="(item,index) in itemList" :key="index"
                    :disabled="item.disabled"
                    :label="item.label"
                    :thumb="item.thumb"
                    :info="item.info"
                    :head-copy="item.headCopy"
                    :name="item.name"
                    :price="item.price"
                    :star="item.star"
                    :review-num="item.review"
                    :score="item.score"
                    :discount="item.discount"
                    :cost="item.cost"
                    @action-sheet="showActionSheet"
                >   
                </goods-list>
                <goods-list v-show="currentIdx % 2 !== 0" v-for="(item,index) in itemList2" :key="index"
                    :disabled="item.disabled"
                    :label="item.label"
                    :thumb="item.thumb"
                    :info="item.info"
                    :head-copy="item.headCopy"
                    :name="item.name"
                    :price="item.price"
                    :star="item.star"
                    :review-num="item.review"
                    :score="item.score"
                    :discount="item.discount"
                    :cost="item.cost"
                    @action-sheet="showActionSheet"
                >   
                </goods-list>
            </ul>
            <!-- action-popup -->
            <action-popup v-if="ActionSheet" @remove-dim="ActionSheet = !ActionSheet"></action-popup>
        </div>
    </div>
</template>

<script>
    module.exports = {
        components: {
            'goods-list': httpVueLoader('./GoodsList.vue'), 
            'action-popup' :  httpVueLoader('./ActionPop.vue'), 
        },
        props:[],
        data() {
            return {
                catActive:false,
                selectedNav:'전체',
                category:['그룹','그룹','그룹','그룹','그룹','그룹','그룹','그룹'],
                subList:['서브','서브','서브','서브','서브','서브','서브','서브'],
                sorting:'step-2',
                currentIdx:0,
                itemList:[],
                itemList2:[],
                cartModal:false,
                ActionSheet:false,
                subCatIndex:0
            }
        },
        created(){
            this.itemList = [
				{// 별점 + 리뷰 모두 존재 
					disabled : false,
                    label:'best',
					thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
					// thumb:'../common/images/tmp/tmp_food.jpg',
					info:'냉동', 
					headCopy: '맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
					name: '최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
					price: 4500,
					score : '4.7',   
					review:'99,999+', 
                    discount:'50',
                    cost:'2,250'
				},
				{// 리뷰 존재 
					disabled : false,
                    label:'best',
					thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
					// thumb:'../common/images/tmp/tmp_food.jpg',
					info:'냉장', 
					headCopy: '맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
					name: '최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
					price: 4500,
					review:'10', 
                    discount:'50',
                    cost:'2,250'
				},
				{// 별점 + 리뷰 모두 존재 
					disabled : false,
                    label:'best',
					thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
					// thumb:'../common/images/tmp/tmp_food.jpg',
					info:'냉동', 
					headCopy: '맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
					name: '최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
					price: 4500,
					score : '4.7',   
					review:'99,999+', 
                    discount:'50',
                    cost:'2,250'
				},
				{// 리뷰 존재 
					disabled : false,
                    label:'best',
					thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
					// thumb:'../common/images/tmp/tmp_food.jpg',
					info:'냉장', 
					headCopy: '맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
					name: '최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
					price: 4500,
					review:'10', 
                    discount:'50',
                    cost:'2,250'
				},
				{// 별점 + 리뷰 모두 존재 
					disabled : false,
                    label:'best',
					thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
					// thumb:'../common/images/tmp/tmp_food.jpg',
					info:'냉동', 
					headCopy: '맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
					name: '최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
					price: 4500,
					score : '4.7',   
					review:'99,999+', 
                    discount:'50',
                    cost:'2,250'
				},
				{// 리뷰 존재 
					disabled : false,
                    label:'best',
					thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
					// thumb:'../common/images/tmp/tmp_food.jpg',
					info:'냉장', 
					headCopy: '맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
					name: '최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
					price: 4500,
					review:'10', 
                    discount:'50',
                    cost:'2,250'
				},
            ],
            this.itemList2 = [
                {// 리뷰 존재 
                    disabled : false,
                    label:'best',
                    thumb:'https://img.glyde.co.kr/products/thnail/20220215/GM0021041901065-1-133224-158x158_EQL.webp',
                    // thumb:'../common/images/tmp/tmp_food.jpg',
                    info:'냉장', 
                    headCopy: '222맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식맛있는 음식 ',
                    name: '22최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄최대두줄',
                    price: 4500,
                    review:'10', 
                    discount:'50',
                    cost:'2,250'
                },
            ]
			
        },
        mounted(){
            new Swiper('.sub-nav', {
				slidesPerView: 'auto',
			});
        },
        methods: {
            catClikc(){
                this.catActive = !this.catActive;
            },
            changeNav(name,index){
                this.selectedNav = `${name}${index}`;
                this.subCatIndex = index;
                this.catClikc();
            },
            changeSubCat(index){
               this.currentIdx = index;
               console.log(this.currentIdx );
            },
            sortingView(step){
                step == 'step1' ? this.sorting = 'step-1' : this.sorting = 'step-2'
            },
            showActionSheet(){
                this.ActionSheet = true;
            }
        }
    };
</script>

<style scoped>
.category-container{height:100%;}
.category-wrap{position: relative; height:500px; overflow: auto;}
.category-wrap.hold{ overflow: hidden; }
.category-header{ position: sticky; top:0; z-index: 15; background: #fff;}
.category-header.fixed { box-shadow: -5px -11px 20px 4px #595959;}
.category-wrapper{display: flex; flex-wrap: wrap; padding:24px 16px; }
.category-wrapper.step-1{display: block;}
.category-wrapper.step-1 .category-list{ width: 100%;}
.category-nav{ width: 100%; text-align: center; height:50px; font-size: 16px; color:#000; }
.category-nav::after{ content: ""; display: inline-block; margin-left:8px; width: 24px; height: 24px; vertical-align: bottom; border-radius: 50%; background: url(../../common/images/Icon_Button_Arrow_down_24.svg) #eee no-repeat center bottom -1px / 24px; }
.category-nav.on::after{ background-image: url(../../common/images/Icon_Button_Arrow_up_24.svg); }
.category-nav-list{ position: absolute; padding:12px 16px; width:100%; height:0; text-align: left; visibility: hidden; overflow: hidden; background: #fff; z-index: 10; border:1px solid #eee; transition: all .3s ease-in-out; } 
.category-nav-list.on{ height:200px; visibility: visible; } 
.category-nav-list ul{ display: flex; flex-wrap: wrap; align-items: center; } 
.category-nav-list li{ padding:12px 8px 0; width:50%; font-size:16px; color:#333;} 
/*nav-slide*/
.sub-nav{ position: relative; padding:0 8px; background: #fff; border-bottom:1px solid #eee; transition: all ease-in; overflow: hidden; }
.sub-nav.on{ border-bottom: 1px solid #eee;}
.sub-nav .swiper-wrapper{ display: flex; }
.sub-list{ width: auto; flex-shrink: 0; font-size: 14px;}
.sub-list a{ display: block; padding:12px 10px; }
.sub-list.on a{ font-weight: 700; color:#000; border-bottom:2px solid #000;  }
.sub-list:last-child{ padding-right: 0; margin-right: 16px;}
/**sorting-wrap*/
.sorting-wrap{display: flex; flex-direction: row-reverse; align-items: center; height: 40px; border-bottom: 1px solid #eee;}
.sorting-wrap .btn-sorting{ font-size: 0; width: 32px; height: 40px; background: url(../../common/images/icon/ico-sorting-step-1.png) no-repeat center / 20px;}
.sorting-wrap .btn-sorting.step2{ background-image: url(../../common/images/icon/ico-sorting-step-2.png);}
</style>


