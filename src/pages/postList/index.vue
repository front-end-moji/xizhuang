<template>
  <view class="wrap">
    <view class="header">
      <view
        v-for="item in topicList"
        :key="item.id"
        class="headerItem"
        :class="{ active: true }"
        @click="onTabClick(item)"
      >
        <view v-if="activeTab === item.id" class="headerItem active"
          ># {{ item.name }}</view
        >
        <view v-else class="headerItem"> {{ item.name }}</view>
      </view>
    </view>

    <view class="scrollWrap">
      <view class="scope">
        <view
          class="left"
          :class="{ active: viewRange === 'ONLY' }"
          @click="changeViewRange"
          >仅看本校</view
        >
        <view class="right">
          <text
            class="right-item"
            :class="{ active: item === viewType }"
            :key="item"
            v-for="item in viewTypes"
            @click="changeViewType(item)"
            >{{ item }}</text
          >
        </view>
      </view>

      <view class="uni-margin-wrap">
        <view class="recommend">推荐</view>
        <swiper
          class="swiper"
          circular
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          vertical
        >
          <swiper-item v-for="item in textList" :key="item">
            <view class="swiper-item">
              <view class="swiper-text">
                {{ item }}
              </view>
              <text>></text>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view class="postWrap">
        <view class="postContentWrap" v-if="postList.length > 0">
          <view class="item" v-for="item in postList" :key="item.id">
            <post-item
              :postInfo="item"
              :key="item.id"
              :deleteCb="fetchPostList"
              :topicList="topicList"
              :isDetail="false"
            ></post-item>
          </view>
        </view>
        <view class="empty-post" v-else> 暂无热帖，抢占沙发啦~ </view>
      </view>
    </view>

    <view class="footer">
      <view class="newPost" @click="this.navToCreatePost">
        <uni-icons type="plusempty" size="20" color="#ffffff"></uni-icons>
        <text class="publish-text">我要发布</text>
      </view>
    </view>
  </view>
</template>

<script lang="js">
import postItem from "./postItem.vue";
import { getPostList, getPostTopicList } from "@/api/post";
import { isEmpty } from 'lodash'

export default {
  data() {
    return {
      viewTypes: ['最新', '热门'],
      activeTab: '',
      viewRange: 'ALL', // ALL or ONLY
      viewType: '最新', // LATEST or HOT
      background: ['color1', 'color2', 'color3'],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      // FIXME: 需要更换
      textList: [
        '喜欢上别人的女朋友怎么办？',
        '如果你对象变成一只蟑螂，你会怎么办',
        '投稿',
        '冒泡',
      ],
      postList: [],
      topicList: []
    };
  },
  components: {postItem},
  onLoad: function (option) {
    this.fetchPostTopicList()
  },
  computed: {
  },
  methods: {
    onTabClick(item) {
      if (this.activeTab === item.id) {
        return
      }
      this.activeTab = item.id;
      this.fetchPostList({ topic: item.id })
    },
    navToCreatePost: () => {
      uni.navigateTo({
        url: "/pages/postList/createPost",
      });
    },
    changeViewRange() {
      this.viewRange = this.viewRange === 'ALL' ? 'ONLY' : 'ALL'
      this.fetchPostList()
    },
    changeViewType(viewType) {
      if (this.viewType === viewType) {
        return
      }
      this.viewType = viewType
      this.fetchPostList({ isSearchLatestPost: viewType === '最新' ? 1 : 0})
    },
    fetchPostList(params) {
      const { school } = this.$store.state.user
      let paramsObj = {
        isSearchLatestPost: this.viewType === '最新' ? 1 : 0,
        limit: 10,
        page: 1,
        topic: this.activeTab,
        visibility: school.id,
        ...params
      }
      if (this.viewRange === 'ALL') {
        delete paramsObj.visibility
      }
      getPostList(paramsObj)
        .then(({ data, code }) => {
          if (code === 0) {
            const { list } = data;
            this.postList = list
          }
        })
        .catch((error) => {});
    },
    fetchPostTopicList() {
      getPostTopicList().then(({ code, data }) => {
        if (code === 0) {
          this.topicList = data.list
          if (!isEmpty(data.list)) {
            const firstTopic = data.list[0].id;
            this.activeTab = firstTopic;
            this.fetchPostList({ topic: firstTopic })
          }
        }
      })
    }
  },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  display: flex;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background: white;
  flex-direction: column;
}

.header {
  display: flex;
  width: 100%;
  overflow-x: auto;
  height: 40px;
  align-items: center;
  padding: 0 12px;
}

.headerItem {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 0 4px;
  color: #ccc;
}

.headerItem.active {
  color: #5dc588;
}

.scrollWrap {
  height: calc(100vh - 30px - 52px);
  overflow-y: auto;
  padding: 0 12px;
  box-sizing: border-box;
}

.left {
  border: 1px solid #ccc;
  padding: 2px 4px;
}

.right {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.right-item {
  padding: 2px 6px;
}

.right-item.active {
  background: #5dc588;
  color: white;
}

.left.active {
  background: #5dc588;
  color: white;
}

.postContentWrap {
}

.scope {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  height: 30px;
  align-items: center;
}

.footer {
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
}

.uni-margin-wrap {
  width: 100%;
  display: flex;
  margin-top: 8px;
  background: #fcf1e9;
  box-sizing: border-box;
  border-radius: 2px;
}
.recommend {
  width: 30px;
  font-size: 12px;
  padding-left: 8px;
  height: 24px;
  line-height: 24px;
}
.swiper {
  height: 24px;
  width: calc(100% - 30px);
}
.swiper-item {
  font-size: 12px;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.swiper-text {
  display: block;
  word-break: keep-all;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 20px);
}

.newPost {
  background: #5dc588;
  border: 1px solid #ccc;
  padding: 4px 6px;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-top: -50px;
  position: relative;
}

.publish-text {
  position: absolute;
  bottom: -20px;
  width: 50px;
  text-align: center;
  left: calc(50% - 25px);
  font-size: 12px;
  color: black;
}

.empty-post {
  font-size: 12px;
  color: #ccc;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
