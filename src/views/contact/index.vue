<template>
  <div class="contact">
    <div class="top_banner">
      <img src="@/assets/img/about/contact_banner.webp" alt="">
      <div class="t_box">
        <p class="title AntonFont">SUPPORT</p>
      </div>
    </div> 
    <div class="a_content a_content2">
      <div class="a_content_top">
        <p class="title AntonFont wow animate__fadeInLeft">
          Contact Us
        </p>
        <p class="sub_title wow animate__fadeInRight">Contact Us</p>
      </div>
      <a-row :gutter="30">
        <a-col class="gutter-row" :xs="24" :sm="24" :md="8">
          <div class="gutter-box hoverBox wow animate__bounceIn" data-wow-offset="50" @click="contact(1)">
            <img class="hoverImg" src="@/assets/img/about/img_1.webp" alt="">
            <div class="a_text">
              <p class="a_title AntonFont">Support</p>
              <p class="a_title AntonFont">Customer Service</p>
              <p class="a_email smallArrow_box"><span>WhatsApp: {{whatsApp}}</span><img class="smallArrow" src="../../assets/img/about/arrow_r.png" alt=""></p>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="24" :md="8">
          <div class="gutter-box hoverBox wow animate__bounceIn" data-wow-offset="50" @click="contact(2)">
            <img class="hoverImg" src="@/assets/img/about/img_2.webp" alt="">
            <div class="a_text">
              <p class="a_title AntonFont">Sales Become</p>
              <p class="a_title AntonFont">an Authorized</p>
              <p class="a_title AntonFont">Distributor</p>
              <p class="a_email smallArrow_box"><span>{{email}}</span><img class="smallArrow" src="../../assets/img/about/arrow_r.png" alt=""></p>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :xs="24" :sm="24" :md="8">
          <div class="gutter-box hoverBox wow animate__bounceIn" data-wow-offset="50" @click="contact(2)">
            <img class="hoverImg" src="@/assets/img/about/img_3.webp" alt="">
            <div class="a_text">
              <p class="a_title AntonFont">Marketing</p>
              <p class="a_title AntonFont">Co-Marketing</p>
              <p class="a_title AntonFont">Cooperation</p>
              <p class="a_email smallArrow_box"><span>{{email}}</span><img class="smallArrow" src="../../assets/img/about/arrow_r.png" alt=""></p>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal class="contact_pop" v-model:open="contactModal" :width="480" title="" :closable="false" :footer="null" centered>
      <div class="pop_top">
        <span class="title AntonFont">{{contactModalOp.title}}</span>
        <img :src="contactModalOp.url" alt="">
      </div>
      <p class="email">{{contactModalOp.content}}</p>
      <a-button class="copyBtn" shape="round" :data-text='contactModalOp.content' @click="handleCopy">{{contactModalOp.btn_text}}</a-button>
    </a-modal>
  </div>
</template>
<script>
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs } from 'vue';
  export default {
    name: "contact",
    components: {
    },
    setup() {
      const { proxy } = getCurrentInstance();
      const state = reactive({
        contactModal: false,
        email: 'support@ehonos.com',
        whatsApp: '+86 13760182010',
        contactModalOp: {
          title: '',
          content: '',
          btn_text: '',
        }
      })

      onMounted(async () => { 
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

      const contact = (type) => {
        state.contactModal = true
        let obj
        if (type == 1) {
          obj =  {
            title: 'WhatsApp',
            content: state.whatsApp,
            btn_text: 'Copy whatsapp',
            url: require('@/assets/img/phone.png')
          }
        } else {
          obj =  {
            title: 'Email',
            content: state.email,
            btn_text: 'Copy email address',
            url: require('@/assets/img/email.png')
          }
        }
        state.contactModalOp = obj
      };
      const handleCopy = (e) => {
        var text = e.target.dataset.text
        copyToClipboard(text)
        state.contactModal = false
        proxy.$message.success('Success copy');
      };
      const copyToClipboard = (text) => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text)
            .then(() => {
            })
            .catch((err) => {
              console.error('无法复制到剪贴板: ', err);
            });
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      }
      return {
        ...toRefs(state),
        contact,
        handleCopy,
      };
    },
  };
</script>
<style lang="less">
</style>