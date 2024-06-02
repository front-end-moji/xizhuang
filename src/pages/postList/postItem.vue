<template>
  <view class="postItem">
    <view class="postHeader">
      <avatar></avatar>
      <view class="info">
        <text class="name">章鱼不太懒</text>
        <view class="detailInfo">
          <text class="date">14个小时前</text>
          <view class="position">
            <uni-icons type="location" size="16"></uni-icons>黑龙江大学</view
          >
        </view>
      </view>

      <view class="postTopic">其他话题</view>
    </view>

    <view class="post-content" :class="{ isDetail: isDetail }">
      <view class="textWrapper">
        <view
          class="text"
          id="xxx"
          :class="{ expand: needExpand & !hasExpand }"
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
          v-for="(item, index) in images.slice(0, 3)"
          :key="item"
        >
          <img
            class="img"
            :src="item"
            mode="widthFit"
            @tap="previewImage(index)"
          />
          <view class="mask" v-if="index === 2">+{{ images.length - 3 }}</view>
        </view>
      </view>

      <view class="actions">
        <view class="action-left">
          <text class="watching">8人围观</text>
        </view>
        <view class="action-btns">
          <uni-icons
            @click="navToPostDetail"
            type="redo"
            size="20"
            color="#111111"
          ></uni-icons>
          <uni-icons
            @click="navToPostDetail"
            type="chat"
            size="20"
            color="#111111"
            class="edit-icon"
          ></uni-icons>
          <uni-icons type="heart" size="20" color="#111111"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { nextTick } from "vue";
import { Avatar } from "../../components/avatar.vue";

export default {
  name: "PostItem",
  data() {
    return {
      images: [
        // "https://www.southernliving.com/thmb/FlPNHGSV-VVRaR3ZZCbkAi4Vn9k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/gettyimages-114166947-1-268128f97e5c415baede328c1fe32f55.jpg",
        // "https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg",
        // "https://i.pinimg.com/736x/54/36/95/54369563e20e94dcab5fc7f40cf7e8d6.jpg",
        // "https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=lA8UuoHt",
      ],
      needExpand: false,
      hasExpand: false,
      postContent: "",
    };
  },
  props: {
    contentStr: {
      default: "",
      type: String,
    },
    isDetail: {
      default: false,
      type: Boolean,
    },
  },
  components: { Avatar },
  onLoad: function (option) {},
  mounted() {
    console.log(this.content);
    if (this.contentStr) {
      const { text, media } = JSON.parse(this.content);
      console.log(
        "%c [ text ]-109",
        "font-size:13px; background:pink; color:#bf2c9f;",
        text
      );
      this.images = media;
      this.postContent = text;
    }

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
  updated() {
    console.log(
      "%c [  ]-137",
      "font-size:13px; background:pink; color:#bf2c9f;",
      22222
    );
  },
  methods: {
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
    navToPostDetail: () => {
      uni.navigateTo({
        url: "/pages/postList/details",
      });
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
  justify-content: space-between;
}

.imgItem {
  flex-shrink: 0;
  border-radius: 4px;
  width: 30%;
  height: 80px;
  overflow: hidden;
  position: relative;
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
</style>
