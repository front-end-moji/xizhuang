<template>
  <uni-list>
    <button
      open-type="chooseAvatar"
      class="button"
      @chooseavatar="onChooseAvatar"
    >
      <uni-list-item v-if="!$store.state.user.avatar" class="item">
        <template v-slot:header>
          <text>头像</text>
        </template>
        <template v-slot:body> </template>
        <template v-slot:footer>
          <view class="right">
            <view v-if="!$store.state.user.avatar" class="defaultAvatarWrap">
              <image class="defaultAvatar" src="/static/mine1.png"></image>
            </view>
            <view v-if="$store.state.user.avatar" class="avatarWrap">
              <image class="avatar" :src="$store.state.user.avatar"></image>
            </view>
            <uni-icons type="right" size="20" color="#aaaaaa"></uni-icons>
          </view>
        </template>
      </uni-list-item>
    </button>

    <uni-list-item class="item">
      <template v-slot:header>
        <text>昵称</text>
      </template>
      <template v-slot:body> </template>
      <template v-slot:footer>
        <view class="right">
          <input
            type="nickname"
            class="weui-input"
            placeholder="请输入昵称"
            :value="$store.state.user.name"
            @change="onChangeName"
          />
          <uni-icons type="right" size="20" color="#aaaaaa"></uni-icons>
        </view>
      </template>
    </uni-list-item>
  </uni-list>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      this.$store.dispatch("updateUser", { avatar: avatarUrl });
    },
    onChangeName(e) {
      const { value } = e.detail;
      console.log('%c 🐙[ value ]-61', 'font-size:13px; background:#FFE599; color:#FFB570;', value)
      this.$store.dispatch("updateUser", { name: value });
    },
  },
};
</script>

<style>
.button {
  width: 100%;
  padding: 0;
}

.defaultAvatar {
  width: 50rpx;
  height: 50rpx;
}

.item .uni-list-item__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.defaultAvatarWrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  border: 1px solid #ffcd36;
  background: #ffcd3644;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatarWrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
</style>
