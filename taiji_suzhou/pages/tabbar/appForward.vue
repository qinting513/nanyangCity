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

	import HttpAuth from '../../static/js/nanyang_auth.js';
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
			// https://rtxxdj.linewell.com/nanyang/?code=oMjB1A#/pages/tabbar/appForward?source=base64加密的信息

			if (local.indexOf("?code=") == -1) {
				uni.showToast({
					title: "获取CODE失败,请检查网络",
					icon: 'none',
				})
				return;
			} else {
				// ?code= oMjB1A#/pages/tabbar/appForward?source=base64加密的信息
				let codes = local.split('?code=');
				// codes[1]是code后面部分  根据井号获得code
				let parms = codes[1].split('#');

				this.code = parms[0];
				let sourceStr = parms[1];
				this.source = sourceStr.split('source=')[1]
			}
			// this.source = options.source; // source信息从URL去获取
			console.log("appforward code:", this.source, this.code);
			this.loadUserInfo();
		},
		methods: {
			loadUserInfo() {
				
				if (this.code != null && this.code != '') {
					uni.showLoading({
						title: '数据加载中...'
					})

					let redirect_uri = `${HttpAuth.redirectBaseUrl}/#/pages/tabbar/appForward?source=${this.source}`;
					redirect_uri = encodeURIComponent(redirect_uri);
					console.log("重定向的URL:", redirect_uri);
					HttpAuth.getAccessToken(this.code, redirect_uri, (res) => {
						uni.hideLoading();
						console.log("source.....:", this.source);
						HttpAuth.gotoPage(this.source);
					});
				}
			}
		}
	}
</script>

<style>
</style>
