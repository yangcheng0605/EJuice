<template>
  <div class="header_top">
    <div class="warning">
      <div class="warning_move warning_move1">
        <div><span>WARNING: </span>This product contains nicotine. Nicotine is an addictive chemical.　Only for adults, MINORS are prohibited from buying e-cigarette</div>
      </div>
      <div class="warning_move warning_move2">
        <div><span>WARNING: </span>This product contains nicotine. Nicotine is an addictive chemical.　Only for adults, MINORS are prohibited from buying e-cigarette</div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/style/header.less"
import { onMounted, reactive, toRefs,} from 'vue';
export default {
  name: "HeaderTop",
  setup() {
    const state = reactive({
    })
    onMounted(async () => {
    })
    return {
      ...toRefs(state),
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
