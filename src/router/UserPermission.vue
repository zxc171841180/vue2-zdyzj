<script type="text/javascript">
	import axios from "axios";
	import router from "./index";
	import Vue from "vue";
	//vuex
	import store from "@/store/index"; // 引入store
	import menuList from "./menuList.json";
	//自动给同一个vue项目的所有请求添加请求头
	axios.interceptors.request.use(function(config) {
		let token = localStorage.getItem("authorization");
		if (token) {
			config.headers["Authorization"] = token;
		}
		return config;
	});
	//拦截器
	axios.interceptors.response.use(
		(response) => {
			if (response.headers.authorization) {
				localStorage.setItem("authorization", response.headers.authorization);
			}
			return response;
		},
		(error) => {
			if (error.response) {
				let prefix = "qt";
				//历史路径
				let historyPath = router.history.current.path;
				switch (error.response.status) {
					case 401:
						// 返回 401 清除token信息并跳转到登录页面
						//清空缓存
						localStorage.clear();
						//跳转登录检测页面
						router.replace({
							path: "*",
						});
						break;
					case 403:
						router.replace({
							path: prefix + "/403",
						});
						break;
					case 404:
						router.replace({
							path: prefix + "/404",
						});
						break;
					case 500:
						router.replace({
							path: prefix + "/500",
						});
						break;
					// location.reload()
				}
			}
			return Promise.reject(error.response.data); // 返回接口返回的错误信息
		}
	);

	//路由拦截beforeEach 当路由开始跳转时
	router.beforeEach((to, from, next) => {
		// console.log(router);
		// console.log(to);
		// console.log(from);
		if (from.path == "/") {
			//全局刷新
			if (localStorage.getItem("authorization") != undefined) {
				//已经登录
			}
			setTimeout(() => {
				//这里获取权限路由必须异步执行
				//获取资源
				getUserPermission(to.path, from.path);
			}, 0);
		}
		next();
	});

	//当路由跳转结束后
	router.afterEach(() => {});

	const _import = (file) => () => import(`@/${file}`);
	function getUserPermission(toPath, fromPath, routeQuery) {
		var routes = transformTozTreeFormat(JSON.parse(JSON.stringify(menuList)));
		//添加routerPath和resourcePidCode 属性
		//================//
		let list = routes;
		for (let i in list) {
			if (list[i].resourcePid == null && list[i].children != undefined && list[i].children.length > 0) {
				const dataMap = (items, routerPath, resourcePidCode) => {
					items.find((item) => {
						let routerPath2 = routerPath + "/" + item.path;
						item.routerPath = routerPath2;
						item.meta.routerPath = routerPath2;
						let resourcePidCode2 = resourcePidCode + "," + item.resourceId;
						item.resourcePidCode = resourcePidCode2;
						item.meta.resourcePidCode = resourcePidCode2;
						if (item.children != undefined && item.children.length > 0) {
							dataMap(item.children, routerPath2, resourcePidCode2);
						}
					});
				};
				list[i].routerPath = list[i].path;
				list[i].resourcePidCode = list[i].resourceId;
				list[i].meta.routerPath = list[i].path;
				list[i].meta.resourcePidCode = list[i].resourceId;
				dataMap(list[i].children, list[i].routerPath, list[i].resourcePidCode);
			} else {
				list[i].routerPath = list[i].path;
				list[i].resourcePidCode = list[i].resourceId;
				list[i].meta.routerPath = list[i].path;
				list[i].meta.resourcePidCode = list[i].resourceId;
			}
		}
		routes = list;
		localStorage.setItem("date", Date.now());
		var menu = JSON.parse(JSON.stringify(routes));
		localStorage.setItem("menu", JSON.stringify(menu));
		var routestemp = [];
		routestemp.push({ path: "/", hidden: true, redirect: "/index/menu", component: () => import("@/views/layouts/BasicLayout") });
		//后台资源
		var redirect = "/index/menu";
		routestemp.push({
			path: "/index",
			//重定向
			redirect: redirect,
			component: () => import("@/views/layouts/BasicLayout"),
			hidden: true,
			children: routes,
			meta: {
				resourceId: "1111111111",
				resourceName: "首页",
				resourcePath: "ht",
				resourceIcon: "home",
				resourceType: "1",
			},
		});
		routestemp.push({ path: "*", component: () => import("@/views/layouts/BasicLayout") });
		routestemp.push({ path: "", redirect: "" });
		// //动态添加路由
		router.options.routes = routestemp;
		router.addRoutes(router.options.routes);
		// console.log(router);
		// console.log(toPath, fromPath);
		// 在这里就可以打印出新路由
		if (fromPath == "/") {
			//全局刷新
			return;
		}
		routeQuery = routeQuery == undefined ? {} : routeQuery;
		//跳转页面
		router.push({ path: toPath, query: routeQuery }, () => {});
	}

	function transformTozTreeFormat(sNodes) {
		// var redirect = null;
		var i,
			l,
			key = "resourceId",
			parentKey = "resourcePid",
			childKey = "children";
		if (!key || key == "" || !sNodes) return [];

		if (Object.prototype.toString.apply(sNodes) === "[object Array]") {
			var r = [];
			var tmpMap = [];
			var resourcePath = null; //当前path
			var resourcePath1 = null; //上一次循环path
			for (i = 0, l = sNodes.length; i < l; i++) {
				if (sNodes[i].resourceState === "2") {
					//停用
					sNodes[i] = {
						path: sNodes[i].resourcePath,
						pathcode: sNodes[i].resourcePath,
						// component: _import(sNodes[i].resourceUrl),
						resourceId: sNodes[i].resourceId,
						resourcePid: sNodes[i].resourcePid,
						hidden: sNodes[i].resourceShow,
						meta: sNodes[i],
						props: true,
					};
					tmpMap[sNodes[i][key]] = sNodes[i];
					continue;
				}
				if (sNodes[i].resourceType === "0") {
					//菜单
					sNodes[i] = {
						path: sNodes[i].resourcePath,
						pathcode: sNodes[i].resourcePath,
						component: () => import("@/views/layouts/RouteView"),
						resourceId: sNodes[i].resourceId,
						resourcePid: sNodes[i].resourcePid,
						hidden: sNodes[i].resourceShow,
						meta: sNodes[i],
					};
				} else if (sNodes[i].resourceType === "1") {
					resourcePath = sNodes[i].resourcePath;
					if (resourcePath != null && resourcePath1 != null && resourcePath == resourcePath1) {
						resourcePath = resourcePath + (i + 1);
					}
					// 页面
					sNodes[i] = {
						path: resourcePath,
						pathcode: sNodes[i].resourcePath,
						component: _import(sNodes[i].resourceUrl),
						resourceId: sNodes[i].resourceId,
						resourcePid: sNodes[i].resourcePid,
						hidden: sNodes[i].resourceShow,
						meta: sNodes[i],
						props: true,
					};
					resourcePath1 = resourcePath;
					// if (redirect == null) {
					//   console.log(sNodes[i])
					//   redirect = sNodes[i].resourcePath;
					//   localStorage.setItem('redirect', redirect); //默认进入第一个页面
					//   console.log(redirect)
					// }
				} else {
					// 方法
					sNodes[i] = {
						path: sNodes[i].resourcePath,
						pathcode: sNodes[i].resourcePath,
						// component: _import(sNodes[i].resourceUrl),
						resourceId: sNodes[i].resourceId,
						resourcePid: sNodes[i].resourcePid,
						meta: sNodes[i],
					};
				}
				// sNodes[i].path=sNodes[i].resourcePath+"2222"
				tmpMap[sNodes[i][key]] = sNodes[i];
			}
			for (i = 0, l = sNodes.length; i < l; i++) {
				if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
					if (!tmpMap[sNodes[i][parentKey]][childKey]) {
						tmpMap[sNodes[i][parentKey]][childKey] = [];
					}
					sNodes[i].pathcode = tmpMap[sNodes[i][parentKey]].pathcode + "/" + sNodes[i].pathcode;
					tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
				} else {
					r.push(sNodes[i]);
				}
			}

			return r;
		} else {
			return [sNodes];
		}
	}

	export default {
		getUserPermission,
	};
</script>
