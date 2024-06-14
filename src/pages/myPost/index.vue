<template>
  <view class="wrap">
    <view v-for="postInfo in postList" :key="postInfo.id">
      <post-item
        :isDetail="false"
        :postInfo="postInfo"
        :updateList="getPostList"
      />
    </view>
  </view>
</template>

<script>
import { queryMyPostList } from "../../api/post";
import { postItem } from "../postList/postItem.vue";
export default {
  data() {
    return {
      postList: [],
    };
  },
  components: { postItem },
  onLoad() {
    this.getPostList();
  },
  methods: {
    getPostList() {
      console.log("getPostList");
      queryMyPostList().then((res) => {
        if (res.code === 0) {
          this.postList = res.data.list;
        }
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
</style>
