<template>
	<view></view>
</template>

<script>
	/*
	访问地址: https://rtxxdj.linewell.com/nanyang/#/
	
	原始地址：
	1.个人办事(个人主题导航): https://rtxxdj.linewell.com/nanyang/#/pages/government_service/business_page?userType=1
	2.法人办事(法人主题导航): https://rtxxdj.linewell.com/nanyang/#/pages/government_service/business_page?userType=2
	3.部门导航: https://rtxxdj.linewell.com/nanyang/#/pages/government_service/department_page
	4.热门事项: https://rtxxdj.linewell.com/nanyang/#/pages/hotlist/hotlist
	5.事项搜索  https://rtxxdj.linewell.com/nanyang/#/pages/hotlist/hotlist?type=search
	6.热门服务: https://rtxxdj.linewell.com/nanyang/#/pages/hotservice/hotservice
	
	1.事项跳转到办事指南的格式: "https://rtxxdj.linewell.com/nanyang/#/pages/business_guide/business_guide?ID=" + 事项ID
	2.主题导航点击某一个进到的事项列表: (pictureCode传SORTCODE，pictureName传SORTNAME )
	     https://rtxxdj.linewell.com/nanyang/#/pages/government_service/item_list?pictureCode=root_gr_ztfl_01&pictureName=生育收养
    3.进度查询结果 https://rtxxdj.linewell.com/nanyang/#/pages/mine/schedule_query_result?id=xxx&username=用户名
	
	服务器访问的：
	1.个人办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=grbs
	2.企业办事: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=qybs
	3.部门导航: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=bmbs
	4.热门事项: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=rmsx
	5.事项搜索: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=sxss
	6.办事指南: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=bszn&ID=事项ID 005998375QR13609003
	7.事项列表: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=sxlb&pictureCode=主题的SORTCODE&pictureName=主题名称SORTNAME 
	8.进度查询: https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=jdcx
	9.我的办件：https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=wdbj&index=页签枚举值(0暂存件 1在办件 2办结件)
	10.热门服务:https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appIndex?page=rmfw
	
	本地调试的
	1.个人办事: http://localhost:8080/#/pages/tabbar/appIndex?page=grbs
	2.企业办事: http://localhost:8080/#/pages/tabbar/appIndex?page=qybs
	3.部门导航: http://localhost:8080/#/pages/tabbar/appIndex?page=bmbs
	4.热门事项: http://localhost:8080/#/pages/tabbar/appIndex?page=rmsx
	5.事项搜索: http://localhost:8080/#/pages/tabbar/appIndex?page=sxss
	6.办事指南: http://localhost:8080/#/pages/tabbar/appIndex?page=bszn&ID=事项ID 005998375QR13609003
	7.事项列表: http://localhost:8080/#/pages/tabbar/appIndex?page=sxlb&pictureCode=主题的SORTCODE&pictureName=主题名称SORTNAME 
	8.进度查询: http://localhost:8080/#/pages/tabbar/appIndex?page=jdcx&bsnum=411323033210311A000003&username=杜廷广
	9.我的办件：http://localhost:8080/#/pages/tabbar/appIndex?page=wdbj&index=页签枚举值(0暂存件 1在办件 2办结件)
	10.热门服务:http://localhost:8080/#/pages/tabbar/appIndex/#/pages/tabbar/appIndex?page=rmfw
	
	
	
	
	1.先加载appIndex页面，onLoad中，
	    1.1 先获取accessToken, 获取到则根据accessToken获取用户信息，
		1.2 否则先 window.location.href = "http://111.6.77.67:6443/oauth/authorize?client_id=d30778ad7ff04bf389e747cf5ceb3e6c&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=redirect_uri" 去打开新页面去登录先，登录成功后回到重定向的地址 redirect_uri并且附带了Code（返回示例：redirect_uri?code=CODE&state=STATE ），设定重定向的地址为：https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appForward?source=${this.page}   重定向的地址要加上page字段
	
	登录账号: 15160418562 111111a
	
	2.在appForward页面，根据返回的code和page 进行获取accessToken（并保存accessToken），再根据accessToken获取用户信息，获取成功后根据page跳转到不同的页面
	
		localStorage.setItem('nuser', '{"id":"bf4eaef9769e47da894a950d40a0566d","nickname":"hshande","photoUrl":null,"phone":"15160418562","gender":0,"province":null,"city":null,"country":null,"address":null,"email":null,"telephone":null,"name":null,"accountStatus":0,"userGrade":0,"zipCode":null,"introduction":null,"residentProvinceCode":null,"residentCityCode":null,"residentCountyCode":null,"isUserAuth":0,"isEnterprise":0,"isAgent":0,"appId":"21b6038d3f2a4373b064ede05308547a","userAccountId":"bf4eaef9769e47da894a950d40a0566d","mztLoginInfo":null,"userToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblRpbWUiOjE2MTU2MDg4NjYxMDYsInVzZXJJZCI6ImJmNGVhZWY5NzY5ZTQ3ZGE4OTRhOTUwZDQwYTA1NjZkIiwiYWNjb3VudFVzZXJJZCI6ImJmNGVhZWY5NzY5ZTQ3ZGE4OTRhOTUwZDQwYTA1NjZkIn0.GkoOaJv8ae6HJDA1AWtLNpel8ype1EBzKhErd8fEsRnzVaO5Rwurg1aACFWjYTbPZaS7WhZ4zJQ1a2Vt7IUMcH9TdWNgulORUu-OaS5yPNpAFABMVaXp-e-cMw3pWXryeHxoRkUa9su-qfpJNJYSzlntRIQfKoLsv1vqxS1nE4rtWi7BLh_Ayy-PyuxBkOIdt-y68sDU3b1cHR-oTdnYKpQeaHErUvsiGqzcZH50Oj_Z4Rpicrr0y0Mcl1l446faliAC5kAK-g99JtH5K0yY1Y2Tm9wwy15pRbmNOx8KYA5A1Bre2XcrCwkEn3cy9MWBfDsIn48f-_dDF716alxo7Q","userAuth":{"realName":"黄山德","cardId":"350500199309043016","cardType":0,"cardTypeCn":null,"status":2,"cardFrontPicUrl":null,"cardBackPicUrl":null,"cardFrontBase64":null,"cardBackBase64":null},"enterAuth":null}')
	
	*/

	import Http from '../../static/js/nanyang_auth.js';
	import Util from '../../static/js/util.js';
	export default {
		name: "index",
		data() {
			return {
				// page: ''
			}
		},
		onLoad(options) {
			// let local = location.href;
			console.log("appIndex options:", options);
			this.getUserInfo(options);
			
		},
		methods: {
			getUserInfo(options) {
				// debugger
				let params = ''
				if (options.page != null && options.page != '') {
					// 将传递的参数都加密一下，到appForward再解密来使用
					params = encodeURIComponent(Util.base64Encode(Util.utf16to8(JSON.stringify(options))));
				}
				console.log("params:", options, params);
				let accessToken = uni.getStorageSync('ntoken');
				// debugger
				if (null != accessToken && undefined != accessToken && '' != accessToken) {
					// 如果有accessToken则直接通过accessToken获取信息即可
					let that = this;
					Http.getAppAuthUserInfo(accessToken, () => {
						console.log("page....:", that.params);
						Http.gotoPage(params);
					});
				} else {
					let redirect_uri = `${Http.redirectBaseUrl}/#/pages/tabbar/appForward?source=${params}`;
					console.log("重定向地址:",redirect_uri)
					// 否则先打开一个地址 来重定向
					let url =
						`${Http.orginAuth}oauth/authorize?client_id=${Http.client_id}&response_type=code&grant_type=authorization_code&scope=snsapi_userinfo&redirect_uri=${redirect_uri}`
					console.log('url:', url);
					// debugger
					location.replace(url);
				}
			},
		}
	}
</script>

<style>
</style>
