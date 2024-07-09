<template>
  <div class="wholesale">
    <div class="top_banner">
      <img src="@/assets/img/about/blog_banner.webp" alt="">
      <div class="t_box">
        <p class="title AntonFont">BLOG</p>
      </div>
    </div> 
    <div class="a_content w_content">
      <a-spin :spinning="spinning">
        <a-row :gutter="gutter" v-if="blogData && blogData.length>0">
          <a-col class="gutter-row" :span='colSpan' v-for="item in blogData" :key='item.nId'>
            <div class="gutter-box wow animate__bounceIn" data-wow-offset="50" @click="toDetail(item)" >
              <div class="proImg">
                <img :src="item.imageUrl" alt="">
              </div>
              <div class="blog_content">
                <p class="blog_name">{{ item.nDesc }}</p>
                <div class="publish_box">
                  <div class="publish_user"><img src="@/assets/img/publish_user_w.png" alt=""><span>{{item.aAddress}}</span></div>
                  <div><img src="@/assets/img/publish_time_w.png" alt=""><span>{{handleTime(item.aTime)}}</span></div>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
        <a-empty v-else />
      </a-spin>
      <div class="center" v-if="showButton">
        <a-button class="more" shape="round" @click="handleMore">More</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
  export default {
    name: "wholesale",
    components: {
    },
    setup() {
      const router = useRouter()
      const { proxy } = getCurrentInstance();
      const state = reactive({
        blogData: [],
        colSpan: 8,
        pageNum: 1,
        pageSize: 6,
        gutter: [30, 30],
        spinning: false, 
        showButton: true, 
      })
      onMounted(async () => { 
        nextTick(() => {
          handleResize();
          window.addEventListener('resize', handleResize);
           getBlogList()
        })
      })
      const getBlogList = () => {
        proxy.$api.blogList({pageNum: state.pageNum, pageSize: state.pageSize}).then(res=>{
          if (res.rows && res.rows.length>0) {
            state.blogData =  state.blogData.concat(res.rows)
            state.pageNum += 1 
            if (state.blogData.length === res.total) {
              state.showButton = false
            } else {
              state.showButton = true
            }
          }
        })
      };
      const handleResize = () => {
        const windowWidth = window.innerWidth;
       if (windowWidth < 750) {
          state.colSpan = 24;
          state.gutter = [0, 20]
        } else {
          state.colSpan = 8;
          state.gutter = [30, 30]
        }
      };
      const toDetail = (res) => {
        router.push('/blogDetails?nId=' + res.nId);
      };
      const handleMore = (res) => {
        getBlogList()
      };
      const handleTime = (time) => {
        const date = new Date(time);
        const year = date.getFullYear(); // 年份
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份（转为字符串，并补0）
        const day = String(date.getDate()).padStart(2, '0'); // 日期（转为字符串，并补0）
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
      };
      
      return {
        ...toRefs(state),
        toDetail,
        handleMore,
        handleTime
      };
    },
  };
</script>
<style lang="less">
.w_content{
  .gutter-box{
    border-radius: 1rem;
    background: #333;
    cursor: pointer;
    .proImg{
      border-radius: 1rem;
      overflow: hidden;
      img{
        border-radius: 1rem;
        width: 28.75rem;
        height: 21.25rem;
        object-fit: cover;
        transition: .3s;
        &:hover{
          transform: scale(1.1);
        }
      }
    }
    .blog_content{
      font-size: 1rem;
      line-height: 1rem;
      padding: 1.25rem;
      color: #FFF;
      .blog_name{
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1.875rem;
        margin-bottom: 1.5rem;
        height: 3.75rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img{
        width: 1rem;
        height: 1rem;
        margin-right: 0.25rem;
      }
      .publish_box{
        display: flex;
        &>div{
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .publish_user{
          margin-right: 1.25rem;
        }
      }
    }
  }
  .center{
    text-align: center;
    .more{
      margin-top: 3.75rem;
      width: 12.5rem;
      height: 4.125rem;
      border-radius: 2.0625rem;
      border: 0.125rem solid #111;
      font-weight: 500;
      font-size: 1.5rem;
      color: #111;
      line-height: 1.5rem;
      transition: .3s;
      background: transparent;
      &:hover{
        background: #111;
        color: #F5B81A;
      }
    }
  }
}
</style>