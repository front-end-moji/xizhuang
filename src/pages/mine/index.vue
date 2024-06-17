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
      <view class="avatar" v-if="!$store.state.user.avatar">
        <image class="logo" src="/static/mine1.png"></image>
      </view>
      <view class="avatar avatarWrap" v-if="$store.state.user.avatar">
        <image class="avatarImg" :src="$store.state.user.avatar"></image>
      </view>
      <view class="loginText">{{ $store.state.user.name }} </view>
    </view>
    <view class="listWrap">
      <view class="listItem" @click="go2School">
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
          <text v-if="!$store.state.user || !$store.state.user.school"
            >暂未绑定</text
          >
          <text v-else>{{ $store.state.user.school.name }}</text>
          <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
        </view>
      </view>
      <view class="listItem" @click="go2Authentication">
        <view>
          <uni-icons type="auth" size="18" color="#444444"></uni-icons>
          学生认证
        </view>
        <view>
          <text v-if="!$store.state.user || $store.state.user.status !== 1"
            >暂未认证</text
          >
          <text v-else>已认证</text>
          <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
        </view>
      </view>
      <view class="listItem" @click="go2MyPost">
        <view>
          <uni-icons type="compose" size="18" color="#444444"></uni-icons>
          我的帖子
        </view>
        <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
      </view>
      <view class="listItem" @click="go2MySubscribePost">
        <view>
          <uni-icons type="paperclip" size="18" color="#444444"></uni-icons>
          我的订阅
        </view>
        <uni-icons type="right" size="12" color="#aaaaaa"></uni-icons>
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
import { logout } from "@/api/mine.js";
export default {
  data() {
    return {};
  },
  onLoad() {},
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
      logout().then((res) => {
        const { code } = res;
        if (code === 0) {
          this.$store.commit("setUser", null);
          this.$store.commit("setToken", null);

          wx.setStorage({
            key: "isLogin",
            data: false,
          });
        }
      });
    },
    go2School() {
      if (!this.$store.state.user) {
        uni.showToast({
          title: "请先登录",
        });
      } else {
        wx.navigateTo({
          url: "/pages/school/index",
        });
      }
    },
    go2Authentication() {
      if (!this.$store.state.user) {
        uni.showToast({
          title: "请先登录",
        });
      } else if (this.$store.state.user.status !== 1) {
        wx.navigateTo({
          url: "/pages/authentication/index",
        });
      } else {
        uni.showToast({
          title: "已认证",
        });
      }
    },
    go2MyPost() {
      if (!this.$store.state.user) {
        uni.showToast({
          title: "请先登录",
        });
      } else {
        uni.navigateTo({
          url: "/pages/myPost/index?type=myPost",
        });
      }
    },
    go2MySubscribePost() {
      if (!this.$store.state.user) {
        uni.showToast({
          title: "请先登录",
        });
      } else {
        uni.navigateTo({
          url: "/pages/myPost/index?type=subscribe",
        });
      }
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
  overflow: hidden;
}

.loginText {
  margin-left: 20px;
}

.logo {
  width: 60%;
  height: 60%;
}

.avatarImg {
  width: 100%;
  height: 100%;
}
</style>
