<template>
	<div class="header">
		<div class="header-left">
			<div class="header-left-title"></div>
		</div>
		<div class="header-right">
			登录
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
	};
</script>
<style lang="less" scoped>
	.header {
		height: 54px;
		background: #fff;
		color: #fff;
		border-bottom: 1px solid #f0f2f5;
	}
	.header-left {
		font-size: 20px;
		font-weight: 600;
		float: left;
		line-height: 54px;
		margin: 0px 20px;
	}
	.header-right {
		font-size: 16px;
		float: right;
		line-height: 54px;
		margin: 0px 20px;
	}
</style>
