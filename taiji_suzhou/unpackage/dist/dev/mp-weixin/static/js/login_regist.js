import Api from './api.js'
import WebApi from './webApi.js';


//登录
function login(userName, pwd) {
	return new Promise(function(resolve, reject) {
		let params = {
			'USERNAME': userName,
			'PASSWORD': pwd,
			"TYPE": "1"
		};
		WebApi.soup(Api.url_rest_user_service_query, Api.method_login, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//发送验证码
function sendCaptcha(mobile, type) {
	return new Promise(function(resolve, reject) {
		let params = {
			'MOBILE': mobile,
			'TYPE': type
		};
		WebApi.soup(Api.url_rest_user_service_query, Api.method_send_captcha, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//注册
function regist(params) {
	return new Promise(function(resolve, reject) {
		WebApi.soup(Api.url_rest_user_service_query, Api.method_register, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//找回密码
function findPwd(params) {
	return new Promise(function(resolve, reject) {
		WebApi.soup(Api.url_rest_user_service_query, Api.method_forgot_password, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

function checkRes(res) {
	if (res.code == 200) {
		return true
	} else {
		uni.showToast({
			title:res.error,
			icon:'none'
		})
		return false
	}
}

export default {
	login,
	sendCaptcha,
	regist,
	findPwd,
	checkRes
}
