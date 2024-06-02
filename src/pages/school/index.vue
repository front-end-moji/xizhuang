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
          <text>{{ item.name }}</text>
        </template>
        <template v-slot:body></template>
        <template v-slot:footer>
          <uni-icons type="right" size="18" color="#444444"></uni-icons>
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
      const { name, id } = item;
      this.$store.dispatch("updateUser", { school: { name, id } });
      wx.navigateBack();
    },
  },
};
</script>

<style>
.current {
  padding: 20rpx;
}
</style>
