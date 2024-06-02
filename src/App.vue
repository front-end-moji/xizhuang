<script>
export default {
  onLaunch: function () {
    // console.log("App Launch");
    wx.getStorage({
      key: "isLogin",
    }).then((res) => {
      console.log(
        "%c 🐙[ res ]-10",
        "font-size:13px; background:#FFE599; color:#FFB570;",
        res
      );
      if (res.data) {
        this.$store.dispatch("login");
      }
    });
    console.log("App Show");
  },
  onShow: function () {
    // wx.getStorage({
    //   key: "isLogin",
    // }).then((res) => {
    //   console.log(
    //     "%c 🐙[ res ]-10",
    //     "font-size:13px; background:#FFE599; color:#FFB570;",
    //     res
    //   );
    //   if (res.data) {
    //     this.$store.dispatch("login");
    //   }
    // });
    // console.log("App Show");
  },
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
