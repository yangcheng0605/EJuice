<template>
  <div class="home">
    <div class="banner1">
      <div class="Desktop_swiper">
        <div class="homeSwiper">
          <div class="swiper_box" v-if="bannerList && bannerList.length>0">
            <swiper
              :navigation="true"
              @swiper="onSwiper"
              :effect="'fade'"
              :autoplay="{
                delay: 8000,
                disableOnInteraction: false,
              }"
              :loop="true"
              :modules="modules"
            >
              <swiper-slide v-for="(item) in bannerList" :key="item.id">
                <div class="home_banner">
                  <img :src="isMobile?item.pSPath:item.pPath" alt="">
                </div>
              </swiper-slide>
            </swiper>
            <div class="home_sildePre" @click="sildePre(1)">
            </div>
            <div class="home_sildeNext" @click="sildeNext(1)">
            </div>
          </div>
          <div class="spin" v-else>
            <a-spin :indicator="indicator" size="large" />
          </div>
        </div>
        <div class="home_block home_company">
          <div class="home_tag"><img src="@/assets/img/home/tag.png" alt=""></div>
          <div class="home_c_top">
            <p class="title AntonFont wow animate__fadeInLeft" data-wow-offset="50">WHY EHONOS</p>
          </div>
          <div class="home_c_contain wow animate__fadeInLeft" data-wow-offset="50">
            <div class="pc_web" v-if="!isMobile">
              <div class="contain_left" :style="`background: url('${companysImg[currentCompany-1]}') no-repeat 100%/cover;`">
              </div>
              <div class="contain_right">
                <div :class="['contain_list', currentCompany==item.id?'active':'']" v-for="item in companys" :key="item.id" @mouseenter="chooseCompany(item)">
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="contain_top">
                <div :class="['contain_list', currentCompany==item.id?'active':'']" v-for="item in companys" :key="item.id" @mouseenter="chooseCompany(item)" :style="`background: rgba(17, 17, 17, 1) url('${currentCompany==item.id?require(`@/assets/img/home/mbnav_in_${currentCompany}.png`):require(`@/assets/img/home/mbnav_out_${currentCompany}.png`)}') no-repeat 100%/cover;`">
                  <p>{{ item.name }}</p>
                </div>
              </div>
              <div class="contain_bottom" >
                <img :src="companysImg_mb[currentCompany-1].img" alt="" :style="`height: ${companysImg_mb[currentCompany-1].height}rem`">
              </div>
            </div>
          </div>
        </div>
        <div class="home_block home_center">
          <div class="homt_pros">
            <p class="title AntonFont wow animate__fadeInLeft" data-wow-offset="50">Our Recommendations</p>
             <div class="home_tab wow animate__fadeInLeft" data-wow-offset="50">
              <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                <a-tab-pane :tab="item.cateName" v-for="item in mpType" :key='item.cateId'></a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <div class="swiper_box wow animate__slideInUp" data-wow-offset="50">
            <swiper
              :slides-per-view="perView"
              :space-between="between"
              :navigation="true"
              @swiper="onSwiper2"
            >
              <swiper-slide v-for="(item) in proList" :key="item.proId">
                <div class="hoverBox proImg" @click="linkTo(item)">
                  <img class="hoverImg" :src="item.cover" alt="">
                </div>
              </swiper-slide>
            </swiper>
            <div class="home_sildePre" @click="sildePre(2)">
            </div>
            <div class="home_sildeNext" @click="sildeNext(2)">
            </div>
          </div>
        </div>
        <!-- <div class="home_block home_bottom">
          <div class="home_b_top">
            <p class="title AntonFont wow animate__fadeInLeft" data-wow-offset="50">EHONOS Live</p>
            <div class="wow animate__fadeInRight" data-wow-offset="50"><img src="@/assets/img/live.png" alt=""></div>
          </div>
          <div class="home_imgs">
            <div class="home_imgs_left">
              <div class="imgs_lr">
                <div class="home_img_s hoverBox wow animate__fadeInTopLeft" data-wow-offset="50">
                  <a href="/#/contact">
                    <div class="shade"></div>
                    <img class="hoverImg" src="@/assets/img/home/live_1.png" alt="">
                    <p class="img_text AntonFont">CONTACT US</p>
                  </a>
                </div>
                <div class="home_img_r hoverBox wow animate__fadeInTopRight" data-wow-offset="50">
                  <div class="shade"></div>
                  <img class="hoverImg" src="@/assets/img/home/live_2.png" alt="">
                  <p class="img_text AntonFont">HOLA</p>
                </div>
              </div>
              <div class="imgs_rl">
                <div class="home_img_r hoverBox wow animate__fadeInBottomLeft " data-wow-offset="50">
                  <div class="shade"></div>
                  <img class="hoverImg" src="@/assets/img/home/live_3.png" alt="">
                  <p class="img_text AntonFont">TAKE EASY</p>
                </div>
                <div class="home_img_s hoverBox wow animate__fadeInBottomRight" data-wow-offset="50">
                  <div class="shade"></div>
                  <img class="hoverImg" src="@/assets/img/home/live_4.png" alt="">
                  <p class="img_text AntonFont">RELAX</p>
                </div>
              </div>
            </div>
            <div class="home_imgs_right hoverBox wow animate__bounceInRight"  data-wow-offset="50" data-wow-delay='.2s'>
                <div class="shade"></div>
                <img class="hoverImg" src="@/assets/img/home/live_5.png" alt="">
                <p class="img_text AntonFont">Cultural
transmission</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs, h } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import Storage from '@/utils/storage';
import 'swiper/css/navigation';
import 'swiper/css';
import { useRouter } from 'vue-router';

  export default {
    name: "home",
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const router = useRouter()
      const { proxy } = getCurrentInstance();
      const indicator = h(LoadingOutlined, {
        style: {
          fontSize: '24px',
        },
        spin: true,
      });
      const state = reactive({
        modules: [Autoplay, EffectFade, Navigation],
        activeKey: 1,
        perView: 4,
        between: 40,
        swiper1: null,
        swiper2: null,
        isMobile: false,
        bannerList: null,
        currentCompany: 1,
        companys:[
          { id: 1, name: 'Brand Philosophy'},
          { id: 2, name: 'KEYWORD'},
          { id: 3, name: 'ABOUT EHONOS VAPE'},
          { id: 4, name: 'Company story'},
        ],
        companysImg:[
          require('@/assets/img/home/companyInfo_1.webp'),
          require('@/assets/img/home/companyInfo_2.webp'),
          require('@/assets/img/home/companyInfo_3.webp'),
          require('@/assets/img/home/companyInfo_4.webp'),
        ],
        companysImg_mb:[
          { id: 1, img: require('@/assets/img/home/companyInfo_mb_1.webp'), height:'31.5'},
          { id: 2, img: require('@/assets/img/home/companyInfo_mb_2.webp'), height:'61.25'},
          { id: 3, img: require('@/assets/img/home/companyInfo_mb_3.webp'), height:'28'},
          { id: 4, img: require('@/assets/img/home/companyInfo_mb_4.webp'), height:'46.75'},
        ],
        mpType:[
          { cateId: 1, cateName: 'Our Recommendations'},
          { cateId: 2, cateName: 'New'},
          { cateId: 3, cateName: 'Disposable'},
          { cateId: 4, cateName: 'Pod Series'},
          { cateId: 5, cateName: 'E-liquid'},
        ],
        proList: null,
        indicator: indicator,
      })
      onMounted(async () => { 
        getPicList()
        // if (!Storage.getItem('navList')) {
        //   getCategoryList()
        // } else {
          // state.mpType = Storage.getItem('navList')
          // state.activeKey = state.mpType[0].cateId
          getProductListByCate(state.activeKey)
        // }
        nextTick(() => {
           var wow = new proxy.$wow.WOW({boxClass: "wow",
               animateClass: "animated", 
               offset: 0, 
               mobile: true,
               live: true,
               callback: function () {
               },
               scrollContainer: null,
               resetAnimation: true,
             }
           )
           wow.init()
        })
        handleResize();
        window.addEventListener('resize', handleResize);
      })
     
      const getPicList = () => {
        proxy.$api.picList('').then(res=>{
          state.bannerList = res
        })
      };
      // const getCategoryList = () => {
      //   proxy.$api.categoryList('').then(res=>{
      //     state.mpType = res
      //     state.activeKey = res[0].cateId
      //     getProductListByCate(res[0].cateId)
      //     Storage.setItem('navList', res)
      //   })
      // };
      const getProductListByCate = (id) => {
        proxy.$api.productListByCate(id).then(res=>{
          state.proList = res
        })
      };
      const chooseCompany = (res) => {
        state.currentCompany = res.id
      };
      const changeTab = (res) => {
         getProductListByCate(res)
      };
      const handleResize = () => {
        const windowWidth = window.innerWidth;
       if (windowWidth < 750) {
         state.between = 15
         state.perView = 'auto'
         state.isMobile = true
        } else {
          state.between = 40
          state.perView = 4
          state.isMobile = false
        }
      };
      const onSwiper = (swiper) => {
        state.swiper1 = swiper
      };
      const onSwiper2 = (swiper) => {
        state.swiper2 = swiper
      };
      const linkTo = (res) => {
        router.push('/productsDetail?id=' + res.proId);
      };
      const sildePre = (e) => {
        state[`swiper${e}`].slidePrev(500, res=>{
        })
      };
      const sildeNext = (e) => {
        state[`swiper${e}`].slideNext(500, res=>{
        })
      };
      const contact = () => {
        console.log(1111)
      };
      return {
        ...toRefs(state),
        onSwiper,
        onSwiper2,
        linkTo,
        chooseCompany,
        sildePre,
        sildeNext,
        changeTab,
        contact,
      };
    },
  };
</script>
<style lang="less" >
.home{
  .home_block{
    .home_tag{
      width: 12.5rem;
      position: absolute;
      right: 7.5rem;
      top: -6.25rem;
      z-index: 10;
      animation: home_rotate 10s linear infinite ;
    }
    .homt_pros{
      .title{
        line-height: 2.5rem;
      }
      .home_tab{
        margin: .812rem 0 3.75rem;
        .ant-tabs-nav{
          margin: 0;
          &::before{
            border: none;
          }
        }
        .ant-tabs-nav-wrap{
          padding: 0;
        }
        .ant-tabs-tab{
          padding: 9px 0;
          font-weight: 500;
          color: #111 !important;
          font-size: 1rem;
          .ant-tabs-tab-btn{
            letter-spacing: 0;
          }
          .ant-tabs-tab-btn:hover,
          .ant-tabs-tab-btn:focus{
            color: #111;
          }
        }
        .ant-tabs-tab-active .ant-tabs-tab-btn{
          color: #111 !important;
          text-shadow: none;
        }
        .ant-tabs-ink-bar{
          background: #111 !important;
        }
      }
    }
  }
  
  .swiper_box{
    position: relative;
    .home_sildePre, .home_sildeNext {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      z-index: 2;
      cursor: pointer;
    }
    .home_sildePre{
      background: url('../../assets/img/arrow_white_l.png') no-repeat 100%/contain;
    }
    .home_sildeNext{
      background: url('../../assets/img/arrow_white_r.png') no-repeat 100%/contain;
    }
  }
  .homeSwiper{
    .spin{
      width: 100%;
      height: 100vh;
      text-align: center;
      line-height: 100vh;
      .anticon-loading {
        font-size: 80px !important;
      }
    }
    .swiper_box {
      .home_sildePre, .home_sildeNext {
        bottom: 3.75rem;
      }
      .home_sildePre{
        left: 7.5rem;
      }
      .home_sildeNext{
        left: 12.5rem;
      }
      .home_sildePre:hover{
        background: url('../../assets/img/arrow_yellow_l.png') no-repeat 100%/contain;
      }
      .home_sildeNext:hover{
        background: url('../../assets/img/arrow_yellow_r.png') no-repeat 100%/contain;
      }
    }
  }
  .home_company{
    background: rgba(245, 184, 26, .08) url('../../assets/img/home/bg_img.png') no-repeat 100% / cover;
    position: relative;
    padding: 6.25rem 15rem 7.5rem;
    .home_c_top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3.75rem;
      .title{
        line-height: 2.5rem;
      }
    }
    .home_c_contain{
      .pc_web{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .contain_left{
        width: 100%;
        height: 37.5rem;
        border-radius: .5rem;
        transition: .5s;
        &:hover{
          border-radius: 1.5625rem;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      .contain_right{
        border-radius: .5rem;
        width: 20.625rem;
        flex-shrink: 0;
        margin-left: 2.5rem;
        background: #111;
        color: #fff;
        .contain_list{
          height: 9.375rem;
          padding: 0 2.5rem;
          font-size: 1.5rem;
          line-height: 9.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: .5s;
          background:  rgba(17, 17, 17,  0.04) url('../../assets/img/home/company_nav_out.png') no-repeat 100% / cover;
          &.active{
            opacity: 1;
            background: rgba(17, 17, 17,  0.04) url('../../assets/img/home/company_nav_in.png') no-repeat 100% / cover;
          }
        }
      }
    }
  }
  .title{
    color: #111;
    font-size: 2.5rem;
  }
  .home_center{
    background: #F5B81A url('../../assets/img/home/yellow_bg.png') no-repeat 100% / cover;
    position: relative;
    padding: 6.25rem 15rem 6.75rem;
    .proImg{
      height: 27.5rem;
      border-radius: 8px;
      background: url('../../assets/img/product/bg_r.png') no-repeat 100% / cover;
      img{
        height: 100%;
        object-fit: cover;
      }
    }
    .swiper_box {
      .swiper{
        padding-right: 2.5rem;
      }
      .home_sildePre, .home_sildeNext {
        top: 50%;
      }
      .home_sildePre{
        left: -5rem;
      }
      .home_sildeNext{
        right: -5rem;
      }
    }
    .home_sildePre{
      background: url('../../assets/img/arrow_l.png') no-repeat 100%/contain;
    }
    .home_sildeNext{
      background: url('../../assets/img/arrow_r.png') no-repeat 100%/contain;
    }
  }
  .home_bottom{
    background: #FEF8E8;
    padding: 6.25rem 15rem 7.5rem;
    .home_b_top{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3.75rem;
      .title{
        line-height: 2.5rem;
      }
      img{
        width: 8.375rem;
      }
    }
    .home_imgs{
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 2rem;
      .home_imgs_left{
        height: 37.5rem;
        position: relative;
      }
      .home_imgs_right{
        border-radius: 8px;
        width: 25rem;
        height: 37.5rem;
        margin-left: 2.5rem;
        flex-shrink: 0;
        position: relative;
      }
      .shade{
        background: linear-gradient(225deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all .5s;
        z-index: 10;
      }
    }
    .imgs_lr,.imgs_rl{
      display: flex;
      position: relative;
      img{
        height: 17.5rem;
      }
      .home_img_s,.home_img_r{
        border-radius: 8px;
      }
    }
    .hoverBox {
      position: relative;
      .img_text {
        position: absolute;
        left: 1.875rem;
        bottom: 1.5rem;
        line-height: 2.5rem;
        z-index: 12;
      }
    }
    .imgs_lr{
      margin-bottom: 2.5rem;
      .home_img_s{
        margin-right: 2.5rem;
      }
    }
    .imgs_rl{
      .home_img_r{
        margin-right: 2.5rem;
      }
    }
  }
  @keyframes home_rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>