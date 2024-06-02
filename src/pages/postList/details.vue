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
    this.getPostDetail();
  },
  methods: {
    getPostDetail() {
      getPostDetailById({ id: "20" }).then(({ data, code }) => {
        if (code === 0) {
          console.log(
            "%c [ data ]-26",
            "font-size:13px; background:pink; color:#bf2c9f;",
            data
          );
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
