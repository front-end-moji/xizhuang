import Vuex from "vuex";


const store = new Vuex.Store({
	state:{//存放状态
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
			console.log('%c 🐙[ user ]-17', 'font-size:13px; background:#FFE599; color:#FFB570;', user)
			state.user = user;
		}
	},
	actions: {
		// // context 上下文对象，可以理解为store
		// updateUser(context, num) {
		// }
	},
})
export default store