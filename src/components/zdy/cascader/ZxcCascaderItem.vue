<template>
	<li class="zxc-cascader-item" :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }">
		<a v-if="!item.children" class="zxc-cascader-item-a" :class="class_" @click="select(item)">
			<span style="text-align: left">
				<span>{{ item[treeDataSimpleMode["label"]] }}</span>
			</span>
		</a>
		<a v-else class="zxc-cascader-item-a" :class="class_" @click="select(item)">
			<span style="text-align: left">
				<span>{{ item[treeDataSimpleMode["label"]] }}</span>
			</span>
			<span class="zxc-cascader-icon-left zxc-cascader-item-icon-position"> </span>
		</a>
	</li>
</template>

<script>
export default {
  name: 'ZxcCascaderItem',
  props: {
    item: {
      type: Object,
      default: null
    },
    class_: {
      type: String,
      default: null
    },
    // mode
    treeDataSimpleMode: {
      type: Object,
      default: () => {
        return {
          id: 'id',
          value: 'value',
          pId: 'pId',
          label: 'label',
          children: 'children'
        }
      }
    },
    // li高度
    itemHeight: {
      type: Number,
      defutl: 32
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    select (item) {
      this.$emit('select', item)
    },
    hide () {
      this.$emit('hide')
    },
    mouseover ($event) {
      console.log($event)
    }
  }
}
</script>

<style scoped type="text/less" lang="less">
	//@import '@/assets/theme/index.less';
	.zxc-cascader-item {
		cursor: pointer;
		width: 100%;
		height: 32px;
		line-height: 32px;
		list-style-position: inside;
		list-style-type: none;
		position: relative;
	}
	.zxc-cascader-item-a {
		padding: 0px 40px 0px 12px;
		color: rgba(0, 0, 0, 0.8);
		text-decoration: none; /* 去掉超链接的下划线 */
		display: block;
		width: 100%;
	}

	.zxc-cascader-item a {
		transition: 0s background-color;
	}

	.zxc-cascader-item a:hover {
		color: rgba(0, 0, 0, 0.8);
		padding: 0px 40px 0px 12px;
		// background-color: #40a9ff;
		background-color: #00000008;
		transition-delay: 0s;
	}
	.zxc-cascader-item-icon-position {
		position: absolute;
		right: 14px;
		top: 40%;
	}
	.zxc-cascader-item-icon-position:hover {
		color: #fff !important;
	}
	.zxc-cascader-item-isactive {
		font-weight: 600;
		color: rgb(0, 0, 0, 0.8);
		background-color: #00000008;
	}
</style>
