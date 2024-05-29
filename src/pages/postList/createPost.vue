<template>
  <view class="wrap">
    <view class="header">
      <text class="left">我要置顶</text>
      <text class="right">让更多人听到你的声音~</text>
    </view>

    <view class="formsWrap">
      <textarea
        class="textarea"
        placeholder="请输入您的想法"
        rows="8"
        v-model="postContent"
      ></textarea>
    </view>

    <view class="example-body">
      <uni-file-picker limit="5"></uni-file-picker>
    </view>

    <view class="topic-wrap">
      <picker @change="bindPickerChange" :value="index" :range="array">
        <view class="uni-input">
          <text class="symbol">#</text>
          {{ index !== undefined ? array[index] : "请选择分类" }}
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
      <switch :checked="isAnonymous" style="transform: scale(0.6)" />
    </view>

    <view class="submitBtn">
      <view class="publishBtn"> 立即发布 </view>
    </view>
  </view>
</template>

<script>
import { uniForms } from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";
import { TOPIC_LIST, POST_RANGE_LIST } from "./constant";
import { publishPostReq } from "../../api/post";

export default {
  data() {
    return {
      postContent: undefined,
      array: TOPIC_LIST,
      index: undefined,
      rangeIndex: 0,
      isAnonymous: false,
      rangeList: POST_RANGE_LIST,
    };
  },
  components: { uniForms },
  onLoad: function (option) {},
  methods: {
    publish: function () {
      const data = {
        content: this.postContent,
        title: "",
        topic: TOPIC_LIST[this.index],
        visibility: this.rangeIndex,
        // isAnonymous: this.isAnonymous, // FIXME: 处理是否匿名
      };
      publishPostReq(data).then((data) => {
        uni.showToast({
          title: "发布成功",
        });
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

.header {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.left {
  color: #5dc588;
}

.right {
  color: #ccc;
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
</style>
