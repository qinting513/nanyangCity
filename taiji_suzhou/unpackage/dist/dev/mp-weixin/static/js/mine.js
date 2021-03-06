import Api from './api.js'
import WebApi from './webApi.js';
/** 个人中心 */

//我的办件
function getMyBusiness(token, userId, type) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"APPLICANTID": userId,
			"PAGENO": "1",
			"PAGESIZE": "1000"
		};
		var method = "";
		switch (type) {
			case 0:
				method = Api.method_my_apply_zancunjian;
				break;
			case 1:
				method = Api.method_my_apply_zaibanjian;
				break;
			case 2:
				method = Api.method_my_apply_banjiejian;
				break;
			default:
		}

		WebApi.soup(Api.url_submit_apply, method, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}


//预约
//部门列表
function getDeptList() {
	return new Promise(function(resolve, reject) {
		let params = {
			"RESERVEONE": "",
			"AREAID": Api.regionId,
			"PAGENO": "1",
			"PAGESIZE": "1000"
		};

		WebApi.soup(Api.url_rest_region_service_query, Api.method_dept_list, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//获取事项
function getBusinessList(DEPTID) {
	return new Promise(function(resolve, reject) {
		let params = {
			"DEPTID": DEPTID,
			"AREAID": Api.regionId,
			"SFYDSB": "0"
		};

		WebApi.soup(Api.url_department_item_list, Api.method_department_item_list, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//获取日期
function getAppointmentDate(DEPTID, PERMID, token) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"DEPTID": DEPTID,
			"PERMID": PERMID
		};

		WebApi.soup(Api.url_my_appointment, Api.method_get_reserve_day, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//获取日期
function getAppointmentTime(DEPTID, PERMID, DAY, token) {
	return new Promise(function(resolve, reject) {
		let params = {
			"DAY": DAY,
			"PERMID": PERMID,
			"token": token,
			"DEPTID": DEPTID
		};

		WebApi.soup(Api.url_my_appointment, Api.method_get_reserve_day_time, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//提交预约
function submitAppointment(DEPTID, PERMID, DAY, RESERVETIME, token, APPLICANTID) {
	return new Promise(function(resolve, reject) {
		let params = {
			"DEPTID": DEPTID,
			"APPLICANTID": APPLICANTID,
			"RESERVEDATE": DAY,
			"PERMID": PERMID,
			"RESERVETIME": RESERVETIME,
			"token": token
		};

		WebApi.soup(Api.url_my_appointment, Api.method_submit, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//取消预约
function cancelMyAppointment(ID, token) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"ID": ID,
			"STATUS": "7"
		};
		WebApi.soup(Api.url_my_appointment, Api.method_cancel_my_appointment, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//我的预约
function getMySubscribe(token, userId, type) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"APPLICANTID": userId,
			"PAGENO": '1',
			"PAGESIZE": '1000',
		};

		WebApi.soup(Api.url_my_appointment, Api.method_my_appointment, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

export default {
	getMyBusiness,
	getMySubscribe,
	getDeptList,
	getBusinessList,
	getAppointmentDate,
	getAppointmentTime,
	submitAppointment,
	cancelMyAppointment
}
