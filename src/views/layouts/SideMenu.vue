<template>
	<div class="side-menu">
		<div class="logo">
			自定义组件
		</div>
		<Menu />
	</div>
</template>

<script>
	import Menu from "@/views/layouts/Menu";
	export default {
		components: {
			Menu,
		},
		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped>
	.side-menu {
		background: #545c64;
		width: 240px;
	}
	.logo {
		height: 54px;
		line-height: 54px;
		color: #fff;
		padding-left: 24px;
		font-size: 20px;
		font-weight: 600;
	}
</style>
