<template>
  <view class="content">
    <button class="button" type="primary" @click="login">微信快捷登录</button>
  </view>
</template>

<script>

export default {
  data() {
    return {
      title: "Hello1123",
    };
  },
  onLoad() {},
  methods: {
    login() {
      this.$store.dispatch('login');
    },
  },
};
</script>

<style>
.content {
  padding: 30px;
}

.mobile {
  margin-bottom: 30px;
}
</style>
