<template>
  <view class="light commonText">
    <view></view>
    <view></view>
    <view></view>
    <view></view>
    xxxx
  </view>
</template>

<script>
export default {
  name: "Buttonaaa",
  data() {
    return {};
  },
  props: {},
};
</script>

<style scoped>
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
}
.light:hover {
  background-color: rgb(202, 110, 40);
  color: white;
  box-shadow: 0 0 5px rgb(202, 110, 40), 0 0 25px rgb(202, 110, 40),
    0 0 50px #03e9f4, 0 0 200px rgb(202, 110, 40);
}
.light div {
  position: absolute;
}
.light div:nth-child(1) {
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
  background: linear-gradient(to right, transparent, rgb(202, 110, 40));
  animation: animate1 1s linear infinite;
}
.light div:nth-child(2) {
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
  background: linear-gradient(to bottom, transparent, rgb(202, 110, 40));
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}
.light div:nth-child(3) {
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
  background: linear-gradient(to left, transparent, rgb(202, 110, 40));
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}
.light div:nth-child(4) {
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

/* HTML: <div class="loader"></div> */
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
