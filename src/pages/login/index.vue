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
      // wx.login().then((res) => {
      //   wechatLogin(res.code).then((res) => {
      //     const { code } = res;
      //     console.log('%c 🐙[ res ]-21', 'font-size:13px; background:#FFE599; color:#FFB570;', res)
      //     if (code === 0) {
      //       const { user, token } = res.data;
      //       this.$store.commit("setUser", user);
      //       this.$store.commit("setToken", token)
      //       wx.setStorage({
      //         key: "isLogin",
      //         data: true,
      //       });
      //       wx.navigateBack();
      //     }
      //   });
      // });
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
