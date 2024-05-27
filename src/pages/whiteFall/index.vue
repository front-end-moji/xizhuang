<template>
  <view class="content">
    <view class="uni-form-item uni-column">
      <view class="title">我的</view>
      <input class="uni-input" focus placeholder="自动获得焦点" />
    </view>

    <view class="page-body">
      <view class="btn-area">
        <navigator url="/pages/home/index" hover-class="navigator-hover">
          <button type="default">首页</button>
        </navigator>
        <navigator
          url="/pages/whiteFall/index"
          open-type="redirect"
          hover-class="other-navigator-hover"
        >
          <button type="default">表白墙</button>
        </navigator>
        <navigator
          url="pages/settings/index"
          open-type="redirect"
          hover-class="other-navigator-hover"
        >
          <button type="default">我的</button>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello11233321111",
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  border: 1px solid red;
}
</style>
