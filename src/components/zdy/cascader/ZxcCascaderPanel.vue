<template>
	<div class="zxc-cascader-panel" :style="{ 'z-index': zIndex - 100 }">
		<div class="zxc-cascader-panel-child" v-if="data && data.length > 0" :style="{ maxHeight: maxHeight + 'px' }">
			<!-- <div class="zxc-cascader-header">
				<div class="zxc-cascader-header-parent-title">{{ parentLevelNode[treeDataSimpleMode["label"]] }}</div>
			</div> -->
			<div class="zxc-cascader-body">
				<ul @mouseover="handlemouseover">
					<zxc-cascader-item
						:class_="currentIndex === index ? 'zxc-cascader-item-isactive' : ''"
						v-for="(item, index) in data"
						:item="item"
						@hide="hide"
						@select="select"
						:key="index"
						@mouseenter.native.stop="showChild(item, index)"
						:treeDataSimpleMode="treeDataSimpleMode"
						:itemHeight="itemHeight"
					></zxc-cascader-item>
				</ul>
			</div>
		</div>
		<zxc-cascader-panel
			v-if="childLevelNode && childLevelNode.length"
			:data="childLevelNode"
			:parentLevelNode="parentLevelNode1"
			@hide="hide"
			@select="select"
			:zIndex="zIndex - 100"
			:treeDataSimpleMode="treeDataSimpleMode"
			:selectedNode="selectedNode1"
			:itemHeight="itemHeight"
			:maxHeight="maxHeight"
		></zxc-cascader-panel>
	</div>
</template>

<script>
	import ZxcCascaderItem from "./ZxcCascaderItem.vue";

	export default {
		name: "zxc-cascader-panel",
		components: {
			"zxc-cascader-item": ZxcCascaderItem,
		},
		props: {
			data: Array,
			parentLevelNode: {
				type: Object,
				default: function() {
					return {};
				},
			},
			zIndex: {
				type: Number,
				default: 1001,
			},
			// mode
			treeDataSimpleMode: {
				type: Object,
				default: () => {
					return {
						id: "id",
						value: "value",
						pId: "pId",
						label: "label",
						children: "children",
					};
				},
			},
			// 选中值
			selectedNode: {
				type: Object,
				defualt: function() {
					return {};
				},
			},
			// li高度
			itemHeight: {
				type: Number,
				defutl: 32,
			},
			// 最大高度
			maxHeight: {
				type: Number,
				defutl: 400,
			},
		},
		data() {
			return {
				// 子级节点
				childLevelNode: [],
				currentIndex: -1,
				// 父级节点
				parentLevelNode1: "",
				// 选中节点
				selectedNode1: {},
			};
		},
		beforeUpdate() {},
		computed: {},
		methods: {
			showChild(item, index) {
				this.parentLevelNode1 = item;
				this.currentIndex = index;
				this.childLevelNode = item[this.treeDataSimpleMode.children];
				// console.log(this.childLevelNode);
			},
			handlemouseover(e) {
				// let nodeName = e.srcElement.nodeName;
				// // console.log(nodeName);
				// if (nodeName == 'LI' || nodeName == 'A' || nodeName == 'I' || nodeName == 'svg' || nodeName == 'SPAN') {
				// 	return;
				// } else {
				// 	this.currentIndex = -1;
				// 	this.childLevelNode = [];
				// }
			},
			hide() {
				this.$emit("hide");
			},
			select(item) {
				this.$emit("select", item);
			},
		},
		watch: {
			data() {
				this.childLevelNode = [];
				this.currentIndex = -1;
			},
			selectedNode: {
				immediate: true,
				handler(val, oldVal) {
					if (val == null || JSON.stringify(val) == "{}" || val[this.treeDataSimpleMode.id + "s"] == undefined) {
						this.parentLevelNode1 = {};
						this.currentIndex = -1;
						this.childLevelNode = [];
						return;
					}
					// console.log("监控1", val.levelNum, val, val[this.treeDataSimpleMode["id"] + "s"]);
					const nodeIdex = val[this.treeDataSimpleMode.id + "s"].split(",")[val.levelNum];
					let index1 = 0;
					const data = this.data.filter((item, index) => {
						if (item[this.treeDataSimpleMode.id] == nodeIdex) {
							index1 = index;
							return true;
						}
					});
					if (data.length == 0) {
						return;
					}
					// console.log("监控2", data);
					val.levelNum = val.levelNum + 1;
					this.showChild(data[0], index1);
					setTimeout(() => {
						this.selectedNode1 = this.selectedNode;
					}, 10);
				},
			},
		},
	};
</script>

<style scoped>
	.zxc-cascader-panel {
		display: flex;
		color: rgba(0, 0, 0, 0.9);
		color: var(--text-color);
		/* background-color: #fff; */
		position: relative;
	}
	.zxc-cascader-panel-child {
		/* padding: 8px 0px; */
		margin: 0px;
		/* box-shadow: 1px 0 8px rgba(0, 0, 0, 0.15); */
		border-right: 1px solid #e8e8e8;
		width: auto;
		overflow-y: auto;
		background-color: #fff;
		min-width: 150px;
		max-height: 400px;
	}
	ul {
		padding: 0px;
		margin: 0px;
	}
	.zxc-cascader-header {
		/* position: relative; */
		padding: 0 20px; /* 上下0px 左右20px 内边距 */
		text-align: left;
		border-radius: 4px 4px 0 0;
		line-height: 30px;
		height: 30px;
	}
	.zxc-cascader-header-parent-title {
		border-bottom: 1px solid #e8e8e8;
	}
	.zxc-cascader-body {
		padding: 1px 0px;
		font-size: 14px;
		word-wrap: break-word;
	}
</style>
