<script>
export default {
  onLaunch: function () {
    // console.log("App Launch");
    // wx.getStorage({
    //   key: "isLogin",
    // }).then((res) => {
    //   if (res.data) {
    //     this.$store.dispatch("login");
    //   }
    // });
    // console.log("App Show");
    // uni.addInterceptor("navigateTo", {
    //   //监听跳转
    //   invoke(e) {
    //     console.log("******** invoke-navigateTo ********", e.url);
    //   },
    // });
    // //2
    // uni.addInterceptor("redirectTo", {
    //   //监听关闭本页面跳转
    //   invoke(e) {
    //     console.log("******** redirectTo ********", e.url);
    //   },
    // });
    /**
     * 3
     * 拦截uni.switchTab本身没有问题。
     * 但是在微信小程序端点击tabbar的底层逻辑并不是触发uni.switchTab。
     * 所以误认为拦截无效，此类场景的解决方案是在tabbar页面的页面生命周期onShow中处理。
     */
    uni.addInterceptor("switchTab", {
      //监听tabBar跳转
      // invoke(e) {
      //   console.log("******** switchTab ********", e.url);
      // },
    });
    //4
    uni.addInterceptor("navigateBack", {
      //监听返回
      // invoke(e) {
      //   console.log("******** navigateBack ********", e.url);
      // },
    });
  },
  onShow: function () {},
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
page {
  background-color: #f7f7f7;
}
</style>
