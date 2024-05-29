import {
	createSSRApp
} from "vue";
import store from './store'
console.log('%c 🐙[ store ]-5', 'font-size:13px; background:#FFE599; color:#FFB570;', store,111)

Vue.prototype.$store = store
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
