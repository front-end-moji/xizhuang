<template>
  <view class="wrap">
    <view class="desc">请上传您的学生证件照片：</view>
    <uni-file-picker
      v-model="imgList"
      :auto-upload="false"
      @select.prevent="uploadSelect"
      file-extname="png,jpg,jpeg"
      ref="uploadFileRef"
      limit="1"
    ></uni-file-picker>
    <button
      type="primary"
      @click="submit"
      :disabled="postImgSrc.length === 0"
      class="btn"
    >
      认证
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      postImgSrc: [],
    };
  },
  computed: {},
  components: {},
  onLoad: function (option) {},
  mounted() {},
  methods: {
    submit() {
      if (this.postImgSrc.length === 0) return;

      this.$store.dispatch("updateUser", {
        verifyInfo: this.postImgSrc[0],
      });
      uni.navigateBack();
      uni.showToast({
        title: "成功上传认证信息",
      });
    },
    selectPic() {
      uni.chooseImage({
        count: 3,
        sourceType: ["album"],
        success(res) {},
      });
    },
    uploadSelect(res) {
      this.uploadImg(res.tempFilePaths);
    },
    uploadImg(tempFilePaths) {
      uni.uploadFile({
        url: "https://www.dqxyq.com/api/oss/upload",
        filePath: tempFilePaths[0],
        name: "file",
        header: {
          token: this.$store.state.token,
        },
        success: (res) => {
          const src = JSON.parse(res.data).data;
          this.postImgSrc.push(src);
        },
      });
    },
  },
};
</script>

<style scoped>
.desc {
  margin-bottom: 40rpx;
}
.wrap {
  box-sizing: border-box;
  background: #fff;
  width: 100vw;
  height: 100vh;
  padding: 40rpx;
}

.btn {
  margin-top: 100rpx;
}
</style>
