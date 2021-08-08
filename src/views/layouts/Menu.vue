<template>
	<div style="min-height:500px; background:#545c64">
		<Menu :menuStyle="{ width: '240px' }">
			<template v-for="item in menuList">
				<MenuSubMenu :key="item.meta.resourceId" v-if="item.children">
					<template slot="title">
						{{ item.meta.resourceName }}
					</template>
					<template v-for="item1 in item.children">
						<MenuSubMenu :key="item1.meta.resourceId" v-if="item1.children">
							<template slot="title">
								{{ item1.meta.resourceName }}
							</template>
							<template v-for="item2 in item1.children">
								<MenuSubMenu :key="item2.meta.resourceId" v-if="item2.children">
									<template slot="title">
										{{ item2.meta.resourceName }}
									</template>
									<template v-for="item3 in item2.children">
										<MenuSubMenu :key="item3.meta.resourceId" v-if="item3.children">
											<template slot="title">
												{{ item3.meta.resourceName }}
											</template>
											<template v-for="item4 in item3.children">
												<MenuSubMenu :key="item4.meta.resourceId" v-if="item4.children">
													<template slot="title">
														{{ item4.meta.resourceName }}
													</template>
												</MenuSubMenu>
												<MenuItem :key="item4.meta.resourceId" v-else>
													{{ item4.meta.resourceName }}
												</MenuItem>
											</template>
										</MenuSubMenu>
										<MenuItem :key="item3.meta.resourceId" v-else>
											{{ item3.meta.resourceName }}
										</MenuItem>
									</template>
								</MenuSubMenu>
								<MenuItem :key="item2.meta.resourceId" v-else>
									{{ item2.meta.resourceName }}
								</MenuItem>
							</template>
						</MenuSubMenu>
						<MenuItem :key="item1.meta.resourceId" v-else>
							{{ item1.meta.resourceName }}
						</MenuItem>
					</template>
				</MenuSubMenu>
				<MenuItem :key="item.meta.resourceId" v-else>
					<a @click="routerPathJump(item.routerPath)">
						<span style="text-align: left">
							<span style="margin-left: 10px">{{ item.meta.resourceName }}</span>
						</span>
					</a>
				</MenuItem>
			</template>
		</Menu>
	</div>
</template>

<script>
	import Menu from "@/components/zdy/menu/Menu";
	import MenuItem from "@/components/zdy/menu/MenuItem";
	import MenuSubMenu from "@/components/zdy/menu/MenuSubMenu";
	export default {
		components: {
			Menu,
			MenuItem,
			MenuSubMenu,
		},
		props: {
			// 模式
			// horizontal / vertical
			mode: {
				type: String,
				default: "vertical",
			},
			// menu style
			menuStyle: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				menuList: JSON.parse(localStorage.getItem("menu")),
			};
		},
		mounted() {},
		methods: {
			routerPathJump(path) {
				this.$router.push({
					path: "/index/" + path,
					query: {
						date: Date.now(),
					},
				});
			},
		},
	};
</script>

<style lang="less" scoped></style>
