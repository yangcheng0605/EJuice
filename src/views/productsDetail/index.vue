<template>
  <div class="products productsDetail">
    <div class="proImg pro_banner" >
      <img :src="isMobile && proData?proData.proSPath:proData.proPath" alt="">
    </div>
    <div class="proImg" v-for="(item, index) in imageUrls" :key='index'>
      <img :src="item" alt="">
    </div>
    <div class="other_pro" v-if="proList && proList.length>0">
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
                <!-- <p class="p_hint">{{item.proDesc}}</p> -->
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
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, nextTick, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

  export default {
    components:{
      Swiper,
      SwiperSlide
    },
    setup() {
      const route = useRoute()
      const router = useRouter()
      const { proxy } = getCurrentInstance();
      const state = reactive({
        id: '',
        perView: 2,
        between: 30,
        modules: [Navigation],
        swiper: null,
        imageUrls: null,
        isMobile: false,
        proList: [],
        proData: {proSPath:null, proPath:null}
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
</style>