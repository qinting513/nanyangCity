import Util from './util.js';
/**SOUP 协议格式 固定不变的常量*/
const SOUP_FORMAT_TOP = '<?xml version="1.0" encoding="utf-8"?>';
const SOUP_FORMAT_ENVELOPE_START =
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
const SOUP_FORMAT_BODY_START = '<soap:Body>';
const SOUP_FORMAT_BODY_END = '</soap:Body>';
const SOUP_FORMAT_ENVELOPE_END = '</soap:Envelope>';
// const BaseURL = Api.baseUrl
/**
 * 描叙：网络请求 可以解析 SOUP协议 api 
 * 参数说明：
 * @requestType 请求方式，建议默认使用POST  
 * @url 请求url , 如：https://sqlb.mynatapp.cc/weixin.asmx?op=dzLogin  String类型
 * @soupAction 请求头SOAPAction值  String类型
 * @requestBody 请求体  XML格式字符串
 * @onSuccess 请求成功回调    函数类型
 * @onFail  请求失败回调      函数类型
 * @onComplete 请求完成回调   函数类型
 */
function soup(url, soupAction, requestBody, requestType) {
	uni.showLoading({
		title: '数据加载中...'
	});
	return new Promise(function(resolve, reject) {
		if (requestType == null || requestType == '') {
			requestType = "POST";
		}

		let requestXML = '<' + soupAction + ' xmlns:n0="http://service.rest2.cms.jeecms.com/"><param>' + JSON.stringify(
			requestBody) + '</param></' + soupAction + '>';

		let tempData = SOUP_FORMAT_TOP + SOUP_FORMAT_ENVELOPE_START + SOUP_FORMAT_BODY_START +
			requestXML +
			SOUP_FORMAT_BODY_END + SOUP_FORMAT_ENVELOPE_END;

		uni.request({
			url: url,
			data: tempData,
			method: requestType,
			header: {
				'content-type': 'text/xml; charset=utf-8',
				'SOAPAction': soupAction,
			},
			// 设置请求的 header
			success: function(res) {
				//请求正常返回，则则解析数据
				if (res.statusCode === 200) {
					let tempReturnData = dealWithData(res.data);
					//转换为JSON对象
					let jsonData = JSON.parse(tempReturnData);
					//检查登录状态
					Util.checkResponse(jsonData);
					resolve(jsonData);
				} else { //如果返回错误，直接打印错误信息           
				   console.log("请求参数:", url, tempData);
					defaultConsole("错误码：" + res.statusCode + "\n\t" + "  错误信息：" + res.data);
				}
				uni.hideLoading();
			},
			fail: function(error) {
				// console.log("请求error:", error);
				uni.hideLoading();
				reject(error);
			},
		});
	});
};

// var Parser = require('../lib/dom-parser.js');
import Parser from '../../lib/dom-parser.js';

/** 
 * 解析soup数据
 * @data 
 */
function dealWithData(data) {
	//DOM解析对象
	let parser = new Parser.DOMParser();
	//根据soup格式数据生成DOM节点
	let xmlDoc = parser.parseFromString(data, "text/xml");

	//开始解析 获取soap:Body节点数据
	let soapBody = xmlDoc.getElementsByTagName('soap:Body')[0];
	//获取soap:Body节点所有的子节点
	let childs = soapBody.childNodes;
	//获取soap:Body节点子节点的个数
	let lenght = soapBody.childNodes.length;

	for (let i = 0; i < lenght; i++) {
		//此处排查根据后端返回的规范做的判断
		//返回值中是否包含有Response节点
		if (childs[i].nodeName.indexOf('Response') >= 0) {

			let grandChildren = childs[i].childNodes;
			for (let j = 0; j < grandChildren.length; j++) {
				//返回值中是否包含有Result节点
				if (grandChildren[j].nodeName.indexOf('return') >= 0) {
					//找到结果返回
					return grandChildren[j].childNodes[0].nodeValue;
				}
			}
		}
	}

	//没有找到结果返回‘’
	return '';
}

/**
 * 默认回调
 */
function defaultCallback(data) {
	console.log("defaultCallback:", data);
}

/**
 * 默认打印数据
 */
function defaultConsole(data) {
	console.log("--------------------------我是错误分割线--------------------------")
	uni.showModal({
		title: '提示',
		content: '服务请求异常',
	});
	console.log("服务请求异常:", data);
	console.log("--------------------------我是错误分割线--------------------------")
}


/** 导出模块 */
module.exports = {
	soup: soup
}
