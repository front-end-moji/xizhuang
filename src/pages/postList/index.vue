<template>
  <view class="wrap">
    <view class="header">
      <view
        v-for="item in tabList"
        :key="item"
        class="headerItem"
        :class="{ active: true }"
        @click="onTabClick(item)"
      >
        <view v-if="activeTab === item" class="headerItem active"
          ># {{ item }}</view
        >
        <view v-else class="headerItem"> {{ item }}</view>
      </view>
    </view>

    <view class="scrollWrap">
      <view class="scope">
        <view
          class="left"
          :class="{ active: viewRange === 'ONLY' }"
          @click="changeViewRange"
          >仅看本校</view
        >
        <view class="right">
          <text
            class="right-item"
            :class="{ active: item === viewType }"
            :key="item"
            v-for="item in viewTypes"
            @click="changeViewType(item)"
            >{{ item }}</text
          >
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
import { TOPIC_LIST } from './constant'

export default {
  data() {
    return {
      viewTypes: ['最新', '热门'],
      activeTab: "全部话题",
      tabList: TOPIC_LIST,
      viewRange: 'ALL', // ALL or ONLY
      viewType: '最新', // LATEST or HOT
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
    changeViewRange() {
      this.viewRange = this.viewRange === 'ALL' ? 'ONLY' : 'ALL'
    },
    changeViewType(viewType) {
      this.viewType = viewType
    }
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
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
  height: 40px;
  align-items: center;
  padding: 0 8px;
}

.headerItem {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 0 4px;
  color: #ccc;
}

.headerItem.active {
  color: #5dc588;
}

.scrollWrap {
  height: calc(100vh - 30px - 52px);
  overflow-y: auto;
  border: 1px solid red;
}

.left {
  border: 1px solid #ccc;
  padding: 2px 4px;
}

.right {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.right-item {
  padding: 2px 6px;
}

.right-item.active {
  background: #5dc588;
  color: white;
}

.left.active {
  background: #5dc588;
  color: white;
}

.scope {
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 12px;
  height: 30px;
  align-items: center;
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
