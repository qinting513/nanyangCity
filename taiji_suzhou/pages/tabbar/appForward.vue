<template>
	<view></view>
</template>

<script>
	/*
	 请先看AppIndex.vue 这个文件
	
	1.先加载appIndex页面，onLoad中，
	    1.1 先获取accessToken, 获取到则根据accessToken获取用户信息，
		1.2 否则先 window.location.href = "http://59.61.216.120:18891/oauth/authorize?client_id=d30778ad7ff04bf389e747cf5ceb3e6c&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=redirect_uri" 去打开新页面去登录先，登录成功后回到重定向的地址 redirect_uri，设定重定向的地址为：https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appForward?source=$page 重定向的地址要加上page字段
	
	2.在appForward页面，根据返回的code和page 进行获取accessToken（并保存accessToken），再根据accessToken获取用户信息，获取成功后根据page跳转到不同的页面
	*/

	import Http from '../../static/js/nanyang_auth.js';
	export default {
		name: "index",
		data() {
			return {
				source: '',
				code: null,
			}
		},
		onLoad(options) {
			let local = location.href;
			console.log("forwards options:", options, local);
			// https://rtxxdj.linewell.com/nanyang/?code=oMjB1A#/pages/tabbar/appForward?source=grbs
			if (local.indexOf("?code=") == -1) {
				uni.showToast({
					title: "获取CODE失败,请检查网络",
					icon: 'none',
				})
				return;
			} else {
				let codes = local.split('?code=');
				let parms = codes[1].split('#');
				this.code = parms[0];
			}
			this.source = options.source;
			console.log("page code", this.source, this.code);
			this.loadUserInfo();
		},
		methods: {
			loadUserInfo() {
				if (this.code != null && this.code != '') {
					uni.showLoading({
						title: '数据加载中...'
					})
					// debugger
					let redirect_uri = `${Http.redirectBaseUrl}/#/pages/tabbar/appForward?source=${this.source}`;
					// redirect_uri = encodeURIComponent(redirect_uri)
					let that = this;
					Http.getAccessToken(this.code, redirect_uri, (res) => {
						uni.hideLoading();
						/*
							{
							    "status": 1,
							    "code": 0,
							    "content": {
							        "id": "7ab3c10915054d24a80ebdebde93f342",
							        "nickname": "188****4000",
							        "photoUrl": null,
							        "phone": "18859504000",
							        "gender": 1
							    },
							    "message": null
							}
						*/
						Http.gotoPage(that.source);
					});
				}
			}
		}
	}
</script>

<style>
</style>
