<template>
  <view class="content">
    <view class="mainContent">
      <view class="firstPage">
        <view class="logo">
          <img src="/static/logo.jpg" alt="" class="logoImg"
        /></view>
        <avatar></avatar>
        <view class="mainTitle"> 超级活动大放送 </view>
        <view class="secondTitle"> 多重好礼享不停 </view>

        <view class="promotions">
          <view class="promotionItem promotionItem-1"> 定金好礼 </view>
          <view class="promotionItem promotionItem-2"> 推荐有礼 </view>
          <view class="promotionItem promotionItem-3"> 转发点赞 </view>
        </view>
      </view>

      <view class="submitTimeCount">
        <view class="submitTi"> -- 报名结束倒计时 --</view>
      </view>

      <view class="secondPage">
        <view class="title">一：99元定金好礼</view>
        <view class="partOne">
          <view class="line"> 1、价值 1680元定制衬衣 </view>
          <view class="line"> 2、价值 1280 元定制皮鞋 </view>
          <view class="line"> 3、价值 980 元配饰礼盒 </view>
          <view class="line"> 4、价值 2000 元 VICHI 消费卡 </view>
          <view class="line"> 5、价值 580 元 VICHI BAR 酒水券 </view>
        </view>
      </view>

      <view class="thirdPage">
        <view class="title">二：推荐有礼</view>
        <view class="partOne">
          <view class="line"> 1、推荐3人，赠送价值 1680 元定制衬衣 </view>
          <view class="line"> 2、推荐5人，赠送价值 2000 元VICHI消费卡 </view>
        </view>
      </view>

      <view class="fourthPage">
        <view class="title">三：转发点赞</view>
        <view class="partOne">
          <view class="line"> 1、点赞58位，赠送价值580元 ViCHI 酒水券 </view>
          <view class="line"> 2、点赞88位，赠送价值2000元 VICHI 消费卡 </view>
        </view>
      </view>
    </view>

    <view class="register">
      <view class="iconWrap">
        <uni-icons type="chat" size="24"></uni-icons>
        客服
      </view>

      <view class="iconWrap">
        <uni-icons type="medal" size="24"></uni-icons>
        海报
      </view>

      <view class="submitBtn">
        <view class="light commonText">
          <view></view>
          <view></view>
          <view></view>
          <view></view>
          免费报名领取
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import * as Avatar from "../../components/avatar.vue";

export default {
  data() {
    return {
      recommendList: [1, 2, 3],
    };
  },
  components: { Avatar },
  onLoad() {},
  methods: {},
};
</script>

<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  color: white;
}

.mainContent {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.firstPage {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background: black;
}

.logo {
  font-size: 50px;
  margin-bottom: 30px;
  color: rgb(202, 110, 40);
}

.logoImg {
  width: 260px;
}

.mainTitle {
  font-size: 30px;
  margin-bottom: 30px;
  margin-bottom: 30px;
}

.promotions {
  display: flex;
  margin-top: 30px;
}

.submitTimeCount {
  height: 400px;
  background: white;
}

.promotionItem {
  display: inline-block;
  margin: 20px;
  color: #fff;
  line-height: 1.4em;
  letter-spacing: 0.15em;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
  padding: 10px;
  border: 0.18em solid transparent;
  background: #2b2f3c;
  border-radius: 3.5em;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-align: center;
}

.promotionItem:before {
  content: "";
  display: block;
  border-radius: 3.5em;
  position: absolute;
  background: inherit;
  top: 0.2em;
  left: 0.2em;
  right: 0.2em;
  bottom: 0.2em;
  z-index: -1;
}

.promotionItem:after {
  content: "";
  display: block;
  /* //border-radius: 3.5em; */
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  transform: rotate(0deg);
  animation: gradient 2s ease alternate infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.promotionItem-1:after {
  background: rgb(51, 203, 235);
  background: -moz-linear-gradient(
    left,
    rgba(51, 203, 235, 1) 0%,
    rgba(40, 214, 98, 1) 30%,
    rgba(240, 119, 57, 1) 70%,
    rgba(227, 54, 107, 1) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(51, 203, 235, 1) 0%,
    rgba(40, 214, 98, 1) 30%,
    rgba(240, 119, 57, 1) 70%,
    rgba(227, 54, 107, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(51, 203, 235, 1) 0%,
    rgba(40, 214, 98, 1) 30%,
    rgba(240, 119, 57, 1) 70%,
    rgba(227, 54, 107, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33cbeb', endColorstr='#e3366b',GradientType=1 );
  background-size: 300% 300%;
}

.promotionItem-2:after {
  background: rgb(96, 134, 193);
  background: -moz-linear-gradient(
    45deg,
    rgba(96, 134, 193, 1) 0%,
    rgba(239, 224, 151, 1) 70%,
    rgba(214, 100, 102, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left bottom,
    right top,
    color-stop(0%, rgba(96, 134, 193, 1)),
    color-stop(70%, rgba(239, 224, 151, 1)),
    color-stop(100%, rgba(214, 100, 102, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(96, 134, 193, 1) 0%,
    rgba(239, 224, 151, 1) 70%,
    rgba(214, 100, 102, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(96, 134, 193, 1) 0%,
    rgba(239, 224, 151, 1) 70%,
    rgba(214, 100, 102, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(96, 134, 193, 1) 0%,
    rgba(239, 224, 151, 1) 70%,
    rgba(214, 100, 102, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(96, 134, 193, 1) 0%,
    rgba(239, 224, 151, 1) 70%,
    rgba(214, 100, 102, 1) 100%
  );
  background-size: 300% 300%;
}

.promotionItem-3:after {
  background: rgb(230, 54, 196);
  background: -moz-linear-gradient(
    left,
    rgba(230, 54, 196, 1) 0%,
    rgba(63, 206, 165, 1) 48%,
    rgba(80, 64, 139, 1) 96%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(230, 54, 196, 1) 0%,
    rgba(63, 206, 165, 1) 48%,
    rgba(80, 64, 139, 1) 96%
  );
  background: linear-gradient(
    to right,
    rgba(230, 54, 196, 1) 0%,
    rgba(63, 206, 165, 1) 48%,
    rgba(80, 64, 139, 1) 96%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e636c4', endColorstr='#50408b',GradientType=1 );
  background-size: 300% 300%;
}

.title {
  font-size: 40px;
  margin-bottom: 20px;
}

.line {
  margin-bottom: 12px;
}

.secondPage,
.thirdPage,
.fourthPage {
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
  background: black;
}

.fourthPage {
  padding-bottom: 64px;
}

.register {
  position: fixed;
  bottom: 0;
  height: 64px;
  width: 100%;
  background: white;
  display: flex;
  padding: 14px 8px;
  box-sizing: border-box;
}

.iconWrap {
  width: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #111;
  font-size: 12px;
  margin-right: 12px;
}

.submitBtn {
  flex: 1;
  height: 100%;
}

.commonText {
  text-transform: uppercase;
  font-size: 16px !important;
}

@media screen and (max-width: 600px) {
  .commonText {
    text-transform: uppercase;
    font-size: 12px !important;
  }
}

.light {
  position: relative;
  color: rgb(202, 110, 40);
  transition: 0.5s;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
}
.light:hover {
  background-color: rgb(202, 110, 40);
  color: white;
  box-shadow: 0 0 5px rgb(202, 110, 40), 0 0 25px rgb(202, 110, 40),
    0 0 50px #03e9f4, 0 0 200px rgb(202, 110, 40);
}
.light view {
  position: absolute;
}
.light view:nth-child(1) {
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
  background: linear-gradient(to right, transparent, rgb(202, 110, 40));
  animation: animate1 1s linear infinite;
}
.light view:nth-child(2) {
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
  background: linear-gradient(to bottom, transparent, rgb(202, 110, 40));
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}
.light view:nth-child(3) {
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
  background: linear-gradient(to left, transparent, rgb(202, 110, 40));
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}
.light view:nth-child(4) {
  width: 2px;
  height: 100%;
  bottom: -100%;
  left: 0;
  background: linear-gradient(to top, transparent, rgb(202, 110, 40));
  animation: animate4 1s linear infinite;
  animation-delay: 0.75s;
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

.loadingBtn {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(202, 110, 40);
  border-radius: 2px;
}

/* HTML: <view class="loader"></view> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: "od";
  font-size: 20px;
  background: radial-gradient(circle closest-side, #000 94%, #0000)
    right/calc(200% - 1em) 100%;
  animation: l24 1s infinite alternate linear;
}
.loader::before {
  content: "Claiming...";
  line-height: 1em;
  color: #0000;
  background: inherit;
  background-image: radial-gradient(circle closest-side, #fff 94%, #000);
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes l24 {
  100% {
    background-position: left;
  }
}
</style>
