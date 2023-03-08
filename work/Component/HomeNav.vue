<template>
    <div class="nav-wrap">
        <nav>
            <ul class="main-menu-lst" :class="{'on' : navToggle}">
                <li v-for="(menu,index) in menuList" :key="index" :class="{'plus' : menu.name == '더보기'}">
                    <a :href="menu.href" @click.prevent="toggleNavCategory(index)">
                        <div class="menu-ico" :class="{'plus' : menu.name == '더보기'}">
                            <img :src="menu.iconSrc" alt="">
                        </div>
                        <span class="menu-tit" v-html="menu.name"></span> 
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    module.exports = {
        components: {
            
        },
        data() {
            return {
                 menuList:[],
                 navToggle:false,
            }
        },
        created(){
            this.menuList = [
                {
                    name:'카테고리1',
                    iconSrc:'../common/images/icon/ico-food-1.png',
                    href:'',
                },
                {
                    name:'카테고리2',
                    iconSrc:'../common/images/icon/ico-food-2.png',
                    href:'',
                },
                {
                    name:'카테고리3',
                    iconSrc:'../common/images/icon/ico-food-3.png',
                    href:'',
                },
                {
                    name:'카테고리4',
                    iconSrc:'../common/images/icon/ico-food-4.png',
                    href:'',
                },
                {
                    name:'카테고리5',
                    iconSrc:'../common/images/icon/ico-food-5.png',
                    href:'',
                },
                {
                    name:'카테고리6',
                    iconSrc:'../common/images/icon/ico-food-6.png',
                    href:'',
                },
                {
                    name:'카테고리7', 
                    iconSrc:'../common/images/icon/ico-food-7.png',
                    href:'',
                },
                {
                    name:'카테고리8', 
                    iconSrc:'../common/images/icon/ico-food-8.png',
                    href:'',
                },
                {
                    name:'카테고리9',
                    iconSrc:'../common/images/icon/ico-food-9.png',
                    href:'',
                },
                {
                    name:'더보기',
                    iconSrc:'../common/images/Icon_Button_Plus_24_normal.svg',
                    href:'',
                },
                {
                    name:'카테고리1',
                    iconSrc:'../common/images/icon/ico-food-1.png',
                    href:'',
                },
                {
                    name:'카테고리2', 
                    iconSrc:'../common/images/icon/ico-food-2.png',
                    href:'',
                },
                {
                    name:'카테고리3',
                    iconSrc:'../common/images/icon/ico-food-3.png',
                    href:'',
                },
                {
                    name:'카테고리4',
                    iconSrc:'../common/images/icon/ico-food-4.png',
                    href:'',
                },
                {
                    name:'카테고리5',
                    iconSrc:'../common/images/icon/ico-food-5.png',
                    href:'',
                },
                {
                    name:'카테고리6',
                    iconSrc:'../common/images/icon/ico-food-6.png',
                    href:'',
                },
            ]
        },
        methods: {
            toggleNavCategory(index){
                if(index === 9){
                    this.navToggle = true;
                    document.querySelector('.plus').style.display = 'none';
                }
            }
        }
    };
</script>
<style scoped>
/*main-menu-list*/
.main-menu-lst {display: flex; flex-wrap: wrap; padding: 30px 12px;  min-width: 360px; height:230px; overflow: hidden; transition: height .25s ease-in; }
.main-menu-lst.on { height: 400px;}
.main-menu-lst li { width: 20%; padding-bottom:14px; text-align: center; }
.main-menu-lst li a {display: block; color: #000; font-size: 13px; }
.main-menu-lst li img {width: 60px; height: 60px; }
.main-menu-lst .menu-ico.plus { margin:0 auto; width: 60px; height: 60px; border:1px solid #ccc; border-radius: 50%;}
.main-menu-lst .plus img { margin: 10px auto; width: 40px; height: 40px;}
.main-menu-lst .menu-tit { display: block; padding-top: 8px; }
</style>


