<template>
  <view class="wrap">
    <img class="img" :src="url" alt="" />
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
