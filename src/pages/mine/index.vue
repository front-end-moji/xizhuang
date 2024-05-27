<template>
  <view class="content">
    <view class="loginArea">
      <view class="avatar">
        <image class="logo" src="/static/mine1.png"></image>
      </view>
      <view class="loginText">
        点击此处登录>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello1123",
    };
  },
  onLoad() {
    console.warn(wx)
  },
  methods: {},
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
  border: 1px solid #FFCD36;
}

.loginText {
  margin-left: 20px;
}

.logo {
  width: 60%;
  height: 60%;
}
</style>
