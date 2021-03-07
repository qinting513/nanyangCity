import WebApi from './webApi.js';
import Util from './util.js';


const regionId = "411300";
const regionName = "南阳市";

const rootUrl = "http://111.6.77.4:9001"  // 南阳的
const baseUrl = rootUrl + "/services/";

// 图片的baseURL
const downloadFileURL =
	rootUrl + "/servlet/downloadFileServlet?fileNo=";
const uploadFileURL =
		rootUrl + "/servlet/uploadMobileFileServlet";

// SOAP 协议格式 固定不变的常量
const soap_format_top =
	'<?xml version="1.0" encoding="utf-8"?>';
const soap_format_envelop_start =
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
const soap_format_body_start = '<soap:Body>';
const soap_format_body_end = '</soap:Body>';
const soap_format_envelop_end = '</soap:Envelope>';

// 获取个人办事或法人办事事项
function getBusinessItems(userType, areaId) {
	return new Promise(function(resolve, reject) {
		let parentId = "root_gr_ztfl"; // 默认是个人的
		if (userType == 2) { // 法人的
			parentId = "root_qy_ztfl";
		}
		if (areaId == null) {
			areaId = regionId;
		}
		let params = {
			"AREAID": areaId,
			"SORTCODE": parentId
		};
		let url = baseUrl + 'RestPermissionsortService'
		WebApi.soup(url, "getSortlistBySortcode", params).then(res => {
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
			"SFYDSB": "1",
			"AREAID": regionId
		};
		let url = baseUrl + 'RestRegionService'
		WebApi.soup(url, "getDeptlistByAreaid", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
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
			url = "RestSysDeptService";
			method = "getPermlistByDeptid";
			params = {
				"DEPTID": pictureCode,
				"AREAID": regionId,
				"SFYDSB": "1",
				"PAGENO": pageNo,
				"PAGESIZE": pageSize
			};
		}
		else {
			// 个人、企业办事
			params = {
				"SORTCODE": pictureCode,
				"AREAID": regionId,
				"SFYDSB": "1",
				"PAGENO": pageNo,
				"PAGESIZE": pageSize
			};
			url = "RestPermissionsortService";
			method = "getPermlistBySortcode";
		}
		url = baseUrl + url
		debugger
		WebApi.soup(url, method, params).then(res => {
			debugger
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	});
}




module.exports = {
	regionId,
	rootUrl,
	baseUrl,
	downloadFileURL,
	uploadFileURL,
	
	getBusinessItems,
	getDepartmentItems,
	getItemList,

}
