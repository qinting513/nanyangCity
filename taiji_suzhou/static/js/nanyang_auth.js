import Http from './nanyang_http.js'

const redirect_uri = "http://192.168.100.59"; // "https://rtxxdj.linewell.com"
const client_id = 'd30778ad7ff04bf389e747cf5ceb3e6c'
const client_secret = '5610cbdcf959486da22796d64e82f82e';
const rootUrl = "http://59.61.216.120:18891/"

function getMethod(url) {
	return new Promise((resolve, reject) => {
		let fullUrl = rootUrl + url
		console.log("提交时候的参数", fullUrl);
		// debugger
		uni.request({
			method: 'get',
			url: fullUrl,
			header: {
				'Content-Type': 'application/json',
				'withCredentials':'true'
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

function postMethod(url, params) {
	return new Promise((resolve, reject) => {
		let fullUrl = rootUrl + url
		// console.log("提交时候的参数", fullUrl, params);
		// console.log("请求参数:", fullUrl, params)
		uni.request({
			method: 'post',
			url: fullUrl,
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


// 三大步获取用户信息
function getUserInfo(callback) {
	let url =
		`oauth/authorize?client_id=${client_id}&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=${redirect_uri}`;
	getMethod(url).then(res => {
		console.log("res:", res);
		debugger
	}).catch(err => {
		
	})
}

function getAccessToken(code) {
	let url =
		'oauth/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}';
	postMethod(url).then(res => {
		console.log("res:", res);
		if (res.code == 200) {
			getAppAuthUserInfo()
		}
	}).catch(err => {

	})
}

// 根据access_token获取用户信息
function getAppAuthUserInfo(accessToken) {
	let url = 'resource/user/base?access_token=${accessToken}'
	postMethod(url).then(res => {
		console.log("res:", res);
		uni.setStorageSync('nanyang__accessToken', accessToken);
	}).catch(err => {

	})
}

module.exports = {
	getMethod,
	postMethod,

	getUserInfo, // 有三大步
	getAppAuthUserInfo, // 根据access_token获取用户信息

}
