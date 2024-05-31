import {
	createSSRApp,
	prototype,
} from "vue";
import App from "./App.vue";
import store from "./store";

export function createApp() {
	const app = createSSRApp(App);
	app.use(store);
	return {
		...store,
		app,
	};
}
