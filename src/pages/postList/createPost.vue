<template>
  <view class="wrap">
    <view class="formsWrap">
      <textarea
        class="textarea"
        placeholder="请输入您的想法"
        rows="8"
        v-model="postContent"
        maxlength="1024"
      ></textarea>
    </view>

    <view class="example-body">
      <uni-file-picker
        v-if="videoList.length <= 0"
        v-model="imgList"
        :auto-upload="false"
        @select.prevent="uploadImgSelect"
        file-mediatype="image"
        ref="uploadFileRef"
        limit="9"
        @delete="deleteImg"
      ></uni-file-picker>
    </view>

    <view class="example-body">
      <uni-file-picker
        v-if="imgList.length <= 0 && !uploading"
        v-model="videoList"
        :auto-upload="false"
        @select.prevent="uploadVideoSelect"
        file-mediatype="video"
        ref="uploadFileRef"
        limit="1"
        @delete="deleteVideo"
      ></uni-file-picker>
      <view class="imgItem" v-if="videoSrc">
        <video class="img" :src="videoSrc"></video>
      </view>
    </view>

    <view class="xxxx" @click="selectPic"></view>

    <view class="topic-wrap">
      <picker @change="bindPickerChange" :value="index" :range="topicRangeList">
        <view class="uni-input">
          <text class="symbol">#</text>
          {{ index !== undefined ? topicRangeList[index] : "请选择分类" }}
          <text class="sym">></text>
        </view>
      </picker>
    </view>

    <view class="range-wrap">
      <view class="range-label-text">
        <uni-icons type="eye-filled" size="20" color="#5dc588"></uni-icons>
        可见范围</view
      >
      <picker
        @change="bindRangePickerChange"
        :value="rangeIndex"
        :range="rangeList"
      >
        <view class="position-text">
          <uni-icons type="location" size="16"></uni-icons>
          {{ rangeIndex !== undefined ? rangeList[rangeIndex] : "可见范围" }}
          <text class="sym">></text>
        </view>
      </picker>
    </view>

    <view class="nickname">
      <view class="label">
        <uni-icons type="staff-filled" size="20" color="#f9d786"></uni-icons>
        匿名发布
      </view>
      <switch
        :checked="isAnonymous"
        @change="changeIsAnonymous"
        style="transform: scale(0.6)"
      />
    </view>

    <view class="submitBtn">
      <view class="publishBtn" @click="publish"> 立即发布 </view>
    </view>
  </view>
</template>

<script>
import { uniForms } from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import { POST_RANGE_LIST } from "./constant";
import { publishPostReq } from "../../api/post";
import { getPostTopicList } from "@/api/post";

export default {
  data() {
    return {
      postContent: undefined,
      index: 0,
      rangeIndex: 0,
      isAnonymous: false,
      rangeList: POST_RANGE_LIST,
      topicList: [],
      media: [],
      imgList: [],
      videoList: [],
      videoSrc: "",
      uploading: false,
    };
  },
  computed: {
    topicRangeList() {
      return this.topicList.map((item) => item.name);
    },
  },
  watch: {
    videoList(val) {
      if (val.length === 0) {
        this.videoSrc = "";
      }
    },
  },
  components: { uniForms },
  onLoad: function (option) {
    this.fetchPostTopicList();
  },
  mounted() {},
  methods: {
    isVideo(src) {
      if (!src) {
        return false;
      }
      const list = src.split(".");
      const fileType = list[list.length - 1];
      const res = ["mp4", "avi"].includes(fileType);
      return res;
    },
    changeIsAnonymous(e) {
      this.isAnonymous = e.detail.value;
    },
    getTitleByContent(text) {
      return text.slice(0, 80);
    },
    publish: function () {
      const content = JSON.stringify({
        text: this.postContent,
        media: this.media
      });
      const data = {
        content,
        title: this.getTitleByContent(this.postContent),
        topic: this.topicList[this.index].id,
        visibility: this.rangeIndex + "",
        isAnonymous: this.isAnonymous, // FIXME: 处理是否匿名
      };
      publishPostReq(data).then(({ code }) => {
        if (code === 0) {
          uni.showToast({
            title: "发布成功",
          });
          setTimeout(() => {
            uni.redirectTo({
              url: "/pages/postList/index",
            });
          }, 800);
        }
      });
    },
    fetchPostTopicList() {
      getPostTopicList().then(({ code, data }) => {
        if (code === 0) {
          this.topicList = data.list;
        }
      });
    },
    inputChange: function (e) {
      const value = e.detail.value;
      this.postContent = e.detail.value;
    },
    bindPickerChange: function (e) {
      this.index = e.detail.value;
    },
    bindRangePickerChange: function (e) {
      this.rangeIndex = e.detail.value;
    },
    uploadImgSelect(res) {
      const { tempFilePaths } = res;
      const newFilesList = [];
      const newFilePaths = [];

      const MAX_BITE = 1 * 1024 * 1024; // 最大不超过11MB
      let needToast = false;
      res.tempFiles.forEach((item, index) => {
        const { size } = item;
        if (size > MAX_BITE) {
          needToast = true;
        } else {
          newFilePaths.push(tempFilePaths[index]);
          newFilesList.push(item);
        }
      });

      this.imgList = [...this.imgList, ...newFilesList];

      if (newFilePaths.length > 0) {
        if (needToast) {
          uni.showToast({
            title: "文件大于11MB",
            icon: "error",
            duration: 500,
          });
          setTimeout(() => {
            this.uploadImg(newFilePaths);
          }, 500);
        } else {
          this.uploadImg(newFilePaths);
        }
      }
    },
    uploadVideoSelect(res) {
      this.videoList.push(res);
      this.uploadImg(res.tempFilePaths);
    },
    uploadImg(tempFilePaths) {
      this.uploading = true;
      uni.showLoading({
        title: "文件上传中",
        mask: true,
      });
      const promises = tempFilePaths.map((item, index) => {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: "https://www.dqxyq.com/api/oss/upload",
            filePath: tempFilePaths[index],
            name: "file",
            header: {
              token: this.$store.state.token,
            },
            success: (res) => {
              resolve(res);
            },
            fail: (error) => {
              reject(error);
            },
          });
        });
      });

      console.log("promises", promises);
      Promise.all(promises).then((value) => {
        this.uploading = false;
        uni.hideLoading();

        value.map((item) => {
          const data = JSON.parse(item.data);
          if (data.code === 0) {
            const isVideo = this.isVideo(data.data);
            if (isVideo) {
              this.media = [data.data];
              this.imgList = [];
              this.videoSrc = data.data;
            } else {
              this.media.push(data.data);
              this.videoList = [];
            }
          }
          console.log(
            "%c [ src ]-264",
            "font-size:13px; background:pink; color:#bf2c9f;",
            data
          );
        });
      });
    },
    deleteImg(e) {
      const index = e.index;
      this.imgList = this.imgList.filter((item, i) => i !== index);
      this.media = this.media.filter((item, i) => i !== index);
    },
    deleteVideo() {
      this.media = [];
      this.imgList = [];
      this.videoList = [];
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: white;
  padding: 0 12px;
  font-size: 14px;
}

.textarea {
  margin: 12px 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 12px;
  height: 120px;
}

.topic-wrap {
  display: inline-flex;
  background: #e1e1e1;
  border-radius: 10px;
  padding: 3px 12px;
  margin: 12px 0;
  color: #7b7b7b;
}

.symbol {
  font-size: 14px;
  font-weight: bold;
  color: #5dc588;
}

.uni-input {
  font-size: 12px;
}

.nickname {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
}

.nickname .label {
  display: flex;
  height: 100%;
  align-items: center;
}

.submitBtn {
  position: absolute;
  width: 100vw;
  height: 52px;
  bottom: 0;
  right: 0;
  -moz-box-shadow: 2px -4px 4px #ab9a9a, 2px 2px 5px #333333;
  -webkit-box-shadow: 2px -4px 4px #ab9a9a, 2px 2px 5px #333333;
  box-shadow: 2px -4px 4px #ab9a9a, 2px 2px 5px #333333;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 12px;
}

.publishBtn {
  width: 80px;
  height: 26px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #d6feda;
}

.range-wrap {
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.range-label-text {
  display: flex;
  align-items: center;
}

.position-text {
  font-size: 12px;
  height: 100%;
  display: flex;
  align-items: center;
}
.position-text .sym {
  margin-left: 4px;
}

.example-body {
  margin-top: 8px;
}

.imgItem {
  flex-shrink: 0;
  border-radius: 4px;
  width: 30%;
  height: 80px;
  overflow: hidden;
  position: relative;
}
.imgItem .img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
