<template>
  <uni-nav-bar
    height="170rpx"
    :border="false"
    left
    class="nav-bar"
    leftWidth="100%"
  >
    <template v-slot:left>
      <view class="schoolWrap" @click="updateSchool">
        <uni-icons type="location" size="26"></uni-icons>
        <text
          class="schoolName"
          v-if="!$store.state.user || !$store.state.user.school"
          >暂未绑定</text
        >
        <text v-else class="schoolName">{{
          $store.state.user.school.name
        }}</text>
        <uni-icons type="right" size="20"></uni-icons>
      </view>
    </template>
  </uni-nav-bar>
  <view class="wrap">
    <view class="container">
      <view class="swiperContainer">
        <swiper
          class="swiper"
          circular
          :indicator-dots="false"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
        >
          <swiper-item v-for="item in bannerList" :key="item.url">
            <view class="swiper-item">
              <img :src="item.url" alt="" class="swiper-img" />
            </view>
          </swiper-item>
        </swiper>
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
        <view
          class="hotTopicItem"
          v-for="item in postList"
          :key="item.id"
          @click="navToPostDetail(item.id)"
        >
          <view class="hotLeft">
            <view class="hotTitle"> 暂无标题 </view>
            <view class="desc">
              {{ getPostInfo(item).text }}
            </view>
            <view class="info">
              <view class="date">{{ genCreateTime(item.gmtCreate) }}</view>
            </view>
          </view>
          <view class="hotRight">
            <view class="hotImg">
              <img
                class="homeImg"
                :src="getPostInfo(item).media[0] || '../../static/banner.png'"
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
import { getPostList, fetchBannerList } from "@/api/post";
import { NAV_LIST } from "./constant";
import { isEmpty } from "lodash";
import dayjs from "dayjs";

export default {
  data() {
    return {
      navList: NAV_LIST,
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      postList: [],
      bannerList: [],
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  watch: {},
  onLoad: function (option) {
    this.pageInit();
  },
  methods: {
    pageInit() {
      getPostList({
        isSearchLatestPost: 0,
        limit: 10,
        page: 1,
      })
        .then(({ data, code }) => {
          if ((code === 0) & !isEmpty(data.list)) {
            this.postList = data.list;
          }
        })
        .catch((error) => {});

      fetchBannerList().then(({ code, data }) => {
        if (code === 0) {
          this.bannerList = data;
        }
      });
    },
    genCreateTime(timestamp) {
      return dayjs(Number(timestamp)).format("YYYY-MM-DD");
    },
    getPostInfo(item) {
      let res = { text: "", media: [] };
      if (item) {
        try {
          const data = JSON.parse(item.content);
          if (data && data.text) {
            res = {
              text: data.text,
              media: data.media,
            };
          }
        } catch (e) {
          res = {
            text: item.content,
            media: [],
          };
        }
        return res;
      }
    },
    navToPostLit: () => {
      uni.navigateTo({
        url: "/pages/postList/index",
      });
    },
    navToPostDetail: (id) => {
      uni.navigateTo({
        url: `/pages/postList/details?id=${id}`,
      });
    },
    updateSchool() {
      if (!this.$store.state.user) {
        wx.navigateTo({
          url: "/pages/login/index",
        });
      } else  {
        wx.navigateTo({
          url: "/pages/school/index",
        });
      }
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
  border-radius: 8px;
  height: 180px;
  margin-bottom: 12px;
  overflow: hidden;
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
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

.swiper {
  height: 100%;
}

.swiper-item {
  display: block;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.swiper-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
