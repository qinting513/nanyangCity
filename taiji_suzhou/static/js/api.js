// 一些固定常量
// const post = "POST";

//默认最上层区域
const regionId = "620902";
const regionName = "肃州区";

// 域名
// const rootUrl = "http://61.178.200.43:443";
const rootUrl = "http://61.178.200.43:8200"; // 肃州的
// const rootUrl = "http://111.6.77.4:9001"  // 南阳的
// baseUrl
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

// 个人办事 法人办事
const url_business = baseUrl + "RestUnitPortalService";
const method_business = "getPictureByID";
const method_item_list = "getPermlistBySortcode";

// 新闻列表

const url_news_info = baseUrl + "RestNewsService";
const method_news_info = "list";
const method_news_detail = "search";

// 部门办事
const url_department = baseUrl + "RestRegionService";
const method_department = "getDeptlistByAreaid";
const method_region = "getregionlist";
const method_child_region = "getRegionlistByParentid";

// 部门 事项列表
const url_department_item_list = baseUrl + "RestSysDeptService";
const method_department_item_list = "getPermlistByDeptid";
const method_xz_perm_list = "getXzPermlistByDeptid";

// 搜索事项列表
const url_permname_list = baseUrl + "RestPermissionitemService";
const method_perm_permname = "getPermByPermname";

// 服务网点
const url_organization = baseUrl + "RestNetworkService";
const method_organization = "getNetworkList";

// 办事指南
const url_business_guide =
	baseUrl + "RestPermissionitemService";
const method_business_guide = "getPermissionByPermid";
const method_perm_list = "getPermListByCommon";

// 申报 获取材料
const url_base_apply_get_materail =
	baseUrl + "RestPermissionitemService";
const method_base_apply_get_materail = "getClxxByPermid";

// 获取共享的材料 getShareMaterialByPid
const url_base_apply_get_share_materail =
	baseUrl + "SpaceAttachInfoService";
const method_base_apply_get_share_materail =
	"getShareMaterialByPid";

//进度查询
const url_progress_query = baseUrl + "RestBussinessService";
const method_progress_query = "search";

// 材料上传
const url_upload_file =
	rootUrl + "/servlet/uploadMobileFileServlet";

// 上传后返回的fileId 拼接在这个url后面，即可下载图片
const url_download_file =
	rootUrl + "/servlet/downloadFileServlet?fileNo=";

//登录&注册
const url_rest_user_service_query = baseUrl + "RestUserService";
const method_login = "login"; //登录
const method_register = "registerUser"; //注册
const method_forgot_password = "forgotpassword"; //找回密码
const method_send_captcha = "SendCaptcha"; //发送验证码
const method_get_user_info = "getInfoByUserid"; //获取用户信息
const method_modify_info = "modifyinfo"; //修改用户信息
const method_modify_password = "modifypassword"; //修改密码

//我的咨询
const url_rest_advisory_service_query =
	baseUrl + "RestAdvisoryService";
const method_list = "list"; //列表
const method_submit = "submit"; //提交
const method_search = "search"; //搜索
const method_get_theme = "getTheme"; //详情
const method_submit_asked = "submitAsked"; //追加咨询

//我的投诉
const url_rest_complain_service_query =
	baseUrl + "RestComplainService";

// 我的预约
const url_my_appointment = baseUrl + "RestOnlineReserveService";
const method_my_appointment = "list";
const method_get_reserve_day = "getReserveDay"; //获取预约日期
const method_get_reserve_day_time =
	"GetReserveDayTime"; //获取预约时间
const method_cancel_my_appointment =
	"comfirm"; // 预约确认Status6、预约取消Status7
//我的评价
const url_rest_advice_service_query =
	baseUrl + "RestAdviceService";

//部门列表
const url_rest_region_service_query =
	baseUrl + "RestRegionService";
const method_dept_list = "getDeptlistByAreaid";

// 提交暂存、申报
const url_submit_apply = baseUrl + "RestOnlineDeclareService";
const method_submit_apply = "submit";

// 暂存件、 在办件、 办结件
const method_my_apply_zancunjian = "zancunjian";
const method_my_apply_zaibanjian = "zaibanjian";
const method_my_apply_banjiejian = "banjiejian";

// 根据bsnum获取ItemInfo的值
const method_base_apply_getwebhallbusiness =
	"getwebhallbusiness";

// 根据bsnum获取材料实例
const method_base_apply_getInsFormData = "getInsFormData";
const method_base_apply_getInsMaterialInfo =
	"getInsMaterialInfo";
const method_base_apply_get_getFormByPermidV2 =
	"getFormByPermidV2";

//我的邮寄地址
const url_reset_address_service_query =
	baseUrl + "RestEMSService";
const method_my_address = "getUserPostInfo";
const method_delete_address = "deleteUserPostInfo";
const method_add_address = "addUserPostInfo";
const mothod_edit_address = "modifyUserPostInfo";
// 获取办理模式
const mothod_getPermWsfwsd = "getPermWsfwsd";
// 获取递交纸质材料的网点地址
const mothod_getNetworkByPermid = "getNetworkByPermid";
// 邮政速递获取用户地址
const mothod_getUserPostInfo = "getUserPostInfo";
// 3.3.6根据事项或者流水号获取行政区
const mothod_getRegionByPermidBsnum = "getRegionByPermidBsnum";
const mothod_getBusiPostInfo = "getBusiPostInfo";

//更新
const version_base =
	"http://222.143.158.56:8666/cachepushupdate/"; //版本跟新系统
const version_check = version_base +
	"services/appupdate/GetAppDetails/a73a8d6405ad4deabf9ab1d72e95a58d"; //版本跟新查询

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
};
module.exports = {
	regionId,
	regionName,
	rootUrl,
	baseUrl,
	downloadFileURL,
	uploadFileURL,

	url_business,
	method_business,
	method_item_list,

	url_news_info,
	method_news_info,
	method_news_detail,

	url_department,
	method_department,
	method_region,
	method_child_region,

	url_department_item_list,
	method_department_item_list,
	method_xz_perm_list,

	url_permname_list,
	method_perm_permname,

	url_organization,
	method_organization,

	url_business_guide,
	method_business_guide,
	method_perm_list,

	url_base_apply_get_materail,
	method_base_apply_get_materail,
	url_base_apply_get_share_materail,
	method_base_apply_get_share_materail,
	url_progress_query,
	method_progress_query,
	url_upload_file,
	url_download_file,

	url_rest_user_service_query,
	method_login,
	method_register,
	method_forgot_password,
	method_send_captcha,
	method_get_user_info,
	method_modify_info,
	method_modify_password,

	url_rest_advisory_service_query,
	method_list,
	method_submit,
	method_search,
	method_get_theme,
	method_submit_asked,
	url_rest_complain_service_query,
	url_my_appointment,
	method_my_appointment,
	method_get_reserve_day,
	method_get_reserve_day_time,
	method_cancel_my_appointment,
	url_rest_advice_service_query,
	url_rest_region_service_query,
	method_dept_list,

	url_submit_apply,
	method_submit_apply,
	method_my_apply_zancunjian,
	method_my_apply_zaibanjian,
	method_my_apply_banjiejian,
	method_base_apply_getwebhallbusiness,
	method_base_apply_getInsFormData,
	method_base_apply_getInsMaterialInfo,
	method_base_apply_get_getFormByPermidV2,

	url_reset_address_service_query,
	method_my_address,
	method_delete_address,
	method_add_address,
	mothod_edit_address,
	mothod_getPermWsfwsd,
	mothod_getNetworkByPermid,
	mothod_getUserPostInfo,
	mothod_getRegionByPermidBsnum,
	mothod_getBusiPostInfo,
	version_base,
	version_check,
	materialNameList,
	certificateTypes,
};
