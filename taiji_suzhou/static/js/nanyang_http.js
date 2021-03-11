import WebApi from './webApi.js';
import Util from './util.js';


const regionId = "411300";
const regionName = "南阳市";

// 注意一个斜扛已经写在后面了
// const rootUrl = "http://111.6.77.4:9001/" // 南阳的
const rootUrl = "https://rtxxdj.linewell.com/nanyang-api/"  // 映射的地址是 http://111.6.77.4:9001/
const baseUrl = rootUrl + "services/"; 

// 图片的baseURL
const downloadFileURL =
	rootUrl + "servlet/downloadFileServlet?fileNo=";
const uploadFileURL =
	rootUrl + "servlet/uploadMobileFileServlet";

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
			// reject(err);  
			uni.showToast({
				title: '网络异常，请稍后重试',
				icon: 'none'
			});
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
			// reject(err);  
			uni.showToast({
				title: '网络异常，请稍后重试',
				icon: 'none'
			});
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

		if (userType == '3') { // 获取部门的事项列表
			url = "RestSysDeptService";
			method = "getPermlistByDeptid";
			params = {
				"DEPTID": pictureCode,
				"AREAID": regionId,
				"SFYDSB": "1",
				"PAGENO": pageNo,
				"PAGESIZE": pageSize
			};
		} else {
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
		// debugger
		WebApi.soup(url, method, params).then(res => {
			// debugger
			resolve(res);
		}).catch((err) => {
			// reject(err);  
			uni.showToast({
				title: '网络异常，请稍后重试',
				icon: 'none'
			});
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
		let url = baseUrl + 'RestPermissionitemService'
		WebApi.soup(url, "getPermissionByPermid", params).then(res => {
			resolve(res);
		}).catch((err) => {
			// reject(err);  
			uni.showToast({
				title: '网络异常，请稍后重试',
				icon: 'none'
			});
		});
	})
}

// 获取热门事项列表
function getHotPermList(permId) {
	return new Promise(function(resolve, reject) {
		let params = {
			"AREAID": regionId,
		};
		console.log("请求参数:", params);
		let url = baseUrl + 'RestPermissionitemService'
		WebApi.soup(url, "getHotPermList", params).then(res => {
			resolve(res);
		}).catch((err) => {
			// reject(err); 
			uni.showToast({
				title: '网络异常，请稍后重试',
				icon: 'none'
			});
		});
	})
}



//登录
function login(userName, pwd) {
	return new Promise(function(resolve, reject) {
		let params = {
			'USERNAME': userName,
			'PASSWORD': pwd,
			"TYPE": "1"
		};
		let url = baseUrl + 'RestUserService'
		WebApi.soup(url, "login", params).then(res => {
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
			title: res.error,
			icon: 'none'
		})
		return false
	}
}

function getPermByPermname(name, deptId) {
	// getPermByPermname
	return new Promise(function(resolve, reject) {
		let params = {"PERMNAME": name, "AREAID": "411300"};
		if(deptId) {
			params['DEPTID'] = deptId;
		}
		let url = baseUrl + 'RestPermissionitemService'
		WebApi.soup(url, "getPermByPermname", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//  单点登录获得的用户数据，进行提交到我们的库
function registerUserInfo(){
	return new Promise(function(resolve, reject) {
		let params = {"PERMNAME": name, "AREAID": "411300"};
		if(deptId) {
			params['DEPTID'] = deptId;
		}
		
		let url = baseUrl + 'RestUserService'
		WebApi.soup(url, "registerUser", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

const materialNameList = [
	"身份证",
	"护照",
	"军官证",
	"士兵证",
	"警官证",
	"通行证",
	"香港身份证",
	"澳门身份证",
	"台湾身份证",
	"结婚证",
	"户口本",
	"资格证",
	"毕业证",
	"学位证",
	"残疾证",
	"退休证",
	"许可证",
	"执业证",
	"营业执照",
	"执照",
	"证书",
	"证件",
	"证明材料",
	"证明",
	"意见书",
	"意见",
	"通知书",
	"通知",
	"委托书",
	"说明书",
	"说明",
	"方案",
	"原件",
	"复印件",
	"审核表",
	"审核",
	"手册",
	"进编单",
	"规范",
	"照片",
	"相片",
	"章程",
	"报告书",
	"报告",
	"申请表",
	"登记表",
	"储蓄卡",
	"审批表",
	"合同",
	"名册",
	"协议",
	"决议",
	"规划",
	"大纲",
	"制度",
	"招标文件",
	"报纸",
	"文本",
	"申请",
	"承诺书",
	"推荐书",
	"申报书",
	"资料",
	"材料"
];

module.exports = {
	regionId,
	rootUrl,
	baseUrl,
	downloadFileURL,
	uploadFileURL,


	getBusinessItems,
	getDepartmentItems,
	getItemList,
	getBusinessGuideData,
	materialNameList,
	getHotPermList,
	login,
	checkRes,
	getPermByPermname,
}
