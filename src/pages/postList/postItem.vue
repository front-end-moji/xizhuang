<template>
  <view class="postItem">
    <view class="postHeader">
      <view>
        <view @click="go2historyPost">
          <avatar :url="userInfo.avatar || ''"></avatar>
        </view>

        <img v-if="isTop" src="/static/top.png" class="top" />
      </view>

      <view class="info">
        <text class="name">{{ userInfo.username }}</text>
        <view class="detailInfo">
          <text class="date">{{ timeDiff }}</text>
          <view
            class="position"
            :style="
              postInfo && postInfo.isAnonymous ? { display: 'none' } : null
            "
          >
            <uni-icons type="location" size="16"></uni-icons
            >{{ schoolInfo.name }}</view
          >
        </view>
      </view>

      <view v-if="topicText" class="postTopic">{{ topicText }}</view>
    </view>

    <view class="post-content" :class="{ isDetail: isDetail }">
      <view class="textWrapper">
        <view
          class="text"
          id="xxx"
          :class="{ expand: needExpand & !hasExpand }"
          @click="navToPostDetail"
        >
          {{ postContent }}
        </view>
      </view>

      <view class="expandBtn" v-if="needExpand" @click="onExpand"
        >{{ hasExpand ? "收起" : "展开" }}
      </view>

      <view class="imgList">
        <view
          class="imgItem"
          v-for="(item, index) in isDetail ? images : images.slice(0, 3)"
          :key="item"
        >
          <video v-if="isVideo(item)" class="img" :src="item"></video>
          <img
            v-else
            class="img"
            :src="item"
            mode="widthFit"
            @tap="previewImage(index)"
          />
          <view
            class="mask"
            v-if="index === 2 && images.length > 3 && !isDetail"
            >+{{ images.length - 3 }}</view
          >
        </view>
      </view>

      <view class="actions">
        <view class="action-left">
          <text
            @click="subscribe(postInfo ? postInfo.isSubscribe : null)"
            class="watching"
            >{{ postInfo && postInfo.isSubscribe ? "取消订阅" : "订阅" }}</text
          >
        </view>
        <view class="action-btns">
          <button class="shareBtn">
            <uni-icons type="eye" size="20" color="#111111"></uni-icons>
          </button>
          <view class="count">({{ pageViewNum }})</view>
          <button
            class="shareBtn"
            v-if="
              isDetail && postInfo && postInfo.authorId === $store.state.user.id
            "
            @click="fetchDeletePost"
          >
            <uni-icons
              type="trash"
              size="20"
              color="#111111"
              class="edit-icon"
            ></uni-icons>
          </button>

          <button open-type="share" class="shareBtn" v-if="isDetail">
            <uni-icons type="redo" size="20" color="#111111"></uni-icons>
          </button>

          <button class="shareBtn" v-if="!isDetail" @click="navToPostDetail">
            <uni-icons
              type="chat"
              size="20"
              color="#111111"
              class="edit-icon"
            ></uni-icons>
          </button>
          <view class="count" v-if="!isDetail">({{ repliesNum }})</view>

          <button class="shareBtn" @click="onLickClick(postInfo.isLike)">
            <uni-icons
              :type="postInfo && postInfo.isLike ? 'heart-filled' : 'heart'"
              size="20"
              :color="postInfo && postInfo.isLike ? '#f6aeab' : '#111111'"
            ></uni-icons>
          </button>
          <view class="count" v-if="!isDetail">({{ likeNum }})</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { Avatar } from "../../components/avatar.vue";
import {
  deletePost,
  likePost,
  unlikePost,
  subscribePost,
  unsubscribePost,
} from "@/api/post";
import { find, cloneDeep } from "lodash";
import { getDateDiff, getPostContentInfo } from "@/utils/index";

export default {
  name: "PostItem",
  data() {
    return {
      images: [],
      needExpand: false,
      hasExpand: false,
      postContent: "",
      userInfo: {},
      schoolInfo: {},
      timeDiff: "",
    };
  },
  props: {
    postInfo: {
      default: {},
      type: Object,
    },
    topicList: {
      default: [],
      type: Array,
    },
    isDetail: {
      default: false,
      type: Boolean,
    },
    updateList: {
      default: () => {},
      type: Function,
    },
  },
  computed: {
    topicText() {
      return find(this.topicList, { id: this.postInfo?.topic })?.name || "";
    },
    isTop() {
      return this.postInfo && this.postInfo.isTop;
    },
    repliesNum() {
      if (this.postInfo) {
        if (this.postInfo.repliesCount) {
          return this.postInfo.repliesCount;
        }
      }
      return 0;
    },
    pageViewNum() {
      if (this.postInfo) {
        if (this.postInfo.pageViewNum) {
          return this.postInfo.pageViewNum;
        }
      }
      return 0;
    },
    likeNum() {
      if (this.postInfo) {
        if (this.postInfo.likeNum) {
          return this.postInfo.likeNum;
        }
      }
      return 0;
    },
  },
  components: { Avatar },
  onLoad: function (option) {},
  watch: {
    postInfo(newVal) {
      this.initInfo(newVal);
    },
  },
  mounted() {
    if (this.postInfo) {
      this.initInfo(this.postInfo);
    }
    this.calcIsExpand();
  },
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
    initInfo(data) {
      this.userInfo = data.user;
      this.schoolInfo = data.school;
      this.timeDiff = getDateDiff(data.gmtCreate);
      const { text, images } = getPostContentInfo(data.content);
      this.images = images;
      this.postContent = text;
    },
    calcIsExpand() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#xxx")
        .boundingClientRect((data) => {
          const { height } = data;
          if (!height) {
            return;
          }
          if (height > 60) {
            this.needExpand = true;
          }
        })
        .exec();
    },
    fetchDeletePost() {
      uni.showModal({
        content: "是否确定删除该帖子",
        success: ({ confirm }) => {
          if (confirm) {
            deletePost(this.postInfo.id).then(({ code, data }) => {
              if (code === 0) {
                uni.showToast({
                  title: "删除成功",
                });
                uni.navigateTo({
                  url: "/pages/postList/index",
                });
              }
            });
          }
        },
      });
    },
    onTabClick(item) {
      this.activeTab = item;
    },
    onExpand() {
      this.hasExpand = !this.hasExpand;
    },
    previewImage(index) {
      uni.previewImage({
        urls: this.images,
        current: this.images[index],
      });
    },
    navToPostDetail() {
      uni.navigateTo({
        url: `/pages/postList/details?id=${this.postInfo.id}`,
      });
    },
    onLickClick(isLike) {
      const newPostInfo = cloneDeep(this.postInfo);
      if (!isLike) {
        likePost({ postId: this.postInfo.id, type: 0 })
          .then(({ code, data }) => {
            if (code === 0) {
              // this.updateList();
              newPostInfo.isLike = true;
              if (!newPostInfo.likeNum) {
                newPostInfo.likeNum = 1;
              } else {
                newPostInfo.likeNum = Number(newPostInfo.likeNum) + 1;
              }
              this.updateList(newPostInfo);
            }
          })
          .catch((error) => {});
      } else {
        // 取消点赞
        unlikePost({ postId: this.postInfo.id, type: 1 }).then(
          ({ code, data }) => {
            if (code === 0) {
              newPostInfo.likeNum = Number(newPostInfo.likeNum) - 1;
              newPostInfo.isLike = false;
              this.updateList(newPostInfo);
            }
          }
        );
      }
    },
    subscribe(isSubscribe) {
      const newPostInfo = cloneDeep(this.postInfo);
      if (!isSubscribe) {
        subscribePost({ postId: this.postInfo.id }).then(({ code, data }) => {
          if (code === 0) {
            newPostInfo.isSubscribe = true;
            this.updateList(newPostInfo);
          }
        });
      } else {
        // 取消点赞
        unsubscribePost(this.postInfo.id).then(({ code, data }) => {
          if (code === 0) {
            newPostInfo.isSubscribe = false;
            this.updateList(newPostInfo);
          }
        });
      }
    },
    go2historyPost() {
      console.warn(111);
      if (this.postInfo.isAnonymous) {
        return;
      }
      if (this.postInfo.authorId === this.$store.state.user.id) {
        uni.navigateTo({
          url: "/pages/myPost/index?type=myPost",
        });
      } else {
        uni.navigateTo({
          url: `/pages/myPost/index?type=author&authorId=${this.postInfo.authorId}`,
        });
      }
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
  padding: 12px 0;
}

.postHeader {
  display: flex;
  position: relative;
}

.postTopic {
  position: absolute;
  right: 0;
  top: 12px;
  color: #5dc588;
  background: #eee;
  padding: 2px 12px;
  border-radius: 10px;
}

.info {
  margin-left: 8px;
}

.detailInfo {
  display: flex;
  align-items: center;
  margin-top: 2px;
}

.watching {
  color: #5dc583;
}

.name {
  font-size: 14px;
  font-weight: 600;
}

.date,
.position {
  margin-right: 12px;
  color: #ccc;
}

.post-content {
  padding-left: 52px;
}

.post-content.isDetail {
  padding-left: 0px;
}

.post-content.isDetail .textWrapper {
  margin-top: 12px;
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
}

.expandBtn {
  background: #ccc;
  border-radius: 2px;
  margin-top: 4px;
  padding: 2px 0;
  width: 40px;
  text-align: center;
  color: #5dc588;
}

.text {
  font-size: 14px;
  text-overflow: ellipsis;
  text-align: justify;
  position: relative;
}

.text.expand {
  display: flex;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.imgList {
  display: flex;
  align-items: center;
  margin-top: 8px;
  overflow-x: hidden;
  flex-wrap: wrap;
}

.imgItem {
  flex-shrink: 0;
  border-radius: 4px;
  width: calc(33% - 3px);
  height: 80px;
  overflow: hidden;
  position: relative;
  margin-right: 3px;
  margin-bottom: 6px;
}
.imgItem .img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14;
}

.actions {
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #ccc;
}

.edit-icon {
  margin: 0 6px;
}

.shareBtn {
  background-color: transparent;
  border: none;
  padding: 0;
  height: 40rpx;
  display: flex;
  align-items: center;
  width: 24px;
  justify-content: center;
  margin: 0;
}

.shareBtn::after {
  border: none;
}

.top {
  width: 80rpx;
  height: 80rpx;
  position: absolute;
  top: 60rpx;
}

.action-btns {
  display: flex;
  width: 300rpx;
  justify-content: flex-end;
}

.count {
  display: flex;
  align-items: center;
}
</style>
