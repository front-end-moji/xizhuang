<template>
  <view class="content">
    <view class="loginArea" @click="go2Login">
      <view class="avatar">
        <image class="logo" src="/static/mine1.png"></image>
      </view>
      <view class="loginText"> 点击此处登录> </view>
    </view>
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
  onLoad() {
    // wx.login().then((res) => {
    //   wechatLogin(res.code).then((res) => {
    //     console.log(res);
    //   });
    //   console.log(res);
    // });
  },
  methods: {
    go2Login() {
      // 跳转到登录页面
      wx.navigateTo({
        url: "/pages/login/index",
      });
    },
  },
};
</script>

<style>
.content {
}

.loginArea {
  display: flex;
  align-items: center;
  padding: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #ffcd36;
}

.loginText {
  margin-left: 20px;
}

.logo {
  width: 60%;
  height: 60%;
}
</style>
