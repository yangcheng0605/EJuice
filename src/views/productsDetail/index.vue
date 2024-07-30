<template>
  <div class="products productsDetail">
    <div class="pro_banner" >
      <img :src="isMobile && proData?proData.proSPath:proData.proPath" alt="">
    </div>
    <div>
      <div class="pd-compare-container">
        <div class="left-col" id="setion-3-img-1" >
          <img src="@/assets/img/pro_1.png" alt="">
        </div>
        <div class="right-col" id="setion-3-img-2">
          <img src="@/assets/img/pro_2.png" alt="">
        </div>
      </div>
    </div>
    <div class="product_content">
      <div class="flavors-content">
        <div class="col-left">
          <div class="container">
            <div class="currentNum">{{currentPro && currentPro.index}}/{{ productImgs.length || 0 }}</div>
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
            <div class="item-group" v-for="item in productImgs" :key="item.id">
              <div :class="['item-list', (currentPro&&currentPro.id)===item2.id?'focus':'']" :data-index="item2.id" v-for="(item2, index) in item.data" :key="item2.id" @click="choosePro(item2, index)">
                  <img :src="item2.url" alt="" class="flavor-pd">
                  <img src="https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/shadow.png" alt="" srcset="" class="flavor-hover">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="proImg" v-for="(item, index) in imageUrls" :key='index'>
      <img :src="item" alt="">
    </div>
    <!-- <div class="other_pro" v-if="proList && proList.length>0">
      <p class="title AntonFont wow animate__fadeInUp" data-wow-offset="50">Other Product Recommendations</p>
      <div class="swiper_box wow animate__fadeInUp" data-wow-offset="50">
        <swiper
          :slides-per-view="perView"
          :space-between="between"
          :navigation="true"
          :modules="modules" 
          @swiper="onSwiper"
        >
          <swiper-slide v-for="(item) in proList" :key="item.proId">
            <div class="products_list" @click="linkTo(item)">
              <div class="hoverBox proImg">
                <img class="hoverImg" :src="item.cover" alt="">
              </div>
              <div class="p_text">
                <p class="p_name">{{item.proName}}</p>
                <p class="p_learn smallArrow_box">
                  <span>Learn more</span><img class="smallArrow" src="@/assets/img/arrow_white_r_small.png" alt="">
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="custom_sildePre" @click="sildePre">
        </div>
        <div class="custom_sildeNext" @click="sildeNext">
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, nextTick, reactive, toRefs, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import 'swiper/css/navigation';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger);
  export default {
    components:{
      Swiper,
      SwiperSlide
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const header = ref();
      const { proxy } = getCurrentInstance();
      const state = reactive({
        id: '',
        perView: 2,
        between: 30,
        modules: [Navigation],
        swiper: null,
        imageUrls: null,
        proList: [],
        proData: {proSPath:null, proPath:null},
        isMobile: false,
        currentPro: null,
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
      })

      onMounted(async () => { 
        handleResize();
        window.addEventListener('resize', handleResize);
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
          ScrollTrigger.create({
            trigger: '.pd-compare-container',
            start: '-50px top',
            end: '400px',
            scrub: true,
            pin: true,
            animation: gsap.timeline()
              .to('.pd-compare-container', { marginTop: '3.75rem' },'<')
              .to('.left-col', { right: '0%' },'<')
              .to('.right-col', { left: '0%' },'<')
          });
          state.currentPro = state.productImgs[0].data[0]
        })
      })
      const getProductList = (id) => {
        proxy.$api.productList(id).then(res=>{
          state.proData = res
          state.imageUrls = res.imageUrls && res.imageUrls.split(',')
          getProductListByCate(1)
        })
      };
      const getProductListByCate = (id) => {
        proxy.$api.productListByCate(id).then(res=>{
          state.proList = res
        })
      };
      const handleResize = () => {
        const windowWidth = window.innerWidth;
       if (windowWidth < 750) {
         state.between = 15
         state.perView = 'auto'
         state.isMobile = true
        } else {
          state.between = 30
          state.perView = 5
          state.isMobile = false
        }
      };
      const choosePro = (res, index) => {
        state.currentPro = res
        state.currentPro['index'] = index
      };
      const onSwiper = (swiper) => {
        state.swiper = swiper
      };
      const linkTo = (res) => {
        router.push('/productsDetail?id=' + res.proId);
      };
      const sildePre = () => {
        state.swiper.slidePrev(500, res=>{
        })
      };
      const sildeNext = () => {
        state.swiper.slideNext(500, res=>{
        })
      };
      watch(route, (e) => {
        const query = e.query
        if (query.id)  {
          state.id = parseInt(query.id) || null;
          getProductList(query.id)
        }
      }, { immediate: true })
      return {
        ...toRefs(state),
        onSwiper,
        linkTo,
        choosePro,
        sildePre,
        sildeNext,
      };
    },
  };
</script>
<style lang="less">
.productsDetail{
  .pro_banner{
    height: 50rem;
    img{
      height: 100%;
    }
  }
  .proImg{
    margin-bottom: .9rem;
  }
  .product_content{
    padding: 5rem 7.5rem;
  }
  .other_pro{
    padding: 6.25rem 15rem;
    background: linear-gradient( 180deg, #111111 0%, #333333 100%);
    .proImg{
      height: 16.5rem;
      img{
        height: 100%;
      }
    }
    .title{
      text-align: center;
      font-size: 3rem;
      line-height: 3rem;
      color: #fff;
      margin-bottom: 3.75rem;
    }
  }
  .swiper_box{
    position: relative;
    .custom_sildePre,.custom_sildeNext {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      top: 34%;
      cursor: pointer;
    }
    .custom_sildePre{
      left: -5rem;
      background: url('../../assets/img/arrow_white_l.png') no-repeat 100%/contain;
    }
    .custom_sildeNext{
      right: -5rem;
      background: url('../../assets/img/arrow_white_r.png') no-repeat 100%/contain;
    }
    .custom_sildePre:hover{
      background: url('../../assets/img/arrow_yellow_l.png') no-repeat 100%/contain;
    }
    .custom_sildeNext:hover{
      background: url('../../assets/img/arrow_yellow_r.png') no-repeat 100%/contain;
    }
  }
}
.pd-compare-container{
  display: flex;
  justify-content: center;
  height: 56.25rem !important;
  img {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  .left-col {
    position: relative;
    right: -25%;
    z-index: 10;
  }
  .right-col {
    position: relative;
    left: -25%;
  }
  .mid-col {
    margin: 0;
    opacity: 0;
  }
  #setion-3-img-1, #setion-3-img-2{
    width: 50%;
  }
}
</style>