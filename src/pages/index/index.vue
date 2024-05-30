<template>
  <uni-nav-bar
    height="170rpx"
    :border="false"
    left
    class="nav-bar"
    leftWidth="100%"
  >
    <template v-slot:left>
      <view class="schoolWrap"
        ><uni-icons type="location" size="26"></uni-icons>
        <view class="schoolName"> 江南皮革厂大学 </view>
        <uni-icons type="right" size="20"></uni-icons>
      </view>
    </template>
  </uni-nav-bar>
  <view class="wrap">
    <view class="container">
      <!-- <view class="inputWrap">
        <input type="text" />
      </view> -->

      <view class="swiperContainer">
        <img src="../../static/banner.png" class="bannerImg" alt="" />
      </view>

      <view class="serviceListWrap">
        <view
          class="serviceItem"
          v-for="item in navList"
          :key="item.title"
          @click="navToPostLit"
        >
          <view class="imgWrap">
            <img :src="item.icon" alt="" class="navImg" />
          </view>
          <text class="serviceText">{{ item.title }}</text>
        </view>
      </view>

      <text class="hotTitle">热门话题</text>

      <view class="hotTopicWrap">
        <view class="hotTopicItem" @click="navToPostDetail">
          <view class="hotLeft">
            <view class="hotTitle"> 这成为富豪们的游乐场 </view>
            <view class="desc">
              据“公开的秘密”組织初步估计，美国2022年中期选举的“
            </view>
            <view class="info">
              <view class="date">2024.05.24</view>
              <view class="split">|</view>
              <view class="viewCount">6次阅读</view>
            </view>
          </view>
          <view class="hotRight">
            <view class="hotImg">
              <img
                class="homeImg"
                src="https://www.kkday.com/zh-hk/blog/wp-content/uploads/WhatsApp-Image-2023-08-10-at-16.40.27-760x510.webp"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>
      <view class="hotTopicWrap">
        <view class="hotTopicItem" @click="navToPostDetail">
          <view class="hotLeft">
            <view class="hotTitle"> java开发者的福音 </view>
            <view class="desc"> java开发者的福音，后续更新，敬请期待 </view>
            <view class="info">
              <view class="date">2024.05.24</view>
              <view class="split">|</view>
              <view class="viewCount">6次阅读</view>
            </view>
          </view>
          <view class="hotRight">
            <view class="hotImg">
              <img
                class="homeImg"
                src="https://www.kkday.com/zh-hk/blog/wp-content/uploads/WhatsApp-Image-2023-08-10-at-16.40.27-760x510.webp"
                alt=""
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getPostList } from "@/api/home";
import { NAV_LIST } from "./constant";

export default {
  data() {
    return {
      navList: NAV_LIST,
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    };
  },
  onLoad: function (option) {
    getPostList({
      authorId: "111",
      isSearchLatestPost: 1,
      limit: 10,
      page: 1,
      visibility: "aaa",
    })
      .then((data) => {})
      .catch((error) => {});
  },
  methods: {
    navToPostLit: () => {
      uni.navigateTo({
        url: "/pages/postList/index",
      });
    },
    navToPostDetail: () => {
      uni.navigateTo({
        url: "/pages/postList/details",
      });
    },
  },
};
</script>

<style scoped>
.nav-bar >>> .uni-navbar__header-btns-left {
  align-items: flex-end !important;
}

.schoolWrap {
  height: 44rpx;
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  padding-left: 15rpx;
}

.schoolName {
  font-size: 30rpx;
}

.wrap {
  width: 100vw;
  padding-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
}

.container {
  width: calc(100% - 32px);
  height: 100%;
}

.inputWrap {
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 2px 8px;
  font-size: 10px;
}

.swiperContainer {
  border-radius: 12px;
  height: 128px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  background: #92cc8a;
}

.swiperContainer .bannerImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.serviceListWrap {
  margin-bottom: 12px;
  display: flex;
  padding: 8px 0;
  border-radius: 8px;
  flex-wrap: wrap;
}

.serviceItem {
  height: 72px;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.imgWrap {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  margin-bottom: 4px;
}

.navImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.serviceText {
  font-size: 14px;
}

.hotTitle {
  font-size: 20px;
  font-weight: bold;
}

.hotTopicWrap {
  margin-top: 12px;
  padding-bottom: 16px;
}

.hotTopicItem {
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
}

.hotLeft {
  width: 170px;
}

.hotTitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.desc {
  font-size: 12px;
  color: #ccc;
  margin-bottom: 18px;
}

.info {
  display: flex;
  color: #ccc;
  font-size: 12px;
}

.split {
  margin: 0 12px;
}

.hotRight {
  width: calc(100% - 180px);
}

.hotImg {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.homeImg {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
