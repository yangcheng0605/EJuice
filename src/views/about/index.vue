<template>
  <div class="about">
    <div class="top_banner">
      <img src="@/assets/img/about/about_banner.webp" alt="">
      <div class="t_box">
        <p class="title AntonFont about_title">WHY EHONOS</p>
      </div>
    </div> 
    <div :class="['a_content', index % 2 ===0 ? 'bg_dark':'bg_light']" v-for="(item, index) in isMobile?companyInfo_mb:companyInfo" :key="item.id" @click="console.log('')">
      <img :src="item.img" alt="">
      </div>
    <!-- <div class="a_content">
      <div class="a_top_box">
        <div class="a_c_left wow animate__fadeInLeft" data-wow-offset="50">
          <video autoplay="autoplay" loop muted="muted" controls="controls"  poster="@/assets/img/video.jpg">
            <source src="../../assets/video.mp4" srcset="@/assets/img/video.jpg" type="video/mp4">
            您的浏览器不支持视频标签。
          </video>
        </div>
        <div class="a_c_right wow animate__fadeInRight" data-wow-offset="50">
          <div class="a_text_top">
            <p class="title AntonFont">WHO WE ARE</p>
            <img src="@/assets/img/about/www.png" alt="">
          </div>
          <div class="a_text_bottom">
            <p>
              Shenzhen XingfanTechnology., Ltd.(EHONOS VAPE) is an innovative company dedicated to providing high-quality electronic cigarette products and comprehensive customer service.Since its establishment, Ehonos has been committed to integrating design, research and development, manufacturing, sales, marketing, and brand management.
            </p>
            <br>
            <p>
              With a focus on user experience, Ehonos adheres to a development strategy centered around users and guided by the market. We attach great importance to our professional research and development team and innovative talents, continuously improving our products and services, and enjoying a good reputation worldwide.
            </p>
          </div>
        </div>
      </div>
      <a-row :gutter="gutter" class="a_bottom_box">
        <a-col class="gutter-row" :xs="12" :sm="12" :md="6">
          <img src="@/assets/img/about/credential_1.png" alt="">
        </a-col>
        <a-col class="gutter-row" :xs="12" :sm="12" :md="6">
          <img src="@/assets/img/about/credential_1.png" alt="">
        </a-col>
        <a-col class="gutter-row" :xs="12" :sm="12" :md="6">
          <img src="@/assets/img/about/credential_2.png" alt="">
        </a-col>
        <a-col class="gutter-row" :xs="12" :sm="12" :md="6">
          <img src="@/assets/img/about/credential_2.png" alt="">
        </a-col>
      </a-row>
    </div> -->
  </div>
</template>
<script>
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs } from 'vue';
  export default {
    name: "about",
    components: {
    },
    setup() {
      const { proxy } = getCurrentInstance();
      const state = reactive({
        gutter: 30,
        isMobile: false,
        companyInfo:[
          { id: 1, img: require('@/assets/img/about/companyInfo_1.webp')},
          { id: 2, img: require('@/assets/img/about/companyInfo_2.webp')},
          { id: 3, img: require('@/assets/img/about/companyInfo_3.webp')},
          { id: 4, img: require('@/assets/img/about/companyInfo_4.webp')},
        ],
        companyInfo_mb:[
          { id: 1, img: require('@/assets/img/home/companyInfo_mb_1.webp')},
          { id: 2, img: require('@/assets/img/home/companyInfo_mb_2.webp')},
          { id: 3, img: require('@/assets/img/home/companyInfo_mb_3.webp')},
          { id: 4, img: require('@/assets/img/home/companyInfo_mb_4.webp')},
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
        })
      })
      const handleResize = () => {
        const windowWidth = window.innerWidth;
       if (windowWidth < 750) {
          state.gutter = [15, 15]
          state.isMobile = true
          } else {
            state.gutter = 30
            state.isMobile = false
        }
      };
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        ...toRefs(state),
        onSwiper,
        onSlideChange,
      };
    },
  };
</script>
<style lang="less">
.a_content{
  padding: 7.5rem 15rem;
  &>img{
    width: 90rem;
    height: 37.5rem;
    border-radius: .5rem;
    object-fit: cover;
    transition: .5s;
    &:hover{
      border-radius: 2rem;
    }
  }
}
.bg_dark{
  background: rgba(245, 184, 26, .1) url('../../assets/img/about/bg_dark.png') no-repeat center/cover;
}
.bg_light{
  background: rgba(245, 184, 26, .03) url('../../assets/img/about/bg_light.png') no-repeat center/cover;
}
// .a_top_box{
//   display: flex;
//   align-items: flex-start;
//   justify-content: space-between;
//   padding-bottom: 5rem;
//   margin-bottom: 5rem;
//   border-bottom: 1px solid rgba(0, 0, 0, .1);
//   .a_c_left{
//     width: 50rem;
//     height: 28.125rem;
//     flex-shrink: 0;
//     margin-right: 3.75rem;
//     video{
//       width: 100%;
//       height: 100%;
//     }
//   }
//   .a_c_right{
//     font-size: 1rem;
//     margin-top: 1.25rem;
//   }
//   .a_c_left{
//     font-size: 0;
//   }
//   .a_text_top{
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: 1.875rem;
//     .title{
//       font-size: 2.5rem;
//       line-height: 2.5rem;
//     }
//     img{
//       width: 4rem;
//     }
//   }
//   .a_text_bottom{
//     color: #111;
//     font-size: 1rem;
//     line-height: 1.5rem;
//   }
// }
// .a_bottom_box{
//   .a_bottom_text{
//     font-size: .875rem;
//     line-height: 1.125rem;
//   }
//   .a_title{
//     font-size: 2rem;
//     margin-bottom: .25rem;
//     line-height: 2.5rem;
//   }
// }
</style>