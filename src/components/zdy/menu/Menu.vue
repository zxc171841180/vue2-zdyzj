<template>
	<div>
		<ul class="menu" :style="menuStyle">
			<slot />
		</ul>
	</div>
</template>

<script>
export default {
  provide () {
    return {
      paddingLeft: this.paddingLeft,
      level: this.level,
      props: this.props,
      // 方法事件
      menuItemSelect: this.menuItemSelect,
      menuSubMenuOpenChange: this.menuSubMenuOpenChange
    }
  },
  props: {
    // 模式
    // horizontal / inline
    mode: {
      type: String,
      default: 'inline'
    },
    // menu style
    menuStyle: {
      type: Object,
      default: () => {}
    },
    // menu-submenu style
    menuSubmenuStyle: {
      type: Object,
      default: () => {}
    },
    // menu-item style
    menuItemStyle: {
      type: Object,
      default: () => {}
    },
    // inline 模式的菜单缩进宽度
    inlineIndent: {
      type: Number,
      default: 32
    },
    // 展开节点
    openKeys: {
      type: Array,
      default: () => []
    },
    // 选中key数组
    selectedKeys: {
      type: Array,
      default: () => []
    },
    // 鼠标悬浮 style
    hoverStyle: {
      type: Object,
      default: () => {}
    },
    // 主题色
    themeColor: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 缩进初始值
      paddingLeft: 16,
      // 层级
      level: 1,
      props: {
        // props可配置项
        mode: 'inline',
        menuSubmenuStyle: {},
        menuItemStyle: {},
        inlineIndent: 32,
        // 选中key数组
        selectedKeys: [],
        // 展开节点
        openKeys: [],
        // 鼠标悬浮 style
        hoverStyle: {},
        // 主题色
        themeColor: {}
      }
    }
  },
  methods: {
    // 选中menuItem回调
    menuItemSelect (selectedKeys) {
      this.props.selectedKeys = selectedKeys
      // console.log(this.props.selectedKeys);
      this.$emit('select', this.props.selectedKeys)
    },
    // 展开menuSubMenu回调
    menuSubMenuOpenChange (key, openKeys) {
      this.props.openKeys = openKeys
      // console.log(key, openKeys);
      this.$emit('openChange', this.props.openKeys)
    }
  },
  watch: {
    // props可配置项
    // 模式
    mode: {
      immediate: true,
      handler (val, oldVal) {
        this.props.mode = val
      },
      deep: true
    },
    menuSubmenuStyle: {
      immediate: true,
      handler (val, oldVal) {
        this.props.menuSubmenuStyle = val
      },
      deep: true
    },
    menuItemStyle: {
      immediate: true,
      handler (val, oldVal) {
        this.props.menuItemStyle = val
      },
      deep: true
    },
    // inline 模式的菜单缩进宽度
    inlineIndent: {
      immediate: true,
      handler (val, oldVal) {
        this.props.inlineIndent = val
      },
      deep: true
    },
    // 展开节点
    openKeys: {
      immediate: true,
      handler (val, oldVal) {
        this.props.openKeys = val
      },
      deep: true
    },
    // 选中key数组
    selectedKeys: {
      immediate: true,
      handler (val, oldVal) {
        this.props.selectedKeys = val
      },
      deep: true
    },
    // 鼠标悬浮 style
    hoverStyle: {
      immediate: true,
      handler (val, oldVal) {
        this.props.hoverStyle = val
      },
      deep: true
    },
    // 主题色
    themeColor: {
      immediate: true,
      handler (val, oldVal) {
        this.props.themeColor = val
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
	*,
	::before,
	::after {
		box-sizing: border-box;
	}
	.menu {
		list-style: none;
		margin: 0;
		padding: 0;
		width: 500px;
		background: #545c64;
		color: #fff;
      overflow: hidden;
	}
</style>
