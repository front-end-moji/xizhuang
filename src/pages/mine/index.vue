<template>
  <view class="bg"></view>
  <view class="content">
    <view v-if="!$store.state.user" class="loginArea" @click="go2Login">
      <view class="avatar">
        <image class="logo" src="/static/mine1.png"></image>
      </view>
      <view class="loginText">
        点击此处登录<uni-icons type="right" size="20"></uni-icons
      ></view>
    </view>
    <view v-if="$store.state.user" class="loginArea" @click="go2UserInfo">
      <view
        class="avatar"
        v-if="!$store.state.user.avatar"
      >
        <image class="logo" src="/static/mine1.png"></image>
      </view>
      <view
        class="avatar avatarWrap"
        v-if="$store.state.user.avatar"
      >
        <image class="logo" :src="$store.state.user.avatar"></image>
      </view>
      <view class="loginText">{{ $store.state.user.name }} </view>
    </view>
    <view class="listWrap">
      <view class="listItem">
        <view>
          <uni-icons type="map" size="18" color="#444444"></uni-icons>
          绑定学校
        </view>
        <view>
          <uni-icons
            type="location-filled"
            size="16"
            color="#444444"
          ></uni-icons>
          暂未登录
          <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
        </view>
      </view>
      <view class="listItem">
        <view>
          <uni-icons type="cart" size="18" color="#444444"></uni-icons>
          我的订单
        </view>
        <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
      </view>
    </view>

    <view class="listWrap">
      <view class="listItem">
        <view>
          <uni-icons type="person" size="18" color="#444444"></uni-icons>
          关于我们
        </view>
        <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
      </view>
      <view class="listItem">
        <view>
          <uni-icons type="phone" size="18" color="#444444"></uni-icons>
          联系客服
        </view>
        <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
      </view>
    </view>
    <view class="logout" @click="logout"> 退出登录 </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {
    console.log(
      "%c 🐙[  ]-67",
      "font-size:13px; background:#FFE599; color:#FFB570;",
      this.$store.state
    );
  },
  methods: {
    go2Login() {
      wx.navigateTo({
        url: "/pages/login/index",
      });
    },
    go2UserInfo() {
      wx.navigateTo({
        url: "/pages/userInfo/index",
      });
    },
    logout() {
      
    },
  },
};
</script>

<style>
.logout {
  margin-top: 30rpx;
  color: #888888;
  text-decoration: underline;
  text-align: center;
}

.bg {
  height: 35vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #ffcd3633, #f7f7f7);
  z-index: -1;
}

.avatar.avatarWrap {
  border: none;
  background: transparent;
}

.listWrap {
  background: #fff;
  border-radius: 8rpx;
  padding: 4rpx 25rpx;
  margin-top: 30rpx;
}

.listItem {
  height: 100rpx;
  width: 100%;
  border-bottom: 1rpx solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.listItem:last-child {
  border-bottom: none;
}

.content {
  margin-top: 175rpx;
  padding: 30rpx;
}

.loginArea {
  display: flex;
  align-items: center;
  margin-bottom: 50rpx;
}

.avatar {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #ffcd36;
  background: #ffcd3644;
}

.loginText {
  margin-left: 20px;
}

.logo {
  width: 60%;
  height: 60%;
}
</style>
