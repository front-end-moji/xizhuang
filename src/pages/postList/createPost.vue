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
        rows="10"
      ></textarea>
    </view>

    <view class="submitBtn" @click="publish">立即发布</view>
  </view>
</template>

<script>
import { uniForms } from "@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue";

export default {
  data() {
    return {
      baseFormData: {
        introduction: "",
      },
    };
  },
  components: { uniForms },
  onLoad: function (option) {},
  methods: {
    publish() {},
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid red;
  background: white;
  padding: 0 12px;
}

.textarea {
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}
</style>
