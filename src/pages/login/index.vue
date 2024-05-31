<template>
  <view class="content">
    <button class="button" type="primary" @click="login">微信快捷登录</button>
  </view>
</template>

<script>
import { wechatLogin } from "@/api/mine";
export default {
  data() {
    return {
      title: "Hello1123",
    };
  },
  onLoad() {},
  methods: {
    login() {
      wx.login().then((res) => {
        wechatLogin(res.code).then((res) => {
          const { code } = res;
          if (code === 0) {
            const { user } = res.data;
            this.$store.commit("setUser", user);
            wx.navigateBack();
          }
        });
      });
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
