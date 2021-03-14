import Http from './nanyang_http.js'
import Util from './util.js'
import store from '../../store/index.js'

// 测试的
// const authUrl = "http://59.61.216.120:18891/" // 获取AccessToken的
// const authUserUrl = "http://59.61.216.120:18892/" //获取用户信息是92端口
// const redirectBaseUrl = "http://192.168.100.59:8080" // 回调地址
// const client_id = 'd30778ad7ff04bf389e747cf5ceb3e6c'
// const client_secret = '5610cbdcf959486da22796d64e82f82e';

// http://localhost:8080/#/pages/tabbar/appIndex?page=grbs

// 正式的 账号： 15160418562  111111a
const orginAuth = "http://111.6.77.67:6443/"

// const authUrl = "http://111.6.77.67:6443/"
// const authUserUrl = "http://111.6.77.66:6443/"

const authUrl = "https://rtxxdj.linewell.com/nanyang-auth/" // http://111.6.77.67:6443/
const authUserUrl = "https://rtxxdj.linewell.com/nanyang-authUser/" //获取用户 http://111.6.77.66:6443/

const redirectBaseUrl = "https://rtxxdj.linewell.com/nanyang" // 回调地址
const client_id = '5b51040cf71b4c09808dac61653d3c36'
const client_secret = '9f711e6124c543d69b5a472cfd1b1f0c';

// 封装的get方法
function getMethod(url) {
	return new Promise((resolve, reject) => {
		// console.log("提交时候的参数", fullUrl);
		// debugger
		uni.request({
			method: 'get',
			url: url,
			header: {
				'Content-Type': 'application/json',
				'withCredentials': 'true'
			},
			success: function(response) {
				// debugger
				resolve(response);
			},
			fail: function(error) {
				console.log("请求错误:", error)
				reject(error);
			}
		});

	})
}

// 封装的post方法
function postMethod(url, params) {
	return new Promise((resolve, reject) => {
		if (!params) {
			params = {}
		}
		// console.log("提交时候的参数", fullUrl, params);
		// console.log("请求参数:", fullUrl, params)
		uni.request({
			method: 'post',
			url: url,
			header: {
				// 'Content-Type': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data: params,
			success: function(response) {
				resolve(response.data);
			},
			fail: function(error) {
				console.log("请求错误:", error)
				reject(error);
			}
		});

	})
}


// 三大步获取用户信息 第一步：先获取code,  使用页面去获取的 在AppIndex里
// function getUserInfo(redirect_uri, callback) {
// 	let url =
// 		`${authUrl}oauth/authorize?client_id=${client_id}&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=${redirect_uri}`;
// 	getMethod(url).then(res => {
// 		console.log("res:", res);
// 		debugger
// 		getAccessToken(code, redirect_uri, callback);
// 	}).catch(err => {

// 	})
// }

// 三大步获取用户信息 第二步：根据code获取AccessToken
function getAccessToken(code, redirect_uri, callback) {
	let url =
		`${authUrl}oauth/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}`;
	postMethod(url).then(res => {
		console.log("res:", res);
		if (res.access_token && res.access_token.length > 0) {
			uni.setStorageSync('ntoken', res.access_token);
			getAppAuthUserInfo(res.access_token, callback);
		}
	}).catch(err => {
		console.log("getAccessToken err:", err);
		if (callback) {
			callback(err);
		}
	})
}

// 三大步获取用户信息 第三步：根据access_token获取用户信息
function getAppAuthUserInfo(accessToken, callback) {
	let url = `${authUserUrl}rest/tongplatform/base/auth2/resource/resource/user/userinfo?access_token=${accessToken}`
	postMethod(url).then(res => {
		console.log("res:", res);
		if (res && res.content) {
			let userInfo = res.content;
			console.log("userInfo:", userInfo);
			store.commit('updateUserInfo', userInfo); // 保存用户信息
			try {
				Http.registerUser(userInfo);
			} catch (e) {
				console.log("提交用户信息报错", e);
			}
		}
		// debugger
		if (callback) {
			callback();
		}
	}).catch(err => {
		console.log("getAppAuthUserInfo err:", err);
		if (callback) {
			callback(err);
		}
	})
}

function gotoPageWithOriginParams(params) {
	let fullUrl = redirectBaseUrl;
	switch (params.page) {
		case 'grbs': { // 1.个人办事
			fullUrl = fullUrl + '/#/pages/government_service/business_page?userType=1'
			break;
		}
		case 'qybs': { // 2.企业办事
			fullUrl = fullUrl + '/#/pages/government_service/business_page?userType=2'
			break;
		}
		case 'bmbs': { // 3.部门导航
			fullUrl = fullUrl + '/#/pages/government_service/department_page'
			break;
		}
		case 'rmsx': { // 4.热门事项
			fullUrl = fullUrl + '/#/pages/hotlist/hotlist'
			break;
		}
		case 'sxss': { // 5.事项搜索
			fullUrl = fullUrl + '/#/pages/hotlist/hotlist?type=search'
			break;
		}
		case 'bszn': { // 6.办事指南
			fullUrl = fullUrl + `/#/pages/business_guide/business_guide?ID=${params.ID || ""}`
			break;
		}
		case 'sxlb': { // 7.事项列表
			fullUrl = fullUrl +
				`/#/pages/government_service/item_list?pictureCode=${params.pictureCode || ''}&pictureName=${params.pictureName || ''}`
			break;
		}
		case 'jdcx': { // 8.进度查询
			fullUrl = fullUrl + '/#/pages/mine/schedule_query'
			break;
		}
		case 'wdbj': { // 9.我的办件
			fullUrl = fullUrl + `/#/pages/mine/my_business_page/my_business_page?index=${params.index || ''}`
			break;
		}
		case 'rmfw': { // 热门服务
			fullUrl = fullUrl + `/#/pages/hotservice/hotservice`
			break;
		}
	}
	// 处理好跳转的页面 进行跳转
	window.location.replace(fullUrl)
}

function gotoPage(paramsStr) {
	if (paramsStr == null || paramsStr == '') {
		console.log("参数为空，不知道跳转去哪里");
		return;
	}
	let params = JSON.parse(Util.base64Decode(decodeURIComponent(paramsStr)));
	if (!params.page) {
		console.log("page 为空")
		return;
	}
	console.log("携带的参数:", params);
	gotoPageWithOriginParams(params);
}


module.exports = {
	client_id,
	client_secret,
	orginAuth,
	authUrl,
	redirectBaseUrl,

	getMethod,
	postMethod,

	// getUserInfo, // 有三大步
	getAccessToken,
	getAppAuthUserInfo, // 根据access_token获取用户信息
	gotoPage,
	gotoPageWithOriginParams,
}
