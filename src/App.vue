<template>
  <nav>
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
  import { defineComponent, getCurrentInstance, nextTick, onMounted, reactive, toRefs } from "vue";
  import Header from "@/layout/Header.vue";
  import Footer from "@/layout/Footer.vue";
  import Minors from "@/layout/Minors.vue";
  import "@/assets/style/home.less"
  export default defineComponent({
    components: {
      Header,
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
      const state = reactive({
      })
      onMounted(async () => {
      
      })
      return {
        ...toRefs(state),
      }
    }
  });
</script>
<style lang="less">

</style>
