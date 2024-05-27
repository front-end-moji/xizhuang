<template>
  <view class="wrap">
    <view class="container">
      <view class="inputWrap">
        <input type="text" />
      </view>

      <view class="swiperContainer">1</view>

      <view class="serviceListWrap">
        <view class="serviceItem">
          <view @click="navToPostLit">
            <view class="img"></view>
            <text class="serviceText">贴吧</text>
          </view>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
        <view class="serviceItem">
          <view class="img"></view>
          <text class="serviceText">美食</text>
        </view>
      </view>

      <text class="hotTitle">热门话题</text>

      <view class="hotTopicWrap">
        <view class="hotTopicItem">
          <view class="hotLeft">
            <view class="hotTitle"> 这成为富豪们的游乐场 </view>
            <view class="desc">
              据“公开的秘密”組织初步估计，美国2022年中期选举的“
            </view>
            <view class="info">
              <view class="date">2022.01.04</view>
              <view class="split">|</view>
              <view class="viewCount">666次阅读</view>
            </view>
          </view>
          <view class="hotRight">
            <view class="hotImg"></view>
          </view>
        </view>
        <view class="hotTopicItem">
          <view class="hotLeft">
            <view class="hotTitle"> 这成为富豪们的游乐场 </view>
            <view class="desc">
              据“公开的秘密”組织初步估计，美国2022年中期选举的“
            </view>
            <view class="info">
              <view class="date">2022.01.04</view>
              <view class="split">|</view>
              <view class="viewCount">666次阅读</view>
            </view>
          </view>
          <view class="hotRight">
            <view class="hotImg"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getPostList } from "@/api/home";

export default {
  data() {
    return {
      title: "Hello11233321111",
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    };
  },
  // components: [uniSearchBar],
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option.id); //打印出上个页面传递的参数。
    console.log(option.name); //打印出上个页面传递的参数。
    getPostList({
      authorId: "111",
      isSearchLatestPost: 1,
      limit: 10,
      page: 1,
      visibility: "aaa",
    })
      .then((data) => {
        console.log(
          "%c [ data ]-104",
          "font-size:13px; background:pink; color:#bf2c9f;",
          data
        );
      })
      .catch((error) => {
        console.log(
          "%c [ error ]-110",
          "font-size:13px; background:pink; color:#bf2c9f;",
          error
        );
      });
  },
  methods: {
    navToPostLit: () => {
      uni.navigateTo({
        url: "/pages/postList/index",
      });
    },
  },
};
</script>

<style scoped>
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
  background: #a3bffa;
  height: 128px;
  margin-bottom: 12px;
}

.serviceListWrap {
  background: #fff;
  margin-bottom: 12px;
  padding: 8px 16px;
  display: flex;
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

.img {
  width: 30px;
  height: 40px;
  background: #92cc8a;
  border-radius: 12px;
  margin-bottom: 4px;
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
  background: #6e96a5;
  border-radius: 8px;
}
</style>
