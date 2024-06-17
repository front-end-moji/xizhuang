<template>
  <view class="wrap">
    <view v-for="postInfo in postList" :key="postInfo.id">
      <post-item :isDetail="false" :postInfo="postInfo" :updateList="refresh" />
    </view>
    <view v-if="postList.length === 0" class="empty-wrap">
      <text class="empty">暂无内容</text>
    </view>
  </view>
</template>

<script>
import { queryMyPostList, queryMySubscribePostList } from "../../api/post";
import { postItem } from "../postList/postItem.vue";
export default {
  data() {
    return {
      postList: [],
      type: "myPost",
    };
  },
  components: { postItem },
  onPullDownRefresh() {
    this.refresh();
  },
  onLoad(option) {
    this.postList = [];
    this.type = option.type;
    if (option.type === "myPost") {
      uni.setNavigationBarTitle({
        title: "我的帖子",
      });
      this.getMyPostList();
    } else {
      this.getMySubscribePostList();
      uni.setNavigationBarTitle({
        title: "我的订阅",
      });
    }
  },
  methods: {
    refresh() {
      if (this.type === "myPost") {
        this.getMyPostList();
      } else {
        this.getMySubscribePostList();
      }
    },
    getMyPostList() {
      uni.showLoading({
        title: "加载中",
      });
      queryMyPostList()
        .then((res) => {
          if (res.code === 0) {
            this.postList = res.data.list;
          }
        })
        .finally(() => {
          uni.stopPullDownRefresh();
          uni.hideLoading();
        });
    },
    getMySubscribePostList() {
      uni.showLoading({
        title: "加载中",
      });
      queryMySubscribePostList()
        .then((res) => {
          if (res.code === 0) {
            this.postList = res.data.list;
          }
        })
        .finally(() => {
          uni.hideLoading();
          uni.stopPullDownRefresh();
        });
    },
  },
};
</script>

<style scoped>
.wrap {
  padding: 20rpx 50rpx;
  background-color: #fff;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
}

.empty-wrap {
  padding: 100rpx 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
