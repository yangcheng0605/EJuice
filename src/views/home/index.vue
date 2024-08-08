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
              :pagination="pagination"
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
        <div class="home_product">
          <div class="flavors-content">
            <div class="col-left">
              <div class="container">
                <div class="currentNum">
                  <span>{{currentPro && currentPro.index}}/{{ productImgs.length || 0 }}</span>
                </div>
                <img class="proImg" :src="proInfo.img" alt="">
                <div class="pro_info">
                  <div class="info_top">
                    <h3>{{ proInfo.title }}</h3>
                    <div class="proBuy">
                      <div class="rateList">
                        <div class="rate_box">
                          <div class="gutter-row">
                            <span>FRAGRANCE</span><a-rate v-model:value="proInfo.fragrance" >
                              <template #character="{ index }">
                                <span class="rateCircle"
                                  :style="{ 
                                    background: index+1 <= proInfo.fragrance ? '#999' : 'transparent' 
                                  }"
                                ></span>
                              </template>
                            </a-rate>
                          </div>
                          <div class="gutter-row">
                            <span>SWEETNESS</span><a-rate v-model:value="proInfo.sweetness" >
                              <template #character="{ index }">
                                <span class="rateCircle"
                                  :style="{ 
                                    background: index+1 <= proInfo.sweetness ? '#999' : 'transparent' 
                                  }"
                                ></span>
                              </template>
                            </a-rate>
                          </div>
                          <div class="gutter-row">
                            <span>COOLNESS</span><a-rate v-model:value="proInfo.coolness" >
                              <template #character="{ index }">
                                <span class="rateCircle"
                                  :style="{ 
                                    background: index+1 <= proInfo.coolness ? '#999' : 'transparent' 
                                  }"
                                ></span>
                              </template>
                            </a-rate>
                          </div>
                          <div class="gutter-row">
                            <span>THROAT HIT</span><a-rate v-model:value="proInfo.throatHit" >
                              <template #character="{ index }">
                                <span class="rateCircle"
                                  :style="{ 
                                    background: index+1 <= proInfo.throatHit ? '#999' : 'transparent' 
                                  }"
                                ></span>
                              </template>
                            </a-rate>
                          </div>
                        </div>
                      </div>
                      <a-button class="buyNow" shape="round"  @click="buyNow(proInfo)">Buy Now</a-button>
                    </div>
                  </div>
                  <div class="info_bottom">
                    {{ proInfo.info }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-right">
              <div class="changebtns clearfix">
                <!-- <div class="item-group" v-for="item in productImgs" :key="item.id"> -->
                <div class="item-group">
                  <div :class="['item-list', (currentPro&&currentPro.id)===item.id?'focus':'']" :data-index="index" v-for="(item, index) in productImgs" :key="item.id" @click="choosePro(item, index)">
                      <img :src="item.url" alt="" class="flavor-pd">
                      <img src="https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/shadow.png" alt="" srcset="" class="flavor-hover">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="home_block home_company">
          <div class="home_c_contain wow animate__fadeInLeft" data-wow-offset="50">
            <div class="contain_left" :style="`background: url('${companysImg[0]}') no-repeat 100%/cover;`" v-if="!isMobile">
            </div>
            <div v-else class="contain_bottom" >
              <img :src="companysImg_mb[0].img" alt="" :style="`height: ${companysImg_mb[0].height}rem`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs, h } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import Storage from '@/utils/storage';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
      modules: [Autoplay, EffectFade, Pagination, Navigation],
      pagination: {
        clickable: true,
       
      },
      activeKey: 1,
      perView: 4,
      between: 40,
      swiper1: null,
      isMobile: false,
      bannerList: null,
      currentPro: null,
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
      productImgs:[
        {id: 0, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-1.png'},
        {id: 1, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-5.png'},
        {id: 2, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-9.png'},
        {id: 3, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-13.png'},
        {id: 4, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-21.png'},
        {id: 5, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-26.png'},
        {id: 6, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-2.png'},
        {id: 7, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-6.png'},
        {id: 8, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-10.png'},
        {id: 9, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-14.png'},
        {id: 10, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-22.png'},
        {id: 11, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-27.png'},
        {id: 12, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-3.png'},
        {id: 13, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-7.png'},
        {id: 14, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-11.png'},
        {id: 15, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-15.png'},
        {id: 16, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-23.png'},
        {id: 17, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-28.png'},
        {id: 18, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-4.png'},
        {id: 19, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-8.png'},
        {id: 20, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-12.png'},
        {id: 21, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-16.png'},
        {id: 22, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-24.png'},
        {id: 23, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-29.png'},
        {id: 24, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-17.png'},
        {id: 25, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-18.png'},
        {id: 26, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-19.png'},
        {id: 27, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-20.png'},
        {id: 28, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-25.png'},
        {id: 29, url: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/pd-30.png'}
      ],
      proInfo: {
        id: 1,
        title: 'Products Name - 1',
        fragrance: 5,
        sweetness: 3,
        coolness: 3,
        throatHit: 2,
        img: require('@/assets/img/pro_1.png'),
        info: 'Shenzhen XingfanTechnology., Ltd.(EHONOS VAPE) is an innovative company dedicated to providing high-quality electronic cigarette products and comprehensive customer service.Since its establishment, Ehonos has been committed to integrating design, research and development, manufacturing, sales, marketing, and brand management. adevelopment, manufacturing, sales, marketing, and brand management.'
      },
      proList: null,
      indicator: indicator,
    })
    onMounted(async () => { 
      getPicList()
      getIndexCard()
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
      state.currentPro = state.productImgs[0]
      state.currentPro['index'] = 1
    })
    const getPicList = () => {
      proxy.$api.getPicList().then(res=>{
        state.bannerList = res
      })
    };
    const getIndexCard = () => {
      proxy.$api.getIndexCard().then(res=>{
        // state.productImgs = res
      })
    };
    const buyNow = (res) => {
    };
    const choosePro = (res,index) => {
      state.currentPro = res
      state.currentPro['index'] = index + 1
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
    };
    return {
      ...toRefs(state),
      onSwiper,
      buyNow,
      linkTo,
      choosePro,
      sildePre,
      sildeNext,
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
      .swiper-slide{
        height: 50rem;
      }
      .swiper-pagination{
        position: absolute;
        width: auto;
        left: 7.5rem;
        bottom: 4.875rem;
        .swiper-pagination-bullet{
          width: 1.25rem;
          height: 0.25rem;
          background: rgba(255,255,255,0.5);
          border-radius: 0.3125rem;
          transition: all .3s;
          &.swiper-pagination-bullet-active{
            width: 3.75rem;
            background: #FFFFFF;
          }
        }
      }
      .home_sildePre, .home_sildeNext {
        bottom: 3.75rem;
      }
      .home_sildePre{
        right: 12.5rem;
      }
      .home_sildeNext{
        right: 7.5rem;
      }
      .home_sildePre:hover{
        background: url('../../assets/img/arrow_yellow_l.png') no-repeat 100%/contain;
      }
      .home_sildeNext:hover{
        background: url('../../assets/img/arrow_yellow_r.png') no-repeat 100%/contain;
      }
    }
  }
  .home_product{
    padding: 5rem 7.5rem;
  }
  .home_company{
    position: relative;
    padding: 7.5rem;
    .home_c_contain{
      .pc_web{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .contain_left{
        width: 100%;
        height: 43.75rem;
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
    }
  }
  .title{
    color: #111;
    font-size: 2.5rem;
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