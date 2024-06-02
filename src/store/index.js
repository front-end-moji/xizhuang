import Vuex from "vuex";
import { wechatLogin, updateUser } from "@/api/mine";

const store = new Vuex.Store({
  state: {
    //存放状态
    token: null,
    user: null,
    // user: {
    // 	avatar: null,
    // 	name: null,
    // 	school: null,
    // 	mobile: null,
    // }
  },
  mutations: {
    setUser(state, user) {
      if (user) {
        state.user = {
          ...state.user,
          ...user,
        };
      } else {
        state.user = user;
      }
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }) {
      wx.login()
        .then((res) => {
          wechatLogin(res.code)
            .then((res) => {
              const { code } = res;
              if (code === 0) {
                const { user, token } = res.data;
                commit("setUser", user);
                commit("setToken", token);
                wx.setStorage({
                  key: "isLogin",
                  data: true,
                });
                wx.navigateBack();
              }
            })
            .catch((err) => {
              wx.showToast({
                title: JSON.stringify(err),
              });
            });
        })
        .catch((err) => {
          wx.showToast({
            title: '2' + JSON.stringify(err),
          });
        });
    },

    updateUser({ commit }, user) {
      const { avatar, name, school, mobile } = user;
      updateUser({
        avatar,
        name,
        mobile,
        school: school ? school.id : undefined,
      }).then((res) => {
        const { code } = res;
        if (code === 0) {
          commit("setUser", user);
        }
      });
    },
  },
});
export default store;
