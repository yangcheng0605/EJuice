<template>
  <div class="isAdult">
    <a-modal class="contact_pop adult_pop" v-model:open="contactModal" :width="480" :keyboard='false' :maskClosable='false' :closable="false" centered :footer="null">
      <p class="title AntonFont">Are you old enough to be here?</p>
      <p class="hint">You must be at least 18 to enter this site</p>
      <div class="isAdult_btns">
        <a-button class="cancelBtn" shape="round" @click="handleCancle">I am under 21</a-button>
        <a-button class="copyBtn" shape="round" @click="handleOk">I am over 21</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getCurrentInstance, nextTick, onMounted, reactive, toRefs } from 'vue';
  export default {
    name: "wholesale",
    components: {
    },
    setup() {
      const { proxy } = getCurrentInstance();
      const state = reactive({
        contactModal: false,
      })
      onMounted(async () => { 
        console.log(localStorage.getItem('isAdult'))
        const isAdult = localStorage.getItem('isAdult')
        if (isAdult)  {
          state.contactModal = false
        } else {
          state.contactModal = true
        }
      })
      const contact = () => {
        state.contactModal = true
      };
      const handleOk = () => {
        state.contactModal = false
        localStorage.setItem('isAdult', true)
      };
      const handleCancle = () => {
        window.location.href = 'about:blank';
      };
     
      return {
        ...toRefs(state),
        contact,
        handleOk,
        handleCancle,
      };
    },
  };
</script>