<template>
  <div class="products">
    <div class="top_banner">
      <img :src="bannerList && bannerList.pPath" alt="">
      <div class="t_box">
        <p class="title AntonFont">PRODUCTS</p>
      </div>
    </div> 
    <div class="a_content a_content2 products_content">
      <div class="a_content_top Desk_content_top" v-if="!isMobile">
        <p class="title AntonFont">
          ODB & NEX JUICE
        </p>
        <div class="products_tab">
          <a-tabs v-model:activeKey="activeKey" @change="changeTab">
            <a-tab-pane :tab="item.cateName" v-for="item in mpType" :key='item.cateId'></a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="a_content_top" v-else>
        <p class="title AntonFont">
          ODB & NEX JUICE
        </p>
        <div class="products_tab">
          <a-tabs v-model:activeKey="activeKey" @change="changeTab">
            <a-tab-pane :tab="item.cateName" v-for="item in mpType" :key='item.cateId'></a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="a_content_bottom">
        <a-spin :spinning="spinning">
          <a-row :gutter="gutter" v-if="proList && proList.length>0">
            <a-col class="gutter-row" :span='colSpan' v-for="item in proList" :key='item.proId'>
              <div class="gutter-box " @click="linkTo(item)" >
                <div class="hoverBox proImg">
                  <img class="hoverImg" :src="item.cover" alt="">
                </div>
                <div class="p_text">
                  <p class="p_name">{{item.proName}}</p>
                  <p class="p_learn smallArrow_box">
                    <span>Learn more</span><img class="smallArrow" src="@/assets/img/arrow_r_small.png" alt="">
                  </p>
                </div>
              </div>
            </a-col>
          </a-row>
          <a-empty v-else />
        </a-spin>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Empty } from "ant-design-vue";
import Storage from '@/utils/storage';
import {globalState} from '@/utils/globalState.js'

  export default {
    name: "products",
    components: {
    },
    setup() {
      const { proxy } = getCurrentInstance();
      const router = useRouter()
      const route = useRoute()
      const state = reactive({
        spinning: false,
        isMobile: false,
        colSpan: 5,
        gutter: null,
        bannerList: null,
        proList: []
      })
      onMounted(async () => {
        getBannerList();
        handleResize();
        window.addEventListener('resize', handleResize);
      })
      // const getCategoryList = () => {
      //   proxy.$api.categoryList('').then(res=>{
      //     globalState.mpType = res
      //     globalState.activeKey = res[0].cateId
      //     getProductList(res[0].cateId)
      //     Storage.setItem('navList', res)
      //   })
      // };
      const getBannerList = () => {
        proxy.$api.getBannerList(1).then(res=>{
          state.bannerList = res
          globalState.activeKey = globalState.mpType[0].cateId
        })
      };
      const getProductList = (id) => {
        state.spinning = true
        proxy.$api.getProductList(id).then(res=>{
          state.proList = res
          state.spinning = false
        })
      };
      const changeTab = (res) => {
        getProductList(res)
      };
      const handleResize = () => {
        const windowWidth = window.innerWidth;
       if (windowWidth < 750) {
          state.colSpan = 12;
          state.gutter = [15, 20]
          state.isMobile = true
        } else {
          state.colSpan = 5;
          state.gutter = [30, 40],
          state.isMobile = false
        }
      };
      const linkTo = (res) => {
        router.push('/productsDetail?id=' + res.proId);
      };
      watch(route, (e) => {
        const query = e.query
        if (query.id) {
          nextTick(() => {
            globalState.activeKey = parseInt(query.id)
            getProductList(query.id)
          })
        } else {
          // if (!Storage.getItem('navList')) {
          // } else {
            // state.mpType = Storage.getItem('navList')
            // state.activeKey = state.mpType &&  state.mpType[0].cateId
            getProductList(globalState.activeKey)
          // }
        }
      }, { immediate: true })
      return {
        Empty,
        ...toRefs(state),
        ...toRefs(globalState),
        linkTo,
        changeTab,
      };
    },
  };
</script>
<style lang="less">
.ant-col-5{
  max-width: 20%;
}
.ant-spin-nested-loading {
  .ant-spin-container::after {
    background: transparent;
  }
  .ant-spin-dot .ant-spin-dot-item{
    background-color: #DB3A7B !important;
  }
}
</style>