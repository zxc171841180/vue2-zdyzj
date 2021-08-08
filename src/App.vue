<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: "App",
		components: {},
	};
</script>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
		background: #f0f2f5;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
			sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
	}
	#app {
		height: 100%;
	}
</style>
