<template>
  <view class="details-wrap">
    <post-item :isDetail="true"></post-item>
  </view>
</template>

<script>
import { postItem } from "./postItem.vue";
import { getPostDetailById } from "@/api/post";

export default {
  data() {
    return {
      contentStr: "",
    };
  },
  components: { postItem },
  onLoad: function (option) {
    this.getPostDetail();
  },
  methods: {
    getPostDetail() {
      getPostDetailById({ id: "1" }).then(({ data, code }) => {
        if (code === 0) {
          this.contentStr = data.content;
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
