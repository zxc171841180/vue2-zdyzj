<template>
	<div class="zxc-cascader-parent" @mouseenter="showall()" @mouseleave="showaleave()">
		<input
			autocomplete="off"
			value=""
			class="zxc-cascader-search-field"
			:class="{ disabled: disabled }"
			@click="showClick"
			v-model="searchValue"
			:disabled="disabled"
			:placeholder="selectedValue == null ? placeholder : null"
			@focus="onfocus"
			@blur="onBlur"
			:style="{ cursor: !focus ? 'pointer' : '' }"
		/>
		<span
			class="zxc-cascader-select-Labels-position"
			:style="{ color: focus || disabled ? 'rgb(0, 0, 0, 0.25)' : '' }"
			:title="selectedNode[treeDataSimpleMode['label'] + 's']"
		>
			{{ selectedNode[treeDataSimpleMode["label"] + "s"] }}
		</span>
		<div class="zxc-cascader" v-show="cascaderPanelShow" :style="{ minHeight: list.length == 0 ? '180px' : '180px' }">
			<zxc-cascader-panel
				v-if="list && list.length"
				:data="list"
				@hide="showaleave"
				@select="select"
				:treeDataSimpleMode="treeDataSimpleMode"
				:selectedNode="selectedNode"
				:itemHeight="itemHeight"
				:maxHeight="maxHeight"
				ref="zxc-cascader-panel"
			></zxc-cascader-panel>
			<div v-else style="width: 190px; padding: 12px">暂无数据！</div>
		</div>
		<div class="zxc-cascader-search-panel" v-show="cascaderSearchPanelShow">
			<div v-for="(item, index) in searchList" :key="index">
				<!-- {{ item[treeDataSimpleMode["label"] + "s"] }} -->
				<a @click="searchSelct(item)" style="padding: 6px; display: block" class="zxc-cascader-search-panel-a">
					<span>
						<span v-if="item[treeDataSimpleMode['label'] + 's'].indexOf(searchValue) > -1">
							{{ item[treeDataSimpleMode["label"] + "s"].substr(0, item[treeDataSimpleMode["label"] + "s"].indexOf(searchValue)).trim() }}
							<span style="color: #f50">{{ searchValue }}</span>
							{{
								item[treeDataSimpleMode["label"] + "s"].substr(
									item[treeDataSimpleMode["label"] + "s"].indexOf(searchValue) + searchValue.length
								)
							}}
						</span>
						<span v-else>{{ item[treeDataSimpleMode["label"] + "s"] }}</span>
					</span>
				</a>
			</div>
		</div>
		<a
			class="zxc-cascader-icon-clear zxc-cascader-icon-position"
			style="top: 50%; z-index: 11; right: 10px"
			v-if="allowClear && mouseenter && selectedValue != null && selectedValue != '' && !disabled"
			@click="
				() => {
					loadInitialValue([]);
					select({});
				}
			"
		>
		</a>
		<span v-else>
			<span class="zxc-cascader-icon-up zxc-cascader-icon-position" style="top: 30%" v-show="!cascaderPanelShow"> </span>
			<span class="zxc-cascader-icon-down zxc-cascader-icon-position" style="top: 40%" v-show="cascaderPanelShow"> </span>
		</span>
	</div>
</template>

<script>
	import ZxcCascaderPanel from "./ZxcCascaderPanel.vue";
	export default {
		props: {
			//配置v-model使用
			value: Array,
			//mode
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
			//list数据
			treeList: {
				type: Array,
				default: () => {
					return [];
				},
			},
			//禁用
			disabled: {
				type: Boolean,
				default: false,
			},
			//没有选择时显示文字
			placeholder: {
				type: String,
				default: "请选择",
			},
			//是否可清除
			allowClear: {
				type: Boolean,
				default: true,
			},
			//li高度
			itemHeight: {
				type: Number,
				defutl: 32,
			},
			//最大高度
			maxHeight: {
				type: Number,
				defutl: 400,
			},
		},
		model: {
			prop: "value",
			event: "change",
		},
		components: {
			ZxcCascaderPanel,
		},
		data() {
			return {
				cascaderList: [],
				//原始数据
				cascaderListOld: [],
				//树结构LIST
				cascaderTreeList: [],
				cascaderPanelShow: false,
				list: [],
				//选中值
				selectedValue: null,
				//选中对象
				selectedNode: {},
				//数据初始化状态
				dataInitState: false,
				//搜索值
				searchValue: null,
				//搜索面板显示
				cascaderSearchPanelShow: false,
				//搜搜数据
				searchList: [],
				//鼠标移入
				mouseenter: false,
				//获取焦点
				focus: false,
			};
		},
		mounted() {
			document.addEventListener("click", (e) => {
				if (!this.$el.contains(e.target)) {
					this.cascaderPanelShow = false; //点击其他区域关闭
					this.cascaderSearchPanelShow = false;
				} else {
					// this.cascaderPanelShow = true;
				}
			});
		},
		methods: {
			//鼠标移入
			showall() {
				// this.cascaderPanelShow = true;
				// this.list = this.cascaderTreeList;
				this.mouseenter = true;
			},
			//鼠标移出
			showaleave() {
				// this.cascaderPanelShow = false;
				// this.list = [];
				this.mouseenter = false;
			},
			//获得焦点
			onfocus() {
				this.focus = true;
			},
			//失去焦点
			onBlur() {
				this.focus = false;
			},
			/**
			 * 单击显示
			 */
			showClick() {
				if (this.disabled) {
					//禁用之后不能选中
					return;
				}
				if (this.searchValue != null && this.searchValue != "") {
					//如果输入框中还存在搜索值就直接打开搜索面板
					this.cascaderSearchPanelShow = !this.cascaderSearchPanelShow;
					return;
				}
				this.cascaderPanelShow = !this.cascaderPanelShow;
				// console.log(this.cascaderPanelShow);
			},
			/**
			 * 选中
			 */
			select(item) {
				this.cascaderPanelShow = false;
				this.selectedNode = item;
				this.selectedValue = item[this.treeDataSimpleMode["id"] + "s"];
				this.$emit("change", item[this.treeDataSimpleMode["id"] + "s"] == null ? [] : item[this.treeDataSimpleMode["id"] + "s"].split(","));
				this.$emit("changeAll", this.selectedNode);
				// console.log("选中", item);
			},
			/**
			 * 初始化数据
			 * @param {listary} items list数据
			 */
			initData(items) {
				this.dataInitState = false;
				if (items.length == 0 || items == undefined) {
					this.dataInitState = true;
					return;
				}
				// this.cascaderListOld = items;
				// this.cascaderList = JSON.parse(JSON.stringify(items));
				this.cascaderList = items;
				this.cascaderTreeList = this.listToTree(
					this.treeDataSimpleMode["id"],
					this.treeDataSimpleMode["pId"],
					this.treeDataSimpleMode["label"],
					this.cascaderList
				);
				// console.log(this.cascaderTreeList);
				this.cascaderList = this.treeToList(this.cascaderTreeList);
				// console.log(this.cascaderList);
				this.list = this.cascaderTreeList;
				this.dataInitState = true;
			},
			/**
			 * 将tree装换成list
			 * @param {Object} treeList treeList集合
			 */
			treeToList(treeList) {
				let newList = [];
				let genTreeNode = (items, parentNode) => {
					// newList.push(parentNode);
					let itemsLen = items.length;
					for (let i = 0; i < itemsLen; i++) {
						newList.push(items[i]);
						if (items[i].children != undefined && items[i].children.length > 0) {
							genTreeNode(items[i].children, items[i]);
						}
					}
				};
				genTreeNode(treeList);
				return newList;
			},
			//查找上级
			find(keyId, pId, label, list) {
				let map = {}; // 构建map
				list.forEach((i) => {
					map[i[keyId]] = i; // 构建以keyId为键 当前数据为值
				});
				let getParents = () => {};
				getParents();
			},
			/**
			 * 将list装换成tree
			 * @param {String} keyId 数据主键id
			 * @param {String} pId  数据关联的父级id
			 * @param {String} label  数据label
			 * @param {Object} list list集合
			 */
			listToTree(keyId, pId, label, list) {
				var start = Date.now();
				// 删除所有 children,以防止多次调用
				list.forEach(function (item) {
					delete item.children;
				});
				let map = {}; // 构建map
				list.forEach((i) => {
					map[i[keyId]] = i; // 构建以keyId为键 当前数据为值
				});
				// console.log(map);
				let treeData = [];
				list.forEach((child) => {
					const mapItem = map[child[pId]]; // 判断当前数据的pId是否存在map中
					if (mapItem) {
						// 存在则表示当前数据不是最顶层数据
						// 注意: 这里的map中的数据是引用了list的它的指向还是list，当mapItem改变时list也会改变,踩坑点
						(mapItem.children || (mapItem.children = [])).push(child); // 这里判断mapItem中是否存在children, 存在则插入当前数据, 不存在则赋值children为[]然后再插入当前数据
					} else {
						// 不存在则是组顶层数据
						treeData.push(child);
					}
				});
				var getParents = (data, labels, ids) => {
					if (ids == undefined) {
						data[label + "s"] = data[label];
						data[keyId + "s"] = data[keyId];
					} else {
						data[label + "s"] = labels + " / " + data[label];
						data[keyId + "s"] = ids + "," + data[keyId];
					}
					let children = data["children"];
					if (children != undefined) {
						for (let i = 0; i < children.length; i++) {
							getParents(children[i], data[label + "s"], data[keyId + "s"]);
						}
					}
				};
				for (let i = 0; i < treeData.length; i++) {
					getParents(treeData[i]);
				}

				var end = Date.now();
				// console.log((end - start) / 1000 + "s", list);
				return treeData;
			},
			/**
			 * 将list装换成tree
			 * @param {String} keyId 数据主键id
			 * @param {String} pId  数据关联的父级id
			 * @param {String} label  数据label
			 * @param {Object} list list集合
			 */
			listToTree1(keyId, pId, label, list) {
				//获取所有最上级节点
				//配置后台pidCode
				// console.log(Math.max.apply(Math, list.map(function(o) {return o.pidCodeLen})))
				// console.log(Math.min.apply(Math, list.map(function(o) {return o.pidCodeLen})))
				let minPidCodeLen = Math.min.apply(
					Math,
					list.map(function (o) {
						return o.pidCode.length;
					})
				);
				var firstLevelNodes = list.filter((item) => item.pidCode.length == minPidCodeLen);

				//适合无法确定最上级节点
				// var firstLevelNodes = [];
				// let listLen = list.length;
				// for (var i = 0; i < listLen; i++) {
				// 	let patent = list.filter((item) => item[keyId] == list[i][pId]);
				// 	if (patent.length == 0) {
				// 		firstLevelNodes.push(list[i]);
				// 	}
				// 	// console.log(i);
				// }

				// console.log(firstLevelNodes);
				var start = Date.now();
				let memoize = (fn, cache) => {
					//fn递归调用的函数，cache缓存对象的预设值
					cache = cache || {};
					var shell = function (arg) {
						if (!Object.prototype.hasOwnProperty.call(cache, arg)) {
							//如果缓存数据中没有这个参数对应的值
							cache[arg] = fn(arg); //缓存递归执行结果
						}
						return cache[arg];
					};
					return shell;
				};
				let genTreeNode = (items, parentNode, labels, ids, nodeIndex) => {
					if (labels != "") {
						parentNode[label + "s"] = labels + " / " + parentNode[label];
						parentNode[keyId + "s"] = ids + "," + parentNode[keyId];
					} else {
						parentNode[label + "s"] = parentNode[label];
						parentNode[keyId + "s"] = parentNode[keyId];
					}
					parentNode["index"] = 0;
					parentNode["nodeIndex"] = nodeIndex;
					nodeIndex++;
					let filters = items.filter((item) => item[pId] == parentNode[keyId]);
					// console.log(filters);
					if (filters != undefined && filters.length > 0) {
						parentNode.children = filters;
						let filtersLen = filters.length;
						for (let i = 0; i < filtersLen; i++) {
							filters[i]["index"] = i;
							// genTreeNode(items, filters[i], parentNode[label + "s"], parentNode[keyId + "s"], nodeIndex)
							memoize(genTreeNode(items, filters[i], parentNode[label + "s"], parentNode[keyId + "s"], nodeIndex));
						}
					} else {
						return;
					}
				};
				let firstLevelNodesLen = firstLevelNodes.length;
				for (let i = 0; i < firstLevelNodesLen; i++) {
					// genTreeNode(list, firstLevelNodes[i], "", "", 0);
					memoize(genTreeNode(list, firstLevelNodes[i], "", "", 0));
				}
				var end = Date.now();
				// console.log((end - start) / 1000 + "s", list);
				// console.log(firstLevelNodes);
				return firstLevelNodes;
			},
			/** 数组i转d链
			 * @param {String} list 数组
			 * @param {String} separator 分隔符，如：','
			 */
			listToIds(list, separator) {
				if (list == null || list.length == 0) {
					return null;
				}
				let str = "";
				for (const elem of list) {
					str += elem + separator;
				}
				str = str.substring(0, str.length - separator.length);
				return str;
			},
			//数据加载完成之后加载初始值
			loadInitialValue(val) {
				if (this.dataInitState) {
					if (val == null || val.length == 0) {
						this.selectedNode = {};
						this.selectedValue = null;
						return;
					}
					this.selectedValue = this.listToIds(val, ",");
					let cascaderList = this.cascaderList.filter((item) => item[this.treeDataSimpleMode["id"] + "s"] == this.selectedValue);
					let selectedNode = JSON.parse(JSON.stringify(cascaderList.length > 0 ? cascaderList[0] : {}));
					selectedNode.levelNum = 0;
					this.selectedNode = selectedNode;
					return;
				} else {
					setTimeout(() => {
						this.loadInitialValue(val);
					}, 50);
				}
			},
			//搜索回调
			onChangeSearach(searchValue) {
				// console.log(searchValue);
				if (searchValue == null || searchValue == "") {
					this.cascaderSearchPanelShow = false;
				} else {
					this.cascaderSearchPanelShow = true;
					this.cascaderPanelShow = false;
				}
				this.searchList = this.cascaderList.filter((item) => item[this.treeDataSimpleMode["label"]].indexOf(searchValue) > -1);
				// console.log(this.searchList, this.cascaderList);
			},
			//搜索选择
			searchSelct(item) {
				this.searchValue = null;
				this.searchList = [];
				this.loadInitialValue(item[this.treeDataSimpleMode["id"] + "s"].split(","));
				this.cascaderSearchPanelShow = false;
				this.cascaderPanelShow = true;
				this.select(item);
			},
		},
		watch: {
			value: {
				immediate: true,
				handler(val, oldVal) {
					this.selectedValue = null;
					//undefined 认为是初始化调用，不赋值
					if (typeof val == "undefined") {
						return;
					}
					this.loadInitialValue(val);
				},
			},
			treeList: {
				immediate: true,
				handler(val, oldVal) {
					this.initData(val);
					if (this.selectedValue != null) {
						this.loadInitialValue(this.selectedValue.split(","));
					}
				},
			},
			cascaderPanelShow(val, oldVal) {
				if (!val) {
					// console.log(this.selectedValue);
					if (this.selectedValue != null) {
						this.loadInitialValue(this.selectedValue.split(","));
					}
				}
			},
			searchValue(val, oldVal) {
				this.onChangeSearach(val);
			},
		},
	};
</script>

<style scoped>
	.zxc-cascader-parent {
		height: 32px;
		/* width: 100%; */
		color: #000000;
		padding: 0px;
		margin: 0px;
		position: relative;
		border-radius: 4px;
		border: 1px solid #d9d9d9;
		line-height: 20px;
		font-size: 14px;
	}
/* 	.zxc-cascader-parent:hover {
		border: 1px solid #a1c6ff;
	} */
	.zxc-cascader {
		position: absolute;
		background-color: #fff;
		z-index: 10;
		white-space: nowrap;
		left: 0;
		top: 110%;
		max-height: 400px;
		min-height: 200px;
		/* width: 100%; */
		width: auto;
		/* overflow: auto; */
		border-radius: 4px;
		box-shadow: 0 2px 8px rgb(0, 0, 0, 0.15);
		padding: 6px 0px;
	}
	.zxc-cascader-search-panel {
		position: absolute;
		background-color: #fff;
		z-index: 10;
		white-space: nowrap;
		left: 0;
		top: 110%;
		max-height: 400px;
		min-height: 200px;
		width: 100%;
		overflow: auto;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgb(0, 0, 0, 0.15);
	}
	.zxc-cascader-search-panel-a:hover {
		background-color: #00000008;
	}
	.zxc-cascader-search-field {
		width: 100%;
		height: 100%;
		padding: 4px 11px;
		border: 0px solid #d9d9d9;
	}
	input {
		background: none;
		outline: none;
	}
	input:focus {
		border: none;
	}
	.zxc-cascader-icon-position {
		position: absolute;
		right: 12px;
		top: 40%;
		z-index: 10;
	}
	.zxc-cascader-select-Labels-position {
		position: absolute;
		left: 12px;
		top: 15%;
		color: rgb(0, 0, 0, 0.65);
		width: calc(100% - 28px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		pointer-events: none;
	}
	input.disabled,
	input[disabled],
	input:disabled {
		/* border: 1px solid #ddd; */
		background-color: #f5f5f5;
		color: rgb(0, 0, 0, 0.25);
		cursor: no-drop;
	}
	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: rgb(0, 0, 0, 0.25);
	}
	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: rgb(0, 0, 0, 0.25);
	}
	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: rgb(0, 0, 0, 0.25);
	}
	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: rgb(0, 0, 0, 0.25);
	}
</style>
<style>
	.zxc-cascader-icon-up {
		color: rgba(0, 0, 0, 0.45);
		width: 8px;
		height: 8px;
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-right: 1px solid rgba(0, 0, 0, 0.25);
		transform: rotate(135deg);
	}
	.zxc-cascader-icon-down {
		color: rgba(0, 0, 0, 0.45);
		width: 8px;
		height: 8px;
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-right: 1px solid rgba(0, 0, 0, 0.25);
		transform: rotate(315deg);
	}
	.zxc-cascader-icon-left {
		color: rgba(0, 0, 0, 0.45);
		width: 6px;
		height: 6px;
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-right: 1px solid rgba(0, 0, 0, 0.25);
		transform: rotate(45deg);
	}
	.zxc-cascader-icon-right {
		color: rgba(0, 0, 0, 0.45);
		width: 6px;
		height: 6px;
		border-top: 1px solid rgba(0, 0, 0, 0.25);
		border-right: 1px solid rgba(0, 0, 0, 0.25);
		transform: rotate(225deg);
	}
	.zxc-cascader-icon-clear {
		display: inline-block;
		width: 14px;
		height: 2px;
		background: #999;
		line-height: 0;
		font-size: 0;
		vertical-align: middle;
		transform: rotate(45deg);
	}
	.zxc-cascader-icon-clear:after {
		content: "/";
		display: block;
		width: 14px;
		height: 2px;
		background: #999;
		transform: rotate(-90deg);
	}
</style>
