<template>
	<div style="height: 100%;">
		<div style="display: flex;flex: auto;flex-direction: row; height: 100%;">
			<SideMenu />
			<div style="display: flex;flex: auto;flex-direction: column; height: 100%;">
				<Header />
				<div style="padding:4px 12px;height: 38px;line-height: 38px;background: #fff;border-bottom: 1px solid #f0f2f5; color: #6f6f6f;}">
					<span v-for="(item, index) of $route.matched" :key="item.meta.resourceId">
						<a
							v-if="item.meta.resourceType == '1' && index != $route.matched.length - 1"
							@click="
								() => {
									$router.push({
										path: item.path,
										query: {
											date: Date.now(),
										},
									});
								}
							"
						>
							{{ item.meta.resourceName + (index == $route.matched.length - 1 ? "" : " / ") }}
						</a>
						<span v-else> {{ item.meta.resourceName + (index == $route.matched.length - 1 ? "" : " / ") }} </span>
					</span>
				</div>
				<div style="overflow: auto;">
					<div style=" margin:6px;">
						<router-view :key="$route.query.date" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import SideMenu from "@/views/layouts/SideMenu";
	import Header from "@/views/layouts/Header";
	export default {
		components: {
			SideMenu,
			Header,
		},
		created() {
			// this.$userPermission.getUserPermission();
		},
		mounted() {
			console.log(this.$route);
		},
		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped></style>
