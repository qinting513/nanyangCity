(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabbar-appIndex"],{"17e0":function(e,t,n){"use strict";var o=n("4ea4");n("99af"),n("ac1f"),n("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n("2289")),c={name:"index",data:function(){return{page:""}},onLoad:function(e){var t=location.href;console.log("appIndex options:",e,t),this.page=e.page,this.getUserInfo()},methods:{getUserInfo:function(){var e=uni.getStorageSync("nanyang__accessToken");if(null!=e&&void 0!=e&&""!=e){var t=this;a.default.getAppAuthUserInfo(e,(function(){a.default.gotoPage(t.page)}))}else{var n="".concat(a.default.redirectBaseUrl,"/#/pages/tabbar/appForward?source=").concat(this.page);location.replace("".concat(a.default.authUrl,"oauth/authorize?client_id=").concat(a.default.client_id,"&response_type=code&grant_type=authorization_code&scope=snsapi_base&redirect_uri=").concat(n))}}}};t.default=c},2289:function(e,t,n){"use strict";var o=n("4ea4");n("99af"),n("d3b7");o(n("ff62"));var a=o(n("1edd")),c="http://59.61.216.120:18891/",s="http://59.61.216.120:18892/",r="https://rtxxdj.linewell.com/nanyang",i="82075c234fdc4e5eb5cf138de91b8acf",u="a2b39ed9d3904c5faaa7c301877aacd4";function l(e){return new Promise((function(t,n){uni.request({method:"get",url:e,header:{"Content-Type":"application/json",withCredentials:"true"},success:function(e){t(e)},fail:function(e){console.log("请求错误:",e),n(e)}})}))}function f(e,t){return new Promise((function(n,o){t||(t={}),uni.request({method:"post",url:e,header:{"Content-Type":"application/x-www-form-urlencoded"},data:t,success:function(e){n(e.data)},fail:function(e){console.log("请求错误:",e),o(e)}})}))}function d(e,t,n){var o="".concat(c,"oauth/token?code=").concat(e,"&client_id=").concat(i,"&client_secret=").concat(u,"&grant_type=authorization_code&redirect_uri=").concat(t);f(o).then((function(e){console.log("res:",e),e.access_token&&e.access_token.length>0&&(uni.setStorageSync("nanyang__accessToken",e.access_token),p(e.access_token,n))})).catch((function(e){console.log("getAccessToken err:",e),n&&n(e)}))}function p(e,t){var n="".concat(s,"resource/user/base?access_token=").concat(e);f(n).then((function(e){if(console.log("res:",e),e&&e.content){var n=e.content;console.log("userInfo:",n),a.default.commit("updateUserInfo",n)}t&&t()})).catch((function(e){console.log("getAppAuthUserInfo err:",e),t&&t(e)}))}function g(e){if(e){var t=r;switch(e){case"grbs":t+="/#/pages/government_service/business_page?userType=1";break;case"frbs":t+="/#/pages/government_service/business_page?userType=2";break;case"bmbs":t+="/#/pages/government_service/department_page";break;case"rmsx":t+="/#/pages/government_service/department_page";break;default:uni.showToast({title:"没有找到该页面",icon:"none"})}uni.redirectTo({url:t})}else console.log("page 为空")}e.exports={client_id:i,client_secret:u,authUrl:c,redirectBaseUrl:r,getMethod:l,postMethod:f,getAccessToken:d,getAppAuthUserInfo:p,gotoPage:g}},"2f51":function(e,t,n){"use strict";n.r(t);var o=n("5a36"),a=n("656b");for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);var s,r=n("f0c5"),i=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"b121d878",null,!1,o["a"],s);t["default"]=i.exports},"5a36":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view")},c=[]},"656b":function(e,t,n){"use strict";n.r(t);var o=n("17e0"),a=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=a.a},af73:function(e,t,n){"use strict";var o=n("4ea4");n("c975"),n("d3b7");var a=o(n("a317")),c=o(n("c166")),s='<?xml version="1.0" encoding="utf-8"?>',r='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',i="<soap:Body>",u="</soap:Body>",l="</soap:Envelope>";function f(e,t,n,o){return uni.showLoading({title:"数据加载中..."}),console.log("请求的url：",e,t,n),new Promise((function(c,f){null!=o&&""!=o||(o="POST");var g="<"+t+' xmlns:n0="http://service.rest2.cms.jeecms.com/"><param>'+JSON.stringify(n)+"</param></"+t+">",h=s+r+i+g+u+l;uni.request({url:e,data:h,method:o,header:{"content-type":"text/xml; charset=utf-8",SOAPAction:t},success:function(t){if(200===t.statusCode){var n=d(t.data),o=JSON.parse(n);a.default.checkResponse(o),c(o)}else console.log("请求参数:",e,h),p("错误码："+t.statusCode+"\n\t  错误信息："+t.data);uni.hideLoading()},fail:function(e){uni.hideLoading(),f(e)}})}))}function d(e){for(var t=new c.default.DOMParser,n=t.parseFromString(e,"text/xml"),o=n.getElementsByTagName("soap:Body")[0],a=o.childNodes,s=o.childNodes.length,r=0;r<s;r++)if(a[r].nodeName.indexOf("Response")>=0)for(var i=a[r].childNodes,u=0;u<i.length;u++)if(i[u].nodeName.indexOf("return")>=0)return i[u].childNodes[0].nodeValue;return""}function p(e){console.log("--------------------------我是错误分割线--------------------------"),uni.showModal({title:"提示",content:"服务请求异常"}),console.log("服务请求异常:",e),console.log("--------------------------我是错误分割线--------------------------")}e.exports={soup:f}},ff62:function(e,t,n){"use strict";var o=n("4ea4");n("d3b7");var a=o(n("af73")),c=(o(n("a317")),"411300"),s="https://rtxxdj.linewell.com/nanyang-api/",r=s+"services/",i=s+"servlet/downloadFileServlet?fileNo=",u=s+"servlet/uploadMobileFileServlet";function l(e,t){return new Promise((function(n,o){var s="root_gr_ztfl";2==e&&(s="root_qy_ztfl"),null==t&&(t=c);var i={AREAID:t,SORTCODE:s},u=r+"RestPermissionsortService";a.default.soup(u,"getSortlistBySortcode",i).then((function(e){n(e)})).catch((function(e){uni.showToast({title:"网络异常，请稍后重试",icon:"none"})}))}))}function f(){return new Promise((function(e,t){var n={PAGESIZE:1e3,PAGENO:1,SFYDSB:"1",AREAID:c},o=r+"RestRegionService";a.default.soup(o,"getDeptlistByAreaid",n).then((function(t){e(t)})).catch((function(e){uni.showToast({title:"网络异常，请稍后重试",icon:"none"})}))}))}function d(e,t,n,o){return new Promise((function(s,i){var u,l,f;n=n||"1",o=o||"1000","3"==t?(u="RestSysDeptService",l="getPermlistByDeptid",f={DEPTID:e,AREAID:c,SFYDSB:"1",PAGENO:n,PAGESIZE:o}):(f={SORTCODE:e,AREAID:c,SFYDSB:"1",PAGENO:n,PAGESIZE:o},u="RestPermissionsortService",l="getPermlistBySortcode"),u=r+u,a.default.soup(u,l,f).then((function(e){s(e)})).catch((function(e){uni.showToast({title:"网络异常，请稍后重试",icon:"none"})}))}))}function p(e){return new Promise((function(t,n){var o={PERMID:e};console.log("请求参数:",o);var c=r+"RestPermissionitemService";a.default.soup(c,"getPermissionByPermid",o).then((function(e){t(e)})).catch((function(e){uni.showToast({title:"网络异常，请稍后重试",icon:"none"})}))}))}function g(e){return new Promise((function(e,t){var n={AREAID:c};console.log("请求参数:",n);var o=r+"RestPermissionitemService";a.default.soup(o,"getHotPermList",n).then((function(t){e(t)})).catch((function(e){uni.showToast({title:"网络异常，请稍后重试",icon:"none"})}))}))}function h(e,t){return new Promise((function(n,o){var c={USERNAME:e,PASSWORD:t,TYPE:"1"},s=r+"RestUserService";a.default.soup(s,"login",c).then((function(e){n(e)})).catch((function(e){o(e)}))}))}function v(e){return 200==e.code||(uni.showToast({title:e.error,icon:"none"}),!1)}var m=["身份证","护照","军官证","士兵证","警官证","通行证","香港身份证","澳门身份证","台湾身份证","结婚证","户口本","资格证","毕业证","学位证","残疾证","退休证","许可证","执业证","营业执照","执照","证书","证件","证明材料","证明","意见书","意见","通知书","通知","委托书","说明书","说明","方案","原件","复印件","审核表","审核","手册","进编单","规范","照片","相片","章程","报告书","报告","申请表","登记表","储蓄卡","审批表","合同","名册","协议","决议","规划","大纲","制度","招标文件","报纸","文本","申请","承诺书","推荐书","申报书","资料","材料"];e.exports={regionId:c,rootUrl:s,baseUrl:r,downloadFileURL:i,uploadFileURL:u,getBusinessItems:l,getDepartmentItems:f,getItemList:d,getBusinessGuideData:p,materialNameList:m,getHotPermList:g,login:h,checkRes:v}}}]);