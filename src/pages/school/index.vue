<template>
  <view class="current">
    <uni-icons type="location-filled" size="18" color="#444444"></uni-icons>
    <text v-if="!$store.state.user || !$store.state.user.school"
      >暂未绑定学校</text
    >
    <text v-else>{{ $store.state.user.school.name }}</text>
  </view>
  <uni-list>
    <view
      v-for="item in schoolList"
      v-bind:key="item.id"
      @click="updateSchool(item)"
    >
      <uni-list-item class="item">
        <template v-slot:header>
          <view class="wrap">
            <image :src="item.logo" class="logo" />
            <text>{{ item.name }}</text>
          </view>
        </template>
        <template v-slot:body></template>
        <template v-slot:footer>
          <view class="wrap">
            <uni-icons type="right" size="18" color="#444444"></uni-icons>
          </view>
        </template>
      </uni-list-item>
    </view>
  </uni-list>
</template>

<script>
import { getSchoolList } from "@/api/school";
export default {
  data() {
    return {
      schoolList: [],
    };
  },
  onLoad() {
    getSchoolList().then((res) => {
      this.schoolList = res.data;
    });
  },
  methods: {
    updateSchool(item) {
      if (!this.$store.state.user) {
        uni.showToast({
          title: "请先登录",
        });
      } else if (!this.$store.state.user.school) {
        const { name, id } = item;
        this.$store.dispatch("updateUser", { school: { name, id } });
        wx.navigateBack();
      } else {
        uni.showToast({
          title: "已绑定学校",
        });
      }
    },
  },
};
</script>

<style>
.current {
  padding: 20rpx;
}
.logo {
  width: 100rpx;
  height: 100rpx;
  margin-right: 40rpx;
}
.wrap {
  display: flex;
  align-items: center;
}
</style>
