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
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }) {
      wx.login().then((res) => {
        wechatLogin(res.code).then((res) => {
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
        });
      });
    },

		updateUser({ commit }, user) {
			const { avatar, name, school, mobile } = user;
			updateUser({ avatar, name, school, mobile }).then((res) => {
				console.log('%c 🐙[ res ]-46', 'font-size:13px; background:#FFE599; color:#FFB570;', res)
				const { code } = res;
				if (code === 0) {}
			});
		},
  },
});
export default store;
