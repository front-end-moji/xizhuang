<template>
  <view class="wrap" :style="styleObj">
    <img class="img" :src="url" alt="" mode="aspectFill" />
  </view>
</template>

<script>
export default {
  name: "Avatar",
  data() {
    return {};
  },
  props: {
    url: "",
    styleObj: {},
  },
};
</script>

<style scoped>
.wrap {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}

.wrap .img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
