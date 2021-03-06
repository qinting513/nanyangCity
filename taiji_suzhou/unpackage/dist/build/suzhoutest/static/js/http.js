import WebApi from './webApi.js';
import Api from './api.js';
import Util from './util.js';

// 获取个人办事或法人办事事项
function getBusinessItems(userType, areaId) {
	return new Promise(function(resolve, reject) {
		let parentId = "root_gr_ztfl"; // 默认是个人的
		if (userType == 2) { // 法人的
			parentId = "root_qy_ztfl";
		}
		if (areaId == null) {
			areaId = Api.regionId;
		}
		let params = {
			"ID": areaId,
			"PARENTID": parentId
		};
		WebApi.soup(Api.url_business, Api.method_business, params).then(res => {
			// console.log("请求结果:", res);
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	});
}
// 获取部门办事
function getDepartmentItems() {
	return new Promise(function(resolve, reject) {
		let params = {
			"PAGESIZE": 1000,
			"PAGENO": 1,
			"AREAID": Api.regionId
		};
		WebApi.soup(Api.url_department, Api.method_department, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}
// 获取网点导航
function getNetworkList() {
	return new Promise(function(resolve, reject) {
		WebApi.soup(Api.url_organization, Api.method_organization, {}).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}


// 新闻资讯
function getNewsList() {
	return new Promise(function(resolve, reject) {
		let params = {
			"CHANNEL_ID": "447895",
			"PAGENO": "1",
			"PAGESIZE": "10"
		}
		WebApi.soup(Api.url_news_info, Api.method_news_info, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	});
}

// 获取事项列表
// 部门办事的时候 departmentId就是pictureCode的值
function getItemList(pictureCode, userType, pageNo, pageSize) {
	return new Promise(function(resolve, reject) {
		let url;
		let method;
		let params;
		pageNo = pageNo || "1";
		pageSize = pageSize || "1000";

		if (userType == '3') {
			url = Api.url_department_item_list;
			method = Api.method_department_item_list;
			params = {
				"DEPTID": pictureCode,
				"AREAID": Api.regionId,
				"SFYDSB": "1",
				"PAGENO": pageNo,
				"PAGESIZE": pageSize
			};
		}
		//  else if (userType == 'department_list') {
		// 	url = Api.url_department_item_list;
		// 	method = Api.method_xz_perm_list;
		// 	params = {
		// 		"DEPTID": pictureCode
		// 	};
		// } 
		else {
			// 个人、企业办事
			params = {
				"SORTCODE": pictureCode,
				"AREAID": Api.regionId,
				"SFYDSB": "1",
				"PAGENO": pageNo,
				"PAGESIZE": pageSize
			};
			url = Api.url_business;
			method = Api.method_item_list;
		}
		WebApi.soup(url, method, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	});
}
// 获取办事指南
function getBusinessGuideData(permId) {
	return new Promise(function(resolve, reject) {
		let params = {
			"PERMID": permId
		};
		console.log("请求参数:", params);
		WebApi.soup(Api.url_business_guide, Api.method_business_guide, params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

module.exports = {
	getBusinessItems,
	getDepartmentItems,
	getNewsList,
	getNetworkList,
	getItemList,
	getBusinessGuideData,

}
