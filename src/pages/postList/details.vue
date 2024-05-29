<template>
  <view class="details-wrap">
    <post-item :isDetail="true"></post-item>
  </view>
</template>

<script>
import { postItem } from "./postItem.vue";

export default {
  components: { postItem },
};
</script>

<style scoped>
.details-wrap {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
