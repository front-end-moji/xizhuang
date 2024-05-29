<template>
  <view class="postItem">
    <view class="postHeader">
      <!-- <view class="avatar">xxx</view> -->
      <avatar></avatar>
      <view class="info">
        <text class="name">Ohh.</text>
        <view class="detailInfo">
          <text class="date">14个小时前</text>
          <view class="position">
            <uni-icons type="location" size="16"></uni-icons>黑龙江大学</view
          >
        </view>
      </view>

      <view class="postTopic">其他话题</view>
    </view>
    <view class="textWrapper">
      <view class="text" id="xxx" :class="{ expand: needExpand & !hasExpand }">
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
        sfasdfasdfadsfasdfasdfadsfadsfasdfsdf
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
        asfasdfasdfadsfasdfasdfadsfadsfasdfsdf
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
  </view>
</template>

<script>
import { Avatar } from "../../components/avatar.vue";

export default {
  name: "postItem",
  data() {
    return {
      images: [
        "https://www.southernliving.com/thmb/FlPNHGSV-VVRaR3ZZCbkAi4Vn9k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/gettyimages-114166947-1-268128f97e5c415baede328c1fe32f55.jpg",
        "https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg",
        "https://i.pinimg.com/736x/54/36/95/54369563e20e94dcab5fc7f40cf7e8d6.jpg",
        "https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=lA8UuoHt",
      ],
      needExpand: false,
      hasExpand: false,
    };
  },
  components: { Avatar },
  onLoad: function (option) {},
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query
      .select("#xxx")
      .boundingClientRect((data) => {
        const { height } = data;
        if (!height) {
          return;
        }
        if (height > 60) {
          console.log(
            "%c [ 111 ]-54",
            "font-size:13px; background:pink; color:#bf2c9f;"
          );
          this.needExpand = true;
        }
      })
      .exec();
  },
  methods: {
    onTabClick(item) {
      this.activeTab = item;
    },
    onExpand() {
      this.hasExpand = !this.hasExpand;
    },
    previewImage(index) {
      console.log(
        "%c [ index ]-96",
        "font-size:13px; background:pink; color:#bf2c9f;",
        index
      );
      uni.previewImage({
        urls: this.images,
        current: this.images[index],
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
  padding: 16px 0;
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
  padding-left: 52px;
}

.expandBtn {
  background: #ccc;
  border-radius: 2px;
  margin-top: 4px;
  padding: 2px 0;
  width: 40px;
  text-align: center;
  margin-left: 52px;
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
  padding-left: 52px;
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
</style>
