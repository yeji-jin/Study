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
                    name:'추천 상품',
                    iconSrc:'../common/images/icon-home-recommend.svg',
                    href:'',
                },
                {
                    name:'기획전',
                    iconSrc:'../common/images/icon-home-featured.svg',
                    href:'',
                },
                {
                    name:'새벽배송',
                    iconSrc:'../common/images/icon-home-dawn.svg',
                    href:'',
                },
                {
                    name:'건강식품',
                    iconSrc:'../common/images/icon-home-health.webp',
                    href:'',
                },
                {
                    name:'국&middot탕&middot찌개',
                    iconSrc:'../common/images/icon-home-stew.webp',
                    href:'',
                },
                {
                    name:'냉동간편식',
                    iconSrc:'../common/images/icon-home-frozen.webp',
                    href:'',
                },
                {
                    name:'베이커리', 
                    iconSrc:'../common/images/icon-home-bakery.webp',
                    href:'',
                },
                {
                    name:'정육&middot수산', 
                    iconSrc:'../common/images/icon-home-meat.webp',
                    href:'',
                },
                {
                    name:'밥',
                    iconSrc:'../common/images/icon-home-rice.webp',
                    href:'',
                },
                {
                    name:'더보기',
                    iconSrc:'../common/images/Icon_Button_Plus_24_normal.svg',
                    href:'',
                },
                {
                    name:'김치/반찬',
                    iconSrc:'../common/images/icon-home-sidedish.webp',
                    href:'',
                },
                {
                    name:'간식&middot음료', 
                    iconSrc:'../common/images/icon-home-juice.webp',
                    href:'',
                },
                {
                    name:'면&middot분식',
                    iconSrc:'../common/images/icon-home-snack.webp',
                    href:'',
                },
                {
                    name:'죽&middot덮밥소스',
                    iconSrc:'../common/images/icon-home-soup.webp',
                    href:'',
                },
                {
                    name:'밀키트',
                    iconSrc:'../common/images/icon-home-mealkit.webp',
                    href:'',
                },
                {
                    name:'과일&middot채소',
                    iconSrc:'../common/images/icon-home-green.webp',
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
.main-menu-lst {display: flex; flex-wrap: wrap; min-width: 360px; height:186px; overflow: hidden; transition: height .25s ease-in; }
.main-menu-lst.on { height: 282px;}
.main-menu-lst li { width: 20%; padding-bottom:14px; text-align: center; }
.main-menu-lst li a {display: block; color: #000; font-size: 13px; }
.main-menu-lst li img {width: 60px; height: 60px; }
.main-menu-lst .menu-ico.plus { margin:10px auto; width: 40px; height: 40px; border:1px solid #eee; border-radius: 50%;}
.main-menu-lst .plus img { margin: 8px auto; width: 24px; height: 24px;}
</style>


