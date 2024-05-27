<template>
  <view class="wrap">
    <view class="header">
      <view
        v-for="item in tabList"
        :key="item"
        class="headerItem"
        @click="onTabClick(item)"
      >
        <view v-if="activeTab === item" class="headerItem active"
          ># {{ item }}</view
        >
        <view v-else class="headerItem"> {{ item }}</view>
      </view>
    </view>

    <uni-badge></uni-badge>

    <view class="scrollWrap">
      <view class="scope">
        <view class="left">仅看本校</view>
        <view class="right">
          <text>最新</text>
          <text>热门</text>
        </view>
      </view>

      <view class="slider">xxx</view>

      <view class="postWrap">
        <post-item></post-item>
        <post-item></post-item>
        <post-item></post-item>
        <post-item></post-item>
      </view>
    </view>

    <view class="footer">
      <text class="newPost" @click="this.navToCreatePost">新建</text>
    </view>
  </view>
</template>

<script lang="js">
import postItem from "./postItem.vue";

export default {
  data() {
    return {
      activeTab: "全部话题",
      tabList: [
        "全部话题",
        "求助打听",
        "交友捞人",
        "生活分享",
        "兼职招募",
        "其他话题",
      ],
    };
  },
  components: {postItem},
  onLoad: function (option) {},
  computed: {
    getActiveClass: () => {
      return this.activeTab === "全部话题" ? "active" : "";
    },
  },
  methods: {
    onTabClick(item) {
      this.activeTab = item;
    },
    navToCreatePost: () => {
      uni.navigateTo({
        url: "/pages/postList/createPost",
      });
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  border: 1px solid red;
  display: flex;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background: white;
  flex-direction: column;
}

.header {
  display: flex;
  width: 100%;
  overflow-x: auto;
  height: 30px;
  align-items: center;
  padding: 0 8px;
}

.headerItem {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 0 4px;
  color: #e1e1e1;
}

.headerItem.active {
  color: green;
}

.scrollWrap {
  border: 1px solid blue;
  height: calc(100vh - 30px - 52px);
  overflow-y: auto;
}

.scope {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 12px;
  height: 30px;
  align-items: center;
  border: 1px solid red;
}

.slider {
  height: 30px;
  margin: 0 12px;
  background: orange;
}

.postWrap {
  padding: 0 12px;
}

.footer {
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
