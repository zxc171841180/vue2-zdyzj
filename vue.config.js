module.exports = {
  devServer: {
    port: 2000,
    disableHostCheck: true,
    // 设置代理
    proxy: {
      "/api/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        //开启代理
        changOrigin: true,
        pathRewrite: {
          // '^/api': ''  // rewrite path
        }
      },
      "/upload/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        timeout: 1000 * 60 * 60 * 5,
        //开启代理
        changOrigin: true,
        pathRewrite: {}
      },
      "/accessory/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        timeout: 1000 * 60 * 60 * 5,
        //开启代理
        changOrigin: true,
        pathRewrite: {}
      },
      "/druid/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        //开启代理
        changOrigin: true,
        pathRewrite: {}
      },
      //批量操作耗时较长接口
      "/batch/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        //请求超时时间 单位毫秒 10小时
        timeout: 1000 * 60 * 60 * 10,
        //开启代理
        changOrigin: true,
        pathRewrite: {}
      },
      //公共资源操作接口
      "/public/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        //请求超时时间 单位毫秒 10小时
        timeout: 1000 * 60 * 60 * 10,
        //开启代理
        changOrigin: true,
        pathRewrite: {}
      },
      "/websocket/": {
        // 访问数据的计算机域名
        target: "http://127.0.0.1:8085",
        // 是否启用websockets
        ws: true,
        //请求超时时间 单位毫秒 10分钟
        timeout: 1000 * 60 * 10,
        //开启代理
        changOrigin: true,
        pathRewrite: {}
      }
    }
  },
  /*打包时用*/
  //打包后的位置 vue history 模式要用绝对路径 '/',其它用相对路径'./'
  publicPath: "/",
  //打包后的目录名称
  outputDir: "dist",
  //静态资源目录名称
  assetsDir: "static",
  // 生产环境是否生成 sourceMap 文件，  生成环境应为false
  productionSourceMap: false,
  //图标
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  /* configureWebpack: {
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js'
			}
		}
	}, */
  css: {
    //提取css代码：因为js会动态的加载出css，所以js文件包会比较大，那么需要提取css代码到文件. 这里我们只需要将css配置一下:
    // extract: true,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: {
    plugins: []
  },
  chainWebpack: config => {
    //xlsx-style报错添加
    config.externals({ "./cptable": "var cptable" });
    /* // 压缩代码
		config.optimization.minimize(true);
		// 分割代码
		config.optimization.splitChunks({
			chunks: 'all'
		}); */
  }
};
