<template>
  <div class="shopify-section-header">
    <div class="header">
      <div class="warning">
        <div class="warning_move warning_move1">
          <div><span>WARNING: </span>This product contains nicotine. Nicotine is an addictive chemical.　Only for adults, MINORS are prohibited from buying e-cigarette</div>
        </div>
        <div class="warning_move warning_move2">
          <div><span>WARNING: </span>This product contains nicotine. Nicotine is an addictive chemical.　Only for adults, MINORS are prohibited from buying e-cigarette</div>
        </div>
      </div>
      <div class="desktop-only">
        <div class="main">
          <div class="main_left">
            <a href="/#/"><img src="@/assets/img/logo_black.png"></a>
          </div>
          <div class="main_center">
            <div class="nav">
              <span :href="item.path" :class="item.active?'nav_active':''" v-for="(item, index) in navList" :key="item.name" @click="linkTo(item)" @mouseover="hoverTo(index)" >{{ item.name }}</span>
            </div>
          </div>
          <div class="main_right">
            <div class="mr_right">
              <div class="language">
                <img src="@/assets/img/lang.png">
                <div>
                  <a-select
                    v-model:value="lang_itemp"
                    ref="select"
                    style="width: 80px"
                    :bordered="false"
                    :dropdownMatchSelectWidth="false"
                    :showArrow="false"
                  >
                    <a-select-option value="en">English</a-select-option>
                  </a-select>
                </div>
              </div>
            </div>
          </div>
          <div class="main_mask" :class="popIndex===1?'main_mask_show':''" @mouseover="leaveTo"></div>
          <div class="main_popup1 main_popup" :class="popIndex == 1?'main_popup_show':''" @mouseleave="leaveTo">
            <div class="mp_nav">
              <div @mouseover="proHoverTo(item.cateId)" v-for="item in mpType" :key="item.cateId" :class="item.cateId == proIndex?'mp_nav_hover':''">{{item.cateId == proIndex?'&gt;':''}} {{item.cateName || ''}}</div>
            </div>
            <div class="mp_content">
              <div class="mp_product">
                <div class="mp_items" v-if="mpList && mpList.length>0">
                  <div class="mp_item" v-for="(item, index) in mpList|| []" :key="index" @click="linkToPro(item)">
                      <div class="mp_img hoverBox">
                        <img class="hoverImg" :src="item.cover">
                      </div>
                      <span>{{item.proName}}</span>
                  </div>
                </div>
                <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" v-else />
              </div>
            </div>
            <div class="mp_more">
              <a href="/#/products">Learn more &gt;</a>
            </div>
          </div>
          <!-- <div class="main_popup2 main_popup" :class="popIndex == 1?'main_popup_show':''" @mouseleave="leaveTo">
            <div class="mainex">
              <a class="maex_nav" href="/#/wholesale?id=0"><div>BECOME A WHOLESALE</div></a>
              
              <a class="maex_nav" href="/#/wholesale?id=1"><div>GET FREE SAMPLE</div></a>
              
              <a class="maex_nav" href="/#/wholesale?id=2"><div>FREE PROMOTIONAL MATERIALS</div></a>
              
            </div>
          </div>
          <div class="main_popup3 main_popup" :class="popIndex == 2?'main_popup_show':''" @mouseleave="leaveTo">
            <div class="mainex">
              
                  
              <a class="maex_nav" href="/#/support?id=0"><div>CONTACT US</div></a>
              
              <a class="maex_nav" href="/#/support?id=1"><div>PRODUCT VERIFICATION</div></a>
              
              <a class="maex_nav" href="/#/support?id=2"><div>FAQ</div></a>
              
            </div>
          </div>
          <div class="main_popup4 main_popup" :class="popIndex == 3?'main_popup_show':''" @mouseleave="leaveTo">
            <div class="mainex">
              <a class="maex_nav" href="/#/blog?id=0"><div>CONTACT</div></a>
            </div>
          </div>
          <div class="main_popup5 main_popup" :class="popIndex == 4?'main_popup_show':''" @mouseleave="leaveTo">
            <div class="mainex">
              <a class="maex_nav" href="/#/blog?id=0"><div>ABOUT</div></a>
            </div>
          </div> -->
        </div>
      </div>
      <div class="mobile-only">
        <div class="main" >
          <div class="main_center">
            <a href="/#/"><img src="@/assets/img/logo_black.png"></a>
          </div>
          <div class="main_Mright" @click="targetShowNav">
            <img  v-if="show" src="@/assets/img/mb_nav_close.png" alt="">
            <img v-else src="@/assets/img/mb_nav.png" alt="">
          </div>
          <div :class="['Main_popup', show?'Main_popup_active':'']">
            <div class="Main_item">
              <a-collapse  ghost accordion>
                <p class="Mnav">
                  <a href="/#/" @click="show=false">
                    HOME
                  </a>
                </p>
                <a-collapse-panel class="Mnav" header="PRODUCTS" :show-arrow="false">
                  <template #extra><img class="headerExtra" src="@/assets/img/open_black.png" alt=""> </template>
                  <div class="Mnav_link">
                    <a :href="`/#/products?id=${item.cateId}`" @click="show=false" v-for="item in mpType" :key="item.cateId">{{item.cateName || ''}}</a>
                  </div>
                </a-collapse-panel>
                <p class="Mnav" >
                  <a href="/#/contact" @click="show=false">
                  CONTACT US
                </a>
                </p>
                <p class="Mnav" >
                  <a href="/#/about" @click="show=false">
                    ABOUT US
                  </a>
                </p>
                <p class="Mnav" >
                  <a href="/#/wholesale" @click="show=false">
                    BLOG
                  </a>
                </p>
              </a-collapse>
            </div>
          </div>
        </div>
	    </div>
    </div>
  </div>
</template>

<script>
import "@/assets/style/header.less"
import { getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue';
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from 'vue-router';
import { Empty } from "ant-design-vue";
import Storage from '@/utils/storage';
export default {
  name: "Header",
  components: {
    PlusOutlined
  },
  setup() {
    let router = useRouter();
    let route = useRoute();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      lang_itemp: 'en',
      show: false,
      popIndex: null,
      navList: [
        {name: 'HOME', path: '/home', active: false},
        {name: 'PRODUCTS', path: '/products', active: false},
        {name: 'CONTACT US', path: '/contact', active: false},
        {name: 'ABOUT US', path: '/about', active: false},
        {name: 'BLOG', path: '/wholesale', active: false},
      ],
      proIndex: 2,
      mpType:[
        { cateId: 2, cateName: 'New Arrivals'},
        { cateId: 3, cateName: 'Disposable Series'},
        { cateId: 4, cateName: 'Pod Series'},
        { cateId: 5, cateName: 'E-liquid'},
        { cateId: 6, cateName: 'Other'},
      ],
      mpList: []
    })
    onMounted(async () => {
      getProductListByCate(1)
    })
    // const getCategoryList = () => {
    //   proxy.$api.categoryList('').then(res=>{
    //     state.mpType = res
    //     state.proIndex = res[0].cateId
    //     getProductListByCate(res[0].cateId)
    //     Storage.setItem('navList', res)
    //   })
    // };
    const getProductListByCate = (id) => {
      proxy.$api.productListByCate(id).then(res=>{
        state.mpList = res
      })
    };
    const targetShowNav = () => {
      state.show = !state.show
    }
    const linkTo = (e) => {
      router.push({
        path: e.path
      });
      Storage.setItem('navActive', e.path)
    }
    const linkToPro = (res) => {
        router.push('/productsDetail?id=' + res.proId);
      };
    const hoverTo = (e) => {
      state.popIndex = e
      getProductListByCate(1)
    }
    const proHoverTo = (e) => {
      state.proIndex = e
      getProductListByCate(e)
    }
    const leaveTo = () => {
      state.popIndex = null
      setTimeout(() => {
        state.proIndex = state.mpType && state.mpType[0].cateId || 0
      }, 300);
    }
    watch(route, (e) => {
      var path = e.fullPath
      if (Storage.getItem('navActive')) {
          state.navList = state.navList.map(item => {
            if (item.path === path) {
              item.active = true;
            } else {
              item.active = false;
            }
            return item;
          });
      }
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      })
    }, { immediate: true })
    return {
      Empty,
      ...toRefs(state),
      targetShowNav,
      linkTo,
      linkToPro,
      hoverTo,
      leaveTo,
      proHoverTo,
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
