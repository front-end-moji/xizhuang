<template>
  <view class="postItem">
    <view class="postHeader">
      <view class="avatar">xxx</view>
      <view class="info">
        <text class="name">Ohh.</text>
        <view class="detailInfo">
          <text class="date">xxx</text>
          <text class="position">黑龙江xxxxx</text>
        </view>
      </view>

      <view class="postTopic">其他话题</view>
    </view>
    <view class="textWrapper">
      <input id="exp1" class="exp" type="checkbox" ref="inputBtn" />
      <view class="text">
        <text class="btn" for="exp1" @click="inputClick"></text>
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
      </view>
    </view>
    <view class="imgList">
      <view class="imgItem"></view>
      <view class="imgItem"></view>
      <view class="imgItem"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "postItem",
  data() {
    return {};
  },
  onLoad: function (option) {},
  methods: {
    onTabClick(item) {
      this.activeTab = item;
    },
    inputClick() {
      this.$refs.inputBtn.click();
    },
  },
};
</script>

<style scoped>
.postWrap {
  padding: 0 12px;
}

.postItem {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 16px 0;
}

.postHeader {
  display: flex;
  position: relative;
}

.avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: blue;
  margin-right: 8px;
}

.postTopic {
  position: absolute;
  right: 0;
  top: 12px;
  color: green;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.date {
  margin-right: 8px;
}

.contentText {
  padding-left: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.textWrapper {
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  padding-left: 40px;
}
.text {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  /* display: flex; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
}
.text::before {
  content: "";
  height: calc(100% - 24px);
  float: right;
}
.text::after {
  content: "";
  width: 999vw;
  height: 999vw;
  position: absolute;
  box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
  margin-left: -100px;
}
.btn {
  float: right;
  clear: both;
  margin-left: 10px;
  font-size: 16px;
  padding: 0 8px;
  background: #3f51b5;
  line-height: 24px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  /* margin-top: -30px; */
}
.btn::before {
  content: "展开";
}
.exp {
  display: none;
}
.exp:checked + .text {
  -webkit-line-clamp: 999;
}
.exp:checked + .text::after {
  visibility: hidden;
}
.exp:checked + .text .btn::before {
  content: "收起";
}

.imgList {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 40px;
}

.imgItem {
  height: 80px;
  width: 80px;
  border-radius: 4px;
  margin-right: 8px;
  background: red;
}
</style>
