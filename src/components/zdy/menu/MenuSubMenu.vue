<template>
	<div class="menu-submenu">
		<div
			class="menu-submenu-title"
			:class="{
				'menu-submenu-open': openKeys.indexOf(this.key) > -1,
				'menu-submenu-close': openKeys.indexOf(this.key) == -1,
			}"
			:style="Object.assign({ paddingLeft: paddingLeft + 'px' }, menuSubmenuStyle)"
			@click="menuSubMenuClick"
			@mouseenter="isMouseHover = true"
			@mouseleave="isMouseHover = false"
		>
			{{ level + "：" }}
			<!-- {{ openKeys }} -->
			<!-- {{ key }} -->
			<slot name="title" />
			<!-- {{ paddingLeft }}
			{{ (paddingLeft - (paddingLeft % inlineIndent)) / inlineIndent + "*" + inlineIndent + "+" + (paddingLeft % inlineIndent) }} -->
			<span class="menu-submenu-arrow"> </span>
		</div>
		<ul class="menu-sub" v-if="openKeys.indexOf(this.key) > -1">
			<slot />
		</ul>
		<!-- <li class="menu-sub" :style="menuSubmenuStyle"></li> -->
	</div>
</template>

<script>
export default {
  inject: ['paddingLeft', 'level', 'props', 'menuSubMenuOpenChange'],
  provide () {
    return {
      paddingLeft: this.paddingLeft + this.inlineIndent,
      level: this.level + 1
    }
  },
  props: {},
  data () {
    return {
      paddingLeft: this.paddingLeft,
      level: this.level,
      mode: this.props.mode,
      inlineIndent: this.props.inlineIndent,
      openKeys: this.props.openKeys,
      menuSubmenuStyle: this.props.menuSubmenuStyle,
      // 鼠标悬浮 style
      hoverStyle: this.props.hoverStyle,
      // 主题色
      themeColor: this.props.themeColor,
      // 鼠标是否悬浮
      isMouseHover: false,
      // key
      key: null
    }
  },
  mounted () {
    // this.paddingLeft = this.$parent.paddingLeft + this.inlineIndent;
    this.key = this.$vnode.data.key
    // console.log(this.$vnode.data.key, this.$parent, this.level);
  },
  methods: {
    menuSubMenuClick () {
      if (this.openKeys.indexOf(this.key) > -1) {
        // 关闭
        this.openKeys = this.openKeys.filter((item) => item != this.key)
      } else {
        // 展开
        this.openKeys.push(this.key)
      }
      this.menuSubMenuOpenChange(this.key, this.openKeys)
    },
    // 设置悬浮样式
    setMenuSubMenuTitleHoverStyle () {
      if (this.isMouseHover) {
        // 鼠标悬浮
        if (this.hoverStyle != null && JSON.stringify(this.hoverStyle) != '{}') {
          this.menuSubmenuStyle = this.hoverStyle
        }
      } else {
        this.menuSubmenuStyle = this.props.menuSubmenuStyle
      }
    }
  },
  watch: {
    props: {
      immediate: true,
      handler (val, oldVal) {
        // console.log(val);
        this.openKeys = this.props.openKeys
        this.mode = this.props.mode
        this.inlineIndent = this.props.inlineIndent
        this.menuSubmenuStyle = this.props.menuSubmenuStyle
        this.hoverStyle = this.props.hoverStyle
        this.themeColor = this.props.themeColor
        this.setMenuSubMenuTitleHoverStyle()
      },
      deep: true
    },
    isMouseHover (val, oldVal) {
      this.setMenuSubMenuTitleHoverStyle()
    }
  }
}
</script>

<style lang="less" scoped>
	.menu-submenu {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.menu-submenu-title {
		position: relative;
		display: block;
		padding: 0 24px 0 16px;
		cursor: pointer;
		height: 48px;
		line-height: 48px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 4px;
		margin-bottom: 4px;
	}
	.menu-submenu-title:hover {
		background: #656e77;
		color: #fff;
	}
	.menu-submenu-title:hover > .menu-submenu-arrow {
		color: #fff;
	}
	//图标
	.menu-submenu-arrow {
		position: absolute;
		top: 50%;
		right: 16px;
		width: 10px;
		color: #fff;
		transform: translateY(-50%);
		transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	//未展开
	.menu-submenu-close {
		// background: #FB9E38;
	}
	.menu-submenu-close > .menu-submenu-arrow::before {
		transform: rotate(-45deg) translateX(2.5px);
	}
	.menu-submenu-close > .menu-submenu-arrow::before,
	.menu-submenu-close > .menu-submenu-arrow::after {
		position: absolute;
		width: 6px;
		height: 1.5px;
		background-color: currentColor;
		border-radius: 2px;
		transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
			top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		content: "";
	}
	.menu-submenu-close > .menu-submenu-arrow::after,
	.menu-submenu-close > .menu-submenu-arrow::after {
		transform: rotate(45deg) translateX(-2.5px);
	}
	.menu-submenu-close > .menu-submenu-arrow::before,
	.menu-submenu-close > .menu-submenu-arrow::after {
		position: absolute;
		width: 6px;
		height: 1.5px;
		background-color: currentColor;
		border-radius: 2px;
		transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
			top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		content: "";
	}

	//展开
	.menu-submenu-open {
		color: #fb9e38 !important;
	}
	.menu-submenu-open > .menu-submenu-arrow::before {
		transform: rotate(45deg) translateX(2.5px);
	}
	.menu-submenu-open > .menu-submenu-arrow::before,
	.menu-submenu-open > .menu-submenu-arrow::after {
		position: absolute;
		width: 6px;
		height: 1.5px;
		background-color: currentColor;
		border-radius: 2px;
		transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
			top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		content: "";
	}
	.menu-submenu-open > .menu-submenu-arrow::after {
		transform: rotate(-45deg) translateX(-2.5px);
	}
	.menu-submenu-open > .menu-submenu-arrow::before,
	.menu-submenu-open > .menu-submenu-arrow::after {
		position: absolute;
		width: 6px;
		height: 1.5px;
		background-color: currentColor;
		border-radius: 2px;
		transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
			top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		content: "";
	}
	.menu-sub {
		padding: 0;
		border: 0;
		border-radius: 0;
		box-shadow: none;
		cursor: initial;
		transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		// transition: max-height 0.3s;
		// padding: 0 0 0 16px;
	}
</style>
