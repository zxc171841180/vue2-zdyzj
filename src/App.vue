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
	}
	#app {
		height: 100%;
	}
</style>
