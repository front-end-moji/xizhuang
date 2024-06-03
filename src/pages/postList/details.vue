<template>
  <view class="details-wrap">
    <post-item
      :isDetail="true"
      :topicList="topicList"
      :postInfo="postInfo"
    ></post-item>
  </view>
</template>

<script>
import { postItem } from "./postItem.vue";
import { getPostDetailById } from "@/api/post";

export default {
  data() {
    return {
      postInfo: null,
    };
  },
  components: { postItem },
  onLoad: function (option) {
    const id = JSON.parse(decodeURIComponent(option.id));
    this.getPostDetail(id);
  },
  methods: {
    getPostDetail(id) {
      getPostDetailById({ id }).then(({ data, code }) => {
        if (code === 0) {
          this.postInfo = data;
        }
      });
    },
  },
};
</script>

<style scoped>
.details-wrap {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
