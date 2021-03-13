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
	
	
	
	
	1.先加载appIndex页面，onLoad中，
	    1.1 先获取accessToken, 获取到则根据accessToken获取用户信息，
		1.2 否则先 window.location.href = "http://111.6.77.67:6443/oauth/authorize?client_id=d30778ad7ff04bf389e747cf5ceb3e6c&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=redirect_uri" 去打开新页面去登录先，登录成功后回到重定向的地址 redirect_uri并且附带了Code（返回示例：redirect_uri?code=CODE&state=STATE ），设定重定向的地址为：https://rtxxdj.linewell.com/nanyang/#/pages/tabbar/appForward?source=${this.page}   重定向的地址要加上page字段
	
	登录账号: 15160418562 111111a
	
	2.在appForward页面，根据返回的code和page 进行获取accessToken（并保存accessToken），再根据accessToken获取用户信息，获取成功后根据page跳转到不同的页面
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
			/*
				localStorage.setItem('nuser', '{"id":"1632f80c937041ce8f0893b4c174ab14","nickname":"U2167728001","photoUrl":null,"phone":"15160418562","gender":0,"province":null,"city":null,"country":null,"address":null,"email":null,"telephone":null,"name":null,"accountStatus":0,"userGrade":0,"zipCode":null,"introduction":null,"residentProvinceCode":null,"residentCityCode":null,"residentCountyCode":null,"isUserAuth":0,"isEnterprise":0,"isAgent":0,"appId":"21b6038d3f2a4373b064ede05308547a","userAccountId":"1632f80c937041ce8f0893b4c174ab14","mztLoginInfo":null,"userToken":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblRpbWUiOjE2MTU1NjI0NTUxMjYsInVzZXJJZCI6IjE2MzJmODBjOTM3MDQxY2U4ZjA4OTNiNGMxNzRhYjE0IiwiYWNjb3VudFVzZXJJZCI6IjE2MzJmODBjOTM3MDQxY2U4ZjA4OTNiNGMxNzRhYjE0In0.bdR9_SLXghht-5G0cgJjGdeMpU2KpYTtpzxM0AqVVUkzAh2bY2_nwSrIp2BQbYVGpikw3vq8hntd5jeA6atdzK2sCrOLI9t4IRmy4qGvr4myih-01ZZ4Q9-kgGdlKaWZ2UBOxtMOA9XPp-6U_pH2ABYgFoaBVXZVrqIc1XEQXQTdUzgD51bKWganOHriX3qWspVviL-kbmd_gTRid0d_YYrfq-CRRR3WpBN9obdpcyy26W0eZrHGMXTRQ32nxSwKol6evGZvhPiCOchMtg9SW_ZpD2rxATiBeyx6G4GGgb82s3i92mbY9DPRZZKKJ6OCwJ6TTt8cGJNP83Sf3twmDw","userAuth":null,"enterAuth":null}')
			*/
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
