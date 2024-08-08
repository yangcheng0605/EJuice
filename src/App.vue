<template>
  <nav>
    <HeaderTop></HeaderTop>
    <div class="video-container" v-if="showvideo && video">
      <video muted="" webkit-playsinline="" playsinline="" preload="auto" autoplay="autoplay" loop="" name="media"><source :src="video" type="video/mp4"></video>
      <a class="guide">
        <img src="@/assets/img/down.png">
      </a>
      <a class="video-mask" @click="scrollToAnchor('index')"></a>
    </div>
    <Header></Header>
    <main class="wrapper">
      <div id="shopify-section-home" class="shopify-section">
        <div class="homepage">
          <router-view />
        </div>
      </div>
    </main>
    <Footer></Footer>
    <Minors></Minors>
  </nav>
</template>
<script>
  import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from "vue";
  import HeaderTop from "@/layout/Header-top.vue";
  import Header from "@/layout/Header.vue";
  import Footer from "@/layout/Footer.vue";
  import Minors from "@/layout/Minors.vue";
  import { useRoute } from 'vue-router'
  import "@/assets/style/home.less"
  export default defineComponent({
    components: {
      Header,
      HeaderTop,
      Footer,
      Minors,
    },
    props: {
      modalParam: {
        type: Object,
        default: () => { return {} },
      },
    },
    setup() {
      const { proxy } = getCurrentInstance();
      let route = useRoute()
      const state = reactive({
        showvideo:false,
        video: null
        // video: 'https://d2z9m2ihdgcjvw.cloudfront.net/products/elfliq/elfliq-video.mp4'
      })
      onMounted(async () => {
        getVideo()
      })
      const getVideo = () => {
        proxy.$api.getVideo().then(res=>{
          state.video = res.dPath || ''
        })
      };
       const scrollToAnchor = (anchorId) => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      watch(
      route,
      e => {
        var name = e.name
        if (['/', 'home'].indexOf(name) > -1) {
          state.showvideo = true
        } else {
          state.showvideo = false
        }
        if (state.isMobile) {
          window.scrollTo(0, 0)
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }
      },
      { immediate: true }
    )
      return {
        ...toRefs(state),
        scrollToAnchor
      }
    }
  });
</script>
<style lang="less">

</style>
