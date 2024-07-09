<template>
  <div class="products">
    <div class="top_banner">
      <img src="@/assets/img/product/banner_top.webp" alt="">
      <div class="t_box">
        <p class="title AntonFont">PRODUCTS</p>
      </div>
    </div> 
    <div class="a_content a_content2 products_content">
      <div class="a_content_top">
        <p class="title AntonFont">
          New Arrivals
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
                  <!-- <p class="p_hint">{{item.proDesc}}</p> -->
                  <p class="p_learn smallArrow_box">
                    <span>Learn more</span><img class="smallArrow" src="@/assets/img/arrow_white_r_small.png" alt="">
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
        colSpan: 5,
        gutter: [30, 30],
        activeKey: 2,
        mpType:[
          { cateId: 2, cateName: 'New Arrivals'},
          { cateId: 3, cateName: 'Disposable Series'},
          { cateId: 4, cateName: 'Pod Series'},
          { cateId: 5, cateName: 'E-liquid'},
          { cateId: 6, cateName: 'Other'},
        ],
        proList: []
      })
      onMounted(async () => {
        handleResize();
        window.addEventListener('resize', handleResize);
      })
      // const getCategoryList = () => {
      //   proxy.$api.categoryList('').then(res=>{
      //     state.mpType = res
      //     state.activeKey = res[0].cateId
      //     getProductListByCate(res[0].cateId)
      //     Storage.setItem('navList', res)
      //   })
      // };
      const getProductListByCate = (id) => {
        state.spinning = true
        proxy.$api.productListByCate(id).then(res=>{
          state.proList = res
          state.spinning = false
        })
      };
      const changeTab = (res) => {
        getProductListByCate(res)
      };
      const handleResize = () => {
        const windowWidth = window.innerWidth;
       if (windowWidth < 750) {
          state.colSpan = 12;
          state.gutter = [15, 20]
        } else {
          state.colSpan = 5;
          state.gutter = [30, 30]
        }
      };
      const linkTo = (res) => {
        router.push('/productsDetail?id=' + res.proId);
      };
      watch(route, (e) => {
        const query = e.query
        if (query.id) {
          nextTick(() => {
            state.activeKey = parseInt(query.id) || 1
            getProductListByCate(query.id)
          })
        } else {
          // if (!Storage.getItem('navList')) {
          //   getCategoryList()
          // } else {
            // state.mpType = Storage.getItem('navList')
            // state.activeKey = state.mpType &&  state.mpType[0].cateId
            state.activeKey = 2
            getProductListByCate(state.activeKey)
          // }
        }
      }, { immediate: true })
      return {
        Empty,
        ...toRefs(state),
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
    background-color: #FAC233 !important;
  }
}
</style>