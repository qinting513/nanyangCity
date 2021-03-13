// 检查返回的结果值
var isFlag = true;

function checkResponse(res) {
	// if (res.code == "403" || res.code == "401") {
	// 	if (isFlag) {
	// 		isFlag = false;
	// 		setTimeout(() => {
	// 			isFlag = true
	// 		}, 3000)
	// 		uni.navigateTo({
	// 			url: '/pages/login/login'
	// 		})
	// 	}

	// 	return false;
	// }
	return true;
}

function base64Encode(str) { // 编码，配合encodeURIComponent使用
	var c1, c2, c3;
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var i = 0,
		len = str.length,
		strin = '';
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			strin += base64EncodeChars.charAt(c1 >> 2);
			strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
			strin += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			strin += base64EncodeChars.charAt(c1 >> 2);
			strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			strin += base64EncodeChars.charAt((c2 & 0xF) << 2);
			strin += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		strin += base64EncodeChars.charAt(c1 >> 2);
		strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		strin += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		strin += base64EncodeChars.charAt(c3 & 0x3F)
	}
	// console.log(strin);
	return strin
}

function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}

// 解码，配合decodeURIComponent使用
function base64Decode(input) {
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = base64EncodeChars.indexOf(input.charAt(i++));
		enc2 = base64EncodeChars.indexOf(input.charAt(i++));
		enc3 = base64EncodeChars.indexOf(input.charAt(i++));
		enc4 = base64EncodeChars.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	return utf8Decode(output);
}


function utf8Decode(utftext) { // utf-8解码
	var string = '';
	let i = 0;
	let c = 0;
	let c1 = 0;
	let c2 = 0;
	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c1 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
			i += 2;
		} else {
			c1 = utftext.charCodeAt(i + 1);
			c2 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
			i += 3;
		}
	}
	return string;
}

function isEmpty(va) {
	if (va != "" && va != null && va != "null" && va != undefined) {
		return false;
	} else {
		return true;
	}
}

import Parser from '../../lib/dom-parser.js';

function formDealWithData(data) {
	//DOM解析对象
	let parser = new Parser.DOMParser();
	//根据soup格式数据生成DOM节点
	let xmlDoc = parser.parseFromString(data, "text/xml");

	//开始解析 获取soap:Body节点数据
	let soapBody = xmlDoc.getElementsByTagName('data')[0];
	//获取soap:Body节点所有的子节点
	let childs = soapBody.childNodes;
	//获取soap:Body节点子节点的个数
	let lenght = soapBody.childNodes.length;
	var json = {}

	for (let i = 0; i < lenght; i++) {
		//此处排查根据后端返回的规范做的判断
		//返回值中是否包含有Response节点
		let node = childs[i];
		let key = node.nodeName
		let grandChildren = node.childNodes;
		var value = null;
		if (grandChildren.length > 0) {
			value = grandChildren[0].nodeValue
		}

		json[key] = value
	}
	console.log(json)

	//没有找到结果返回‘’
	return json;
}

function materialDealWithData(data) {
	//DOM解析对象
	let parser = new Parser.DOMParser();
	//根据soup格式数据生成DOM节点
	let xmlDoc = parser.parseFromString(data, "text/xml");

	//开始解析 获取soap:Body节点数据
	let materialinfos = xmlDoc.getElementsByTagName('materialinfo');

	var jsonArr = []

	for (let i = 0; i < materialinfos.length; i++) {
		var json = {}
		let nodeChildren = materialinfos[i].childNodes;
		if (nodeChildren) {
			var fileArr = []
			for (var j = 0; j < nodeChildren.length; j++) {
				let node = nodeChildren[j]
				if (node) {
					let childNodeChilds = node.childNodes
					if (childNodeChilds) {
						let key = node.nodeName
						if (key == 'file') {
							var fileJson = {}
							for (var k = 0; k < childNodeChilds.length; k++) {
								let fileNode = childNodeChilds[k]
								let fileNodeChilds = fileNode.childNodes
								if (fileNodeChilds) {
									fileJson[fileNode.nodeName] = fileNodeChilds[0] ? fileNodeChilds[0].nodeValue : ''
								}
							}
							fileArr.push(fileJson)
						} else {
							var value = null;
							value = childNodeChilds[0]? childNodeChilds[0].nodeValue : ''
							json[key] = value
						}

					}
				}
				json["file"] = fileArr
			}
		}
		jsonArr.push(json)
	}
	console.log(jsonArr)

	return jsonArr;
}

function checkIDCard(type, id) {
	/*
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
	*/
	if (type === '10') { // 身份证
		const regIdCard =
			/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		if (!regIdCard.test(id)) {
			return false;
		} else {
			return true;
		}
	} else if (type === '20') { // 普通护照
		return (id.length != 0);
	} else if (type == '14') { // 
		return (id.length == 11);
	} else if (type == '15') {
		return (id.length == 8);
	} else {
		// 其余的没法判断
		return (id.length != 0);
	}
}

function isEmail(s) {
	return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(s);
}
function checkMobile(value) {
  if (!(/^1[3456789]\d{9}$/.test(value))) {
    return false;
  } else {
    return true;
  }
}
module.exports = {
	checkResponse: checkResponse,
	base64Decode,
	base64Encode,
	utf16to8,
	utf8Decode,
	isEmpty,
	checkIDCard,
	isEmail,
	formDealWithData,
	materialDealWithData,
	checkMobile,
}
