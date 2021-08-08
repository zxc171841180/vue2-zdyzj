import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history", // 去掉路由地址的#
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			hidden: true,
			redirect: "/index",
			component: () => import("@/views/layouts/BasicLayout"),
		}, // 懒加载
		{
			path: "/index",
			hidden: true,
			component: () => import("@/views/layouts/BasicLayout"),
		},
	],
});
export default router;
