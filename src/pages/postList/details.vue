<template>
  <view class="details-wrap">
    <view class="setTopWrap" v-if="isAuthor">
      <view v-if="setTopVisible" class="setTopContent">
        <view class="setTopDesc">当前学校置顶你的帖子，请选择时间：</view>
        <view class="paymentWrap">
          <view
            v-for="(item, index) in setTopPaymentList"
            :key="index"
            :class="{ active: selectedSetTop === item.id, paymentItem: true }"
            @click="selectSetTop(item.id)"
          >
            <view>
              <view> ￥{{ item.amount }} </view>
              <view> {{ item.duration }} 分钟 </view>
            </view>
          </view>
        </view>
        <view class="paymentBtnWrap">
          <button
            type="primary"
            @click="pay"
            size="mini"
            :disabled="payBtnDisabled"
          >
            支付
          </button>
        </view>
      </view>
      <view class="header">
        <view class="left" @click="toggleSetTopVisible">我要置顶</view>
        <text class="right">让更多人听到你的声音~</text>
      </view>
    </view>

    <view class="content-wrap">
      <post-item :isDetail="true" :topicList="topicList" :postInfo="postInfo" />
    </view>
    <view class="comment-list">
      <view class="comment-wrap" v-if="commentList.length > 0">
        <view class="comment-title">全部评论</view>

        <view class="comment-item" v-for="item in commentList" :key="item.id">
          <avatar
            :url="item.fromUser.avatar"
            :styleObj="{ width: '24px', height: '24px' }"
          ></avatar>
          <view class="user-info">
            <view class="header">
              <text class="comment-user">{{ item.fromUser.username }}</text>
              <text class="comment-date">{{
                getDateDiff(item.gmtCreate)
              }}</text>
            </view>

            <view class="content"> {{ item.content }} </view>
          </view>
        </view>
      </view>

      <view class="comment-empty-wrap" v-else>
        <text>暂无评论~</text>
      </view>
    </view>
    <view class="comment-btn-wrap">
      <uni-icons type="image" size="20" color="#f9d786"></uni-icons>
      <textarea
        class="commentTextarea"
        placeholder="请输入您的想法"
        rows="1"
        v-model="commentContent"
        maxlength="80"
      ></textarea>
      <view class="send-btn" @click="sendComment"> 发送 </view>
    </view>
  </view>
</template>

<script>
import { postItem } from "./postItem.vue";
import { getPostDetailById } from "@/api/post";
import { saveComment, getCommentList } from "@/api/comment";
import { Avatar } from "../../components/avatar.vue";
import { isEmpty } from "lodash";
import { getDateDiff } from "@/utils/index";
import { querySetTopPaymentList, getPayParams } from "@/api/post";

export default {
  data() {
    return {
      postInfo: null,
      commentContent: "",
      postId: "",
      commentList: [],
      setTopVisible: false,
      setTopPaymentList: [],
      selectedSetTop: undefined,
    };
  },
  computed: {
    isAuthor() {
      if (
        this.postInfo &&
        this.postInfo.authorId &&
        this.$store.state.user &&
        this.$store.state.user.id
      ) {
        return this.postInfo.authorId === this.$store.state.user.id;
      }
      return false;
    },
    payBtnDisabled() {
      return this.selectedSetTop === undefined;
    },
  },
  components: { postItem, Avatar },
  onLoad: function (option) {
    const id = JSON.parse(decodeURIComponent(option.id));
    this.postId = id;
    this.getPostDetail(id);
    this.getPageList();
    this.fetchSetTopPaymentList();
  },
  methods: {
    getPostDetail(id) {
      getPostDetailById({ id }).then(({ data, code }) => {
        if (code === 0) {
          this.postInfo = data;
        }
      });
    },
    getDateDiff,
    getPageList() {
      getCommentList({ postId: this.postId, limit: 10, page: 1 }).then(
        ({ code, data }) => {
          if (data && !isEmpty(data.list)) {
            this.commentList = data.list;
          }
        }
      );
    },
    sendComment() {
      const params = {
        postId: this.postId,
        content: this.commentContent,
      };
      saveComment(params).then(({ code, data }) => {
        uni.showToast({
          title: "发布成功",
        });
        this.getPageList();
        this.commentContent = "";
      });
    },
<<<<<<< HEAD
<<<<<<< HEAD
    selectSetTop(id) {
      this.selectedSetTop = id;
    },
    pay() {
      if (!this.postInfo || !this.selectedSetTop) {
        return;
      }

      getPayParams({
        postId: this.postInfo.id,
        topOptionId: this.selectedSetTop,
      }).then((res) => {
        console.log(
          "%c 🐙[ res ]-170",
          "font-size:13px; background:#FFE599; color:#FFB570;",
          res
        );
      });
    },
    toggleSetTopVisible() {
      this.setTopVisible = !this.setTopVisible;
    },
    fetchSetTopPaymentList() {
      querySetTopPaymentList().then((res) => {
        this.setTopPaymentList = res.data;
      });
    },
=======
    // 点赞
    likeComment() {},
>>>>>>> 4a6a16f (feat: 处理评论)
=======
    // 点赞
    likeComment() {},
>>>>>>> 4a6a16f (feat: 处理评论)
  },
};
</script>

<style scoped>
.details-wrap {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-wrap {
  background: white;
  padding: 0 16px;
  flex-shrink: 0;
}

.comment-list {
  margin-top: 18px;
  width: 100%;
  background: white;
  flex: 1;
  overflow: hidden;
}

.comment-wrap {
  padding: 12px;
  max-height: calc(100% - 60px);
  overflow-y: auto;
}

.comment-btn-wrap {
  background: white;
  height: 60px;
  width: 100vw;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 6px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.commentTextarea {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  height: 24px;
  font-size: 12px;
  line-height: 16px;
  margin: 0 6px;
  padding: 4px 6px 0 6px;
  box-sizing: border-box;
}

.send-btn {
  width: 80px;
  height: 26px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #d6feda;
}

.content-wrap {
  background: white;
  overflow: hidden;
}

.comment-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.comment-item {
  display: flex;
  box-sizing: border-box;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ccc;
}

.user-info {
  flex: 1;
  margin: 0 12px;
}

.header {
  display: flex;
  align-content: center;
  color: #ccc;
}

.comment-user {
  margin-right: 12px;
  font-size: 16px;
}

.comment-date {
  font-size: 14px;
}
.paymentWrap {
  display: flex;
  margin-top: 20rpx;
  color: #ccc;
  padding: 10rpx 18rpx;
}

.paymentItem {
  border-radius: 12rpx;
  border: 1px solid #ccc;
  color: #ccc;
  padding: 8rpx 18rpx;
  margin-right: 20rpx;
}

.setTopDesc {
  color: #ccc;
  padding: 10rpx 18rpx;
}

.active.paymentItem {
  color: #5dc588;
  border-color: #5dc588;
}

.header {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 16rpx;
}

.left {
  color: #5dc588;
}

.right {
  color: #ccc;
}

.paymentBtnWrap {
  float: right;
  margin-right: 10rpx;
  overflow: hidden;
}

.setTopContent {
  overflow: hidden;
}
</style>
