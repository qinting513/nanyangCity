import WebApi from './webApi.js';
import Util from './util.js';


const regionId = "411300";
const regionName = "南阳市";

// 注意一个斜扛已经写在后面了
// const rootUrl = "http://111.6.77.4:9001/" // 南阳的外网
// const rootUrl = "http://192.168.130.4:9001/" // 南阳的内网
const rootUrl = "https://rtxxdj.linewell.com/nanyang-api/" // 映射的地址是 http://111.6.77.4:9001/
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

const certificateTypes = {
	"10": "身份证",
	"20": "护照",
	"11": "军官证",
	"12": "士兵证",
	"13": "警官证",
	"14": "港澳居民来往内地通行证",
	"15": "台湾居民来往大陆通行证",
	"16": "香港身份证",
	"17": "澳门身份证",
	"18": "台湾身份证",
}

const cerArr = [{
		id: 0,
		label: '身份证',
		value: '10'
	},
	{
		id: 1,
		label: '护照',
		value: '20'
	},
	{
		id: 2,
		label: '军官证',
		value: '11'
	},
	{
		id: 3,
		label: '士兵证',
		value: '12'
	},
	{
		id: 4,
		label: '警官证',
		value: '13'
	},
	{
		id: 5,
		label: '港澳居民来往内地通行证',
		value: '14'
	},
	{
		id: 6,
		label: '台湾居民来往大陆通行证',
		value: '15'
	},
	{
		id: 7,
		label: '香港身份证',
		value: '16'
	},
	{
		id: 8,
		label: '澳门身份证',
		value: '17'
	},
	{
		id: 9,
		label: '台湾身份证',
		value: '18'
	},
]

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
		let params = {
			"PERMNAME": name,
			"AREAID": "411300"
		};
		if (deptId) {
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
function registerUser(user) {
	if (user == null || user == undefined) {
		return;
	}
	// debugger
	return new Promise(function(resolve, reject) {
		let method = "";
		let params = {};
		if (user && user.enterAuth) { // 一般进到我们系统的都是有认证信息了的 要么有enterAuth 要么有userAuth
			// 法人注册
			if (user.gender == 2) {
				user.gender = 0;
			}

			params = {
				"USERNAME": user.id || "",
				"PASSWORD": "123456",
				"EMAIL": user.email || "",
				"INC_NAME": user.enterAuth.enterName || "", // 企业名称
				"INC_TYPE": user.enterAuth.orgType || "", //"企业类型，1国有，2民营，3外资，4港澳台资，5其他",
				"INC_PERMIT": user.enterAuth.licenseId || "", // 营业执照
				"INC_ZZJGDM": user.enterAuth.orgId || "", // 组织机构代码
				"TYSHXYDM": user.enterAuth.licenseId || "",
				"INC_DEPUTY": "法人代表",
				"INC_PID": user.enterAuth.corporationCardId || "", // 法人身份证号码
				"INC_ADDR": user.enterAuth.address || "",
				"INC_INDICIA": "000000",
				"INC_PHONE": user.enterAuth.contactTelephone || "",
				"INC_FAX": "",
				"INC_NETWORK": "",
				"INC_EMAIL": "",
				"AGE_NAME": user.name || "", // 经办人姓名
				"AGE_PID": user.enterAuth.corporationCardId || "", // 经办人身份证
				"AGE_EMAIL": user.email || "",
				"AGE_MOBILE": user.enterAuth.contactTelephone || "",
				"AGE_PHONE": user.enterAuth.contactTelephone || "",
				"AGE_INDICIA": "000000",
				"USER_SOURCE": "2",
				"AUTH_TYPE": "1,2",
				"AUTH_MSG": JSON.stringify(user.enterAuth || ""),
				"INC_DEPUTY_TYPE": "1", // "法人类型，1企业法人，2事业单位，3行政机关，4社团，5其他",
				"INC_DEPUTY_MOBILE": user.phone || "",
				"INC_CARDTYPE": user.enterAuth.corporationCardId || "",
				"AGE_CARDTYPE": user.enterAuth.corporationCardType || "",
			}
			method = 'registerInc'
		} else {
			// 个人注册
			// 从南威库里获取： 1:男 2:女 3:未知
			// 南阳库： 性别，0女，1男，空表示保密
			if (user.gender == 2) {
				user.gender = 0;
			}
			// debugger
			params = {
				"USERNAME": user.id || "",
				"PASSWORD": "123456",
				"EMAIL": user.email || "",
				// "REALNAME": user.userAuth.realName || "",
				"USER_GENDER": user.gender || "",
				"CERTIFICATETYPE": '1', // 证件类型
				// "USER_PID": user.userAuth.cardId || "", // 证件号码
				"USER_PHONE": user.phone || "",
				"USER_MOBILE": user.phone || "",
				"USER_ADDRESS": user.address || "",
				"USER_SOURCE": "2",
				// "AUTH_MSG": JSON.stringify(user.userAuth || ""),
			}
			if (user.userAuth) {
				params["REALNAME"] = user.userAuth.realName || user.nickname || "";
				params["USER_PID"] = user.userAuth.cardId || ""; // 证件号码
				params["AUTH_MSG"] = JSON.stringify(user.userAuth || "");
			}
			method = 'registerUser'
		}
		let url = baseUrl + 'RestUserService'
		console.log("用户信息提交:", params);
		debugger
		WebApi.soup(url, "registerUser", params).then(res => {
			console.log("用户信息提交成功:", res);
			let list = uni.getStorageSync('nRegiterIds') || [];
			list.push(user.id);
			uni.setStorageSync('nRegiterIds', list)
			resolve(res);
		}).catch((err) => {
			console.log("用户信息提交失败:", err);
			reject(err);
		});
	})
}

function checkUserByPid(type, idcardNum, isAgent) {
	return new Promise(function(resolve, reject) {
		let url = baseUrl + 'RestUserService'
		let params = {
			"TYPE": type,
			"PID": idcardNum
		}
		if (isAgent) {
			params['ISAGE'] = isAgent || "1"; // 选择个人时，该值为空，选择企业时，需判断，1企业法人，2经办人
		}
		WebApi.soup(url, "checkByPid", params).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err)
		})
	})
}

function getBusinessProcess(params) {
	return new Promise(function(resolve, reject) {
		let url = baseUrl + 'RestBussinessService'
		WebApi.soup(url, "search", params).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err)
		})
	})
}


//我的办件
function getMyBusiness(token, userId, type) {
	return new Promise(function(resolve, reject) {
		let params = {
			// "token": token,
			"APPLICANTID": userId,
			"PAGENO": "1",
			"PAGESIZE": "1000"
		};
		var method = "";
		switch (type) {
			case 0:
				method = "zancunjian";
				break;
			case 1:
				method = "zaibanjian";
				break;
			case 2:
				method = "banjiejian"
				break;
			default:
		}
		let url_submit_apply = baseUrl + 'RestOnlineDeclareService'
		WebApi.soup(url_submit_apply, method, params).then(res => {
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
			"AREAID": regionId,
			"PAGENO": "1",
			"PAGESIZE": "1000"
		};
		let url = baseUrl + 'RestRegionService'
		WebApi.soup(url, "getDeptlistByAreaid", params).then(res => {
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
			"AREAID": regionId,
			"SFYDSB": "0"
		};
		let url = baseUrl + "RestSysDeptService"
		WebApi.soup(url, "getPermlistByDeptid", params).then(res => {
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
		let url = baseUrl + 'RestOnlineReserveService'
		WebApi.soup(url, "getReserveDay", params).then(res => {
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
		let url = baseUrl + 'RestOnlineReserveService'
		WebApi.soup(url, "GetReserveDayTime", params).then(res => {
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
		let url = baseUrl + 'RestOnlineReserveService'
		WebApi.soup(url, "submit", params).then(res => {
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
		let url = baseUrl + 'RestOnlineReserveService'
		WebApi.soup(url, "comfirm", params).then(res => {
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
			"APPLICANTID": userId, // 身份证
			"PAGENO": '1',
			"PAGESIZE": '1000',
		};
		let url = baseUrl + 'RestOnlineReserveService'
		WebApi.soup(url, "list", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

module.exports = {
	regionId,
	rootUrl,
	baseUrl,
	downloadFileURL,
	uploadFileURL,
	certificateTypes,
	cerArr,
	materialNameList,

	getBusinessItems,
	getDepartmentItems,
	getItemList,
	getBusinessGuideData,
	getHotPermList,
	login,
	checkRes,
	getPermByPermname,
	registerUser,
	checkUserByPid,
	getBusinessProcess,

	// mine.js
	getMyBusiness,
	getMySubscribe,
	getDeptList,
	getBusinessList,
	getAppointmentDate,
	getAppointmentTime,
	submitAppointment,
	cancelMyAppointment
}
