import WebApi from './webApi.js';
import Http from './nanyang_http.js';
import Util from './util.js';

/** 申报部分 start */

const url_submit_apply = Http.baseUrl + "RestOnlineDeclareService";

// 获取材料列表
function getMaterialList(permId) {
	return new Promise(function(resolve, reject) {
		let params = {
			"PERMID": permId
		};
		console.log("获取材料列表", params);
		let url = Http.baseUrl + 'RestPermissionitemService';
		WebApi.soup(url, "getClxxByPermid", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}
// 获取基本表单的URL路径
function getFormByPermidV2(permId) {
	return new Promise(function(resolve, reject) {
		let params = {
			"PERMID": permId,
			"ENTERANCE": "1"
		}; // ENTERANCE入口，1手机，2证照输入终端
		let url = Http.baseUrl + 'RestPermissionitemService';
		WebApi.soup(url,  "getFormByPermidV2", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}
//根据busnum 获取itemInfoModel 因为从暂存件进来没有itemInfo
function getWebhallbusiness(token, bsnum) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"BSNUM": bsnum
		}
		WebApi.soup(url_submit_apply, "getwebhallbusiness", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

// 根据bsNum获取提交过的表单实例
function getInsFormData(token, bsnum) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"BSNUM": bsnum
		}
		WebApi.soup(url_submit_apply, "getInsFormData", params).then(res => {
			if (res["code"] == 200 && res["ReturnValue"] != null) {
				let returnValue = res["ReturnValue"];
				let forms = returnValue["FORMS"];
				// 数据转换格式: decode --> xml --> json --> map
				// var bxml = utf16to8(bxml);

				let json = Util.base64Decode(forms);
				resolve(Util.formDealWithData(json))
			}
		}).catch((err) => {
			reject(err);
		});
	})
}

// 根据bsNum获取提交过的材料
function getInsMaterialInfo(token, bsnum) {
	return new Promise(function(resolve, reject) {
		let params = {
			"token": token,
			"BSNUM": bsnum
		}
		WebApi.soup(url_submit_apply, "getInsMaterialInfo", params).then(res => {
			if (res["code"] == 200 && res["ReturnValue"] != null) {
				let returnValue = res["ReturnValue"];
				let forms = returnValue["MATERIALS"];
				// 数据转换格式: decode --> xml --> json --> map
				// var bxml = utf16to8(bxml);

				let json = Util.base64Decode(forms);
				resolve(Util.materialDealWithData(json))
			}
		}).catch((err) => {
			reject(err);
		});
	})
}
//  邮寄速递 办理模式的获取
function getPermWsfwsd(permId) {

	return new Promise(function(resolve, reject) {
		let params = {
			"PERMID": permId
		};
		let url_permname_list = Http.baseUrl + "RestPermissionitemService";
		WebApi.soup(url_permname_list, "getPermWsfwsd", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

//  邮寄速递 获取递交纸质材料网点信息
function getNetworkByPermid(permId) {
	return new Promise(function(resolve, reject) {
		let params = {
			"PERMID": permId,
		};
		let url = Http.baseUrl + "RestNetworkService";
		WebApi.soup(url, "getNetworkByPermid", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}
// 3.3.6根据事项或者流水号获取行政区 获取事项归属地信息
function getRegionByPermidBsnum(permId, bsnum) {
	return new Promise(function(resolve, reject) {
		let params = {
			"PERMID": permId
		};
		if (bsnum != null) {
			params['BSNUM'] = bsnum;
		}
		let url = Http.baseUrl + "RestRegionService";
		WebApi.soup(url, "getRegionByPermidBsnum", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}
// 获取用户地址
function getUserPostInfo(userId) {
	return new Promise(function(resolve, reject) {
		let params = {
			"PAGESIZE": "20",
			"PAGENO": "1",
			"USERID": userId
		};
		let url = Http.baseUrl + "RestEMSService";
		WebApi.soup(url, "getUserPostInfo", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}
/** 申报部分数据请求 end */

function tempStore(params) {
	return new Promise(function(resolve, reject) {
		console.log("申报参数:", params);
		const url_submit_apply = Http.baseUrl + "RestOnlineDeclareService";
		return;
		WebApi.soup(url_submit_apply, "submit", params).then(res => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

// business表单信息
function getBusinessXml(type, business, userInfo) {
	let bxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><business>" +
		"<businessid><![CDATA[" +
		(business.bsnum || '') +
		"]]></businessid>" +
		"<cbusinessid><![CDATA[" +
		(business.bsnum || '') +
		"]]></cbusinessid>" +
		"<citemid><![CDATA[" +
		(business.citemid || '') +
		"]]></citemid>" +
		"<citemversion><![CDATA[" +
		(business.citemversion || '') +
		"]]></citemversion>" +
		"<permid><![CDATA[" +
		(business.permId || '') +
		"]]></permid>" +
		"<largeitemid><![CDATA[" +
		(business.largeitemid || '') +
		"]]></largeitemid>" +
		"<smallitemid><![CDATA[" +
		(business.smallitemid || '') +
		"]]></smallitemid>" +
		"<smallitemname><![CDATA[" +
		(business.smallitemname || '') +
		"]]></smallitemname>" +
		"<itemversion><![CDATA[" +
		(business.itemversion || '') +
		"]]></itemversion>" +
		"<itemlimittime><![CDATA[" +
		(business.itemlimittime || '') +
		"]]></itemlimittime>" +
		"<itemlimitunit><![CDATA[" +
		(business.itemlimitunit || '') +
		"]]></itemlimitunit>" +
		"<regionid><![CDATA[" +
		(business.regionid || '') +
		"]]></regionid>" +
		"<deptcode><![CDATA[" +
		(business.deptcode || '') +
		"]]></deptcode>" +
		"<deptname><![CDATA[" +
		(business.deptname || '') +
		"]]></deptname>" +
		"<projectname><![CDATA[" +
		(business.projectname || '') +
		"]]></projectname>" +
		"<receiptid><![CDATA[" +
		(business.bsnum || '') +
		"]]></receiptid>" +
		"<submittype><![CDATA[5]]></submittype>" +
		"<lawaddr><![CDATA[" +
		(business.lawaddr || '') +
		"]]></lawaddr>" +
		"<realaddr><![CDATA[" +
		(business.realaddr || '') +
		"]]></realaddr>" +
		"<status><![CDATA[" +
		String(type) +
		"]]></status>" +
		"<applicantid><![CDATA[" +
		(userInfo.USER_ID || '') +
		"]]></applicantid>" +
		"<state>5</state>" +
		"<sqr_type><![CDATA[" +
		(userInfo.TYPE || '') +
		"]]></sqr_type>" +
		"</business>";
	console.log("business 数据:", bxml);
	return Util.base64Encode(Util.utf16to8(bxml));
}

function getPostXmlData(postXml) {
	if (postXml == null) {
		return "";
	}
	return Util.base64Encode(Util.utf16to8(postXml));
}

// form 表单信息 点击暂存时 要将信息赋值给formData
function getFormXml(formData) {
	/*
    pid: 办理事项ID
    sqr_mc:联系人
    sqr_yddh: 移动电话
    sqr_sfzjhm: 身份证号码
    sqr_gddh: 固定电话
    sqr_gddz: 固定地址
    sqxmmc(itemName): 项目名称
    bz: 备注
  */
	let form = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><forms><data>" +
		"<dataid>" +
		(formData.dataid || '') +
		"</dataid>" +
		"<formtype>" +
		(formData.formtype || '') +
		"</formtype>" +
		"<pid>" +
		(formData.pid || '') +
		"</pid>" +
		"<bsnum>" +
		(formData.bsnum || '') +
		"</bsnum>" +
		"<formid>" +
		(formData.formid || '') +
		"</formid>" +
		"<version></version>" +
		"<sqr_mc type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqrmc || '') +
		"]]></sqr_mc>" +
		"<sqr_yddh type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqryddh || '') +
		"]]></sqr_yddh>" +
		"<sqr_sfzjhm type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqrsfzjhm || '') +
		"]]></sqr_sfzjhm>" +
		"<sqr_dzxx type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqrdzxx || '') +
		"]]></sqr_dzxx>" +
		"<sqr_gddh type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqrgddh || '') +
		"]]></sqr_gddh>" +
		"<sqr_gddz type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqrgddz || '') +
		"]]></sqr_gddz>" +
		"<sqxmmc type=\"TEXTINPUT\"><![CDATA[" +
		(formData.sqxmmc || '') +
		"]]></sqxmmc>" +
		"<zjlx type=\"COMBOBOX\"><![CDATA[" +
		(formData.zjlx || '') +
		"]]></zjlx>" +
		"<bz type=\"TEXTINPUT\"><![CDATA[" +
		(formData.bz || '') +
		"]]></bz>" +
		"</data></forms>";
	console.log("form 数据:", form);
	return Util.base64Encode(Util.utf16to8(form));
}

// 材料表单信息
// 页面显示的材料列表 responseMaterialList （数组类型）
// 用户上传的材料信息 materialFiles (map类型)
function getMaterialXml(responseMaterialList, materialFiles, formData) {
	var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><materials>";
	for (let i = 0; i < responseMaterialList.length; i++) {
		let materialInfo = responseMaterialList[i];

		xml += "<materialinfo><id><![CDATA[]]></id>" +
			"<materialid><![CDATA[" +
			(materialInfo.ID || '') +
			"]]></materialid>" +
			"<materialname><![CDATA[" +
			(materialInfo.CLMC || '') +
			"]]></materialname>" +
			"<materialcode><![CDATA[" +
			(materialInfo.ID || '') +
			"]]></materialcode>" +
			"<submittype><![CDATA[" +
			(materialInfo.DZHYQ || '') +
			"]]></submittype>" +
			"<orinum><![CDATA[]]></orinum><copynum><![CDATA[]]></copynum>" +
			"<isneed><![CDATA[" +
			(materialInfo.SFBY || '') +
			"]]></isneed>" +
			"<status><![CDATA[" +
			(materialInfo.STATUS || '') +
			"]]></status>" +
			"<formid><![CDATA[]]></formid>" +
			"<formver><![CDATA[]]></formver>" +
			"<dataid><![CDATA[]]></dataid>" +
			"<remark><![CDATA[]]></remark>" +
			"<username><![CDATA[" +
			(formData.realName || '') +
			"]]></username>";

		if (materialFiles != null) {
			let fileList = materialFiles[materialInfo.ID];
			/* {
			  "id": responseFileID,
			  "fileid": responseFileID,
			  "filepath": fileId,
			  "filedel": "",
			  "filename": fileName,
			  "filetype": 'img'
			  } */
			// 数据结构: { 'itemID1': [imgObj1, fileObj2, imgObj3], 'itemID2': [] }
			if (fileList != null && fileList.length > 0) {
				for (let j in fileList) {
					let file = fileList[j];
					xml += "<file>";
					xml += "<fileid><![CDATA[" +
						file["fileid"] +
						"]]></fileid>" +
						"<filename><![CDATA[" +
						file["filename"] +
						"]]></filename>" +
						"<filepath><![CDATA[" +
						file["filepath"] +
						"]]></filepath>" +
						"<filedel><![CDATA[" +
						file["filedel"] +
						"]]></filedel>";
					xml += "</file>";
				}
			}
		}
		xml += "</materialinfo>";
	}
	xml += "</materials>";

	console.log("material 数据:", xml);
	return Util.base64Encode(Util.utf16to8(xml));
}


module.exports = {
	getMaterialList,
	getFormByPermidV2,
	getWebhallbusiness,
	getInsFormData,
	getInsMaterialInfo,
	getPermWsfwsd,
	getRegionByPermidBsnum,
	getNetworkByPermid,
	getUserPostInfo,
	getPostXmlData,
	tempStore,
	getBusinessXml,
	getFormXml,
	getMaterialXml,
}
