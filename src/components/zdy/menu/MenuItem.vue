<template>
	<li
		class="menu-item"
		:style="Object.assign({ paddingLeft: paddingLeft + 'px' }, menuItemStyle)"
		@click="menuItemClick"
		:class="{ 'menu-item-selected': selectedKeys.indexOf(this.key) > -1 }"
		@mouseenter="isMouseHover = true"
		@mouseleave="isMouseHover = false"
	>
		<!-- {{ level + "：" }} -->
		<!-- {{ key }} -->
		<slot />
		<!-- {{ paddingLeft }}
		{{ (paddingLeft - (paddingLeft % inlineIndent)) / inlineIndent + "*" + inlineIndent + "+" + (paddingLeft % inlineIndent) }} -->
	</li>
</template>

<script>
	export default {
		inject: ["paddingLeft", "level", "props", "menuItemSelect"],
		props: {},
		data() {
			return {
				paddingLeft: this.paddingLeft,
				level: this.level,
				inlineIndent: this.props.inlineIndent,
				menuItemStyle: this.props.menuItemStyle,
				selectedKeys: this.props.selectedKeys,
				// 鼠标悬浮 style
				hoverStyle: this.props.hoverStyle,
				// 鼠标是否悬浮
				isMouseHover: false,
				// key
				key: null,
			};
		},
		mounted() {
			this.key = this.$vnode.data.key;
		},
		methods: {
			menuItemClick() {
				this.selectedKeys = [];
				this.selectedKeys.push(this.key);
				// console.log(this.key, this.selectedKeys);
				this.menuItemSelect(this.selectedKeys);
			},
			// 设置悬浮样式
			setMenuSubMenuTitleHoverStyle() {
				if (this.isMouseHover) {
					// 鼠标悬浮
					if (this.hoverStyle != null && JSON.stringify(this.hoverStyle) != "{}") {
						this.menuItemStyle = this.hoverStyle;
					}
				} else {
					this.menuItemStyle = this.props.menuItemStyle;
				}
			},
		},
		watch: {
			props: {
				immediate: true,
				handler(val, oldVal) {
					this.selectedKeys = this.props.selectedKeys;
					this.inlineIndent = this.props.inlineIndent;
					this.menuItemStyle = this.props.menuItemStyle;
					this.hoverStyle = this.props.hoverStyle;
					this.setMenuSubMenuTitleHoverStyle();
				},
				deep: true,
			},
			isMouseHover(val, oldVal) {
				this.setMenuSubMenuTitleHoverStyle();
			},
		},
	};
</script>

<style lang="less" scoped>
	.menu-item {
		list-style: none;
		padding: 0 16px;
		height: 48px;
		line-height: 48px;
		cursor: pointer;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 4px;
		margin-bottom: 4px;
	}
	.menu-item:hover {
		background: #656e77;
		color: #fff;
	}
	.menu-item-selected {
		background: #fb9e38 !important;
		color: #fff !important;
	}
	.menu-item a {
		display: block;
	}
</style>
