<template>
	<view></view>
</template>

<script>
	/*
	访问地址: https://rtxxdj.linewell.com/nanyang/#/
	https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/home
	
	服务器访问的：
	个人办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=grbs
	企业办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=qybs
	部门办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=bmbs
	热门事项: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=rmsx
	
	本地调试的
	个人办事: http://localhost:8080/#/pages/tabbar/appIndex?page=grbs
	企业办事: http://localhost:8080/#/pages/tabbar/appIndex?page=qybs
	部门办事: http://localhost:8080/#/pages/tabbar/appIndex?page=bmbs
	热门事项: http://localhost:8080/#/pages/tabbar/appIndex?page=rmsx
	智能搜索: http://localhost:8080/#/pages/tabbar/appIndex?page=znss
	
	
	
	1.先加载appIndex页面，onLoad中，
	    1.1 先获取accessToken, 获取到则根据accessToken获取用户信息，
		1.2 否则先 window.location.href = "http://59.61.216.120:18891/oauth/authorize?client_id=d30778ad7ff04bf389e747cf5ceb3e6c&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=redirect_uri" 去打开新页面去登录先，登录成功后回到重定向的地址 redirect_uri并且附带了Code（返回示例：redirect_uri?code=CODE&state=STATE ），设定重定向的地址为：https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appForward?source=${this.page}   重定向的地址要加上page字段
	
	登录账号: 18859504000 111111a
	
	2.在appForward页面，根据返回的code和page 进行获取accessToken（并保存accessToken），再根据accessToken获取用户信息，获取成功后根据page跳转到不同的页面
	*/

	import Http from '../../static/js/nanyang_auth.js';
	export default {
		name: "index",
		data() {
			return {
				page: ''
			}
		},
		onLoad(options) {
			let local = location.href;
			console.log("appIndex options:", options, local);
			this.page = options.page
			// debugger
			setTimeout(() => {
				this.getUserInfo();
			}, 300)

		},
		methods: {
			getUserInfo() {
				let accessToken = uni.getStorageSync('ntoken');
				// console.log("本地token:", accessToken);
				if (null != accessToken && undefined != accessToken && '' != accessToken) {
					// 如果有accessToken则直接通过accessToken获取信息即可
					let that = this;
					Http.getAppAuthUserInfo(accessToken, () => {
						console.log("page....:", that.page);
						Http.gotoPage(that.page);
					});
				} else {
					debugger
					let redirect_uri = `${Http.redirectBaseUrl}/#/pages/tabbar/appForward?source=${this.page}`;
					// redirect_uri = encodeURIComponent(redirect_uri)
					// 否则先打开一个地址 来重定向
					location.replace(
						`${Http.authUrl}oauth/authorize?client_id=${Http.client_id}&response_type=code&grant_type=authorization_code&scope=snsapi_userinfo&redirect_uri=${redirect_uri}`
					);
				}
			},
		}
	}
</script>

<style>
</style>
