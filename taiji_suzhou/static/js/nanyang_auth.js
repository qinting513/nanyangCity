import Http from './nanyang_http.js'
import store from '../../store/index.js'

// const authUrl = "http://59.61.216.120:18891/"
// const authUserUrl = "http://59.61.216.120:18892/"  //获取用户信息是92端口

const authUrl = "https://rtxxdj.linewell.com/nanyang-auth/"
const authUserUrl = "https://rtxxdj.linewell.com/nanyang-authUser/" //获取用户信息是92端口

// 正式的
const redirectBaseUrl = "https://rtxxdj.linewell.com/nanyang"
const client_id = '82075c234fdc4e5eb5cf138de91b8acf'
const client_secret = 'a2b39ed9d3904c5faaa7c301877aacd4';

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
			uni.setStorageSync('nanyang__accessToken', res.access_token);
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
	let url = `${authUserUrl}resource/user/base?access_token=${accessToken}`
	postMethod(url).then(res => {
		console.log("res:", res);
		if (res && res.content) {
			let userInfo = res.content;
			console.log("userInfo:", userInfo);
			store.commit('updateUserInfo', userInfo); // 保存用户信息
		}
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

function gotoPage(page) {
	if (!page) {
		console.log("page 为空")
		return;
	}
	let fullUrl = redirectBaseUrl; // 打包到南威服务器的
	// let fullUrl = "http://localhost:8080/#/" // 本地调试的
	switch (page) {
		case 'grbs': { // 个人办事
			fullUrl = fullUrl + '/#/pages/government_service/business_page?userType=1'
			break;
		}
		case 'frbs': { // 法人办事
			fullUrl = fullUrl + '/#/pages/government_service/business_page?userType=2'
			break;
		}
		case 'bmbs': {
			fullUrl = fullUrl + '/#/pages/government_service/department_page'
			break;
		}
		case 'rmsx': {
			fullUrl = fullUrl + '/#/pages/government_service/department_page'
			break;
		}
		default: {
			uni.showToast({
				title: '没有找到该页面',
				icon: 'none'
			});
		}
	}
	// 处理好跳转的页面 进行跳转
	uni.redirectTo({
		url: fullUrl
	});
}

module.exports = {
	client_id,
	client_secret,
	authUrl,
	redirectBaseUrl,

	getMethod,
	postMethod,

	// getUserInfo, // 有三大步
	getAccessToken,
	getAppAuthUserInfo, // 根据access_token获取用户信息
	gotoPage,

}
