(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-register_info"],{"103d":function(t,n,i){var e=i("d184");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=i("4f06").default;a("71906078",e,!0,{sourceMap:!1,shadowMode:!1})},"15d2":function(t,n,i){"use strict";var e=i("103d"),a=i.n(e);a.a},"5b74":function(t,n,i){"use strict";var e=i("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e(i("cd60")),s=e(i("8811")),o=e(i("397e")),r=(i("2f62"),{components:{inputView:s.default,normalBtn:o.default},data:function(){return{index:0,array:["身份证","护照","军官证","士兵证","警官证","港澳居民来往内地通行证","台湾居民来往大陆通行证","香港身份证","澳门身份证","台湾身份证"],cardID:["10","20","11","12","13","14","15","16","17","18"],parms:{}}},onLoad:function(t){this.parms["USERNAME"]=t.mobile,this.parms["USER_MOBILE"]=t.mobile,this.parms["USER_SOURCE"]="0",this.parms["CERTIFICATETYPE"]="10"},methods:{back:function(t){uni.navigateBack({})},bindInputChange:function(t,n,i){"cardType"==n&&(this.parms["CERTIFICATETYPE"]=this.cardID[i]),this.parms[n]=t},regist:function(t){void 0!=this.parms["REALNAME"]&&0!=this.parms["REALNAME"].length?void 0!=this.parms["USER_PID"]&&0!=this.parms["USER_PID"].length?void 0==this.parms["PASSWORD"]||this.parms["PASSWORD"].length<6?this.showToast("请输入不少于6位的用户密码"):this.parms["PASSWORD"]==this.parms["confirmPWD"]?(console.log(this.parms),a.default.regist(this.parms).then((function(t){console.log(t),a.default.checkRes(t)&&(uni.showToast({title:"注册成功!"}),setTimeout((function(t){uni.navigateBack({delta:3})}),1500))}))):this.showToast("两次输入的密码不正确"):this.showToast("请输入证件号码"):this.showToast("请输入姓名")},showToast:function(t){uni.showToast({title:t,icon:"none"})}}});n.default=r},"919d":function(t,n,i){"use strict";i.r(n);var e=i("5b74"),a=i.n(e);for(var s in e)"default"!==s&&function(t){i.d(n,t,(function(){return e[t]}))}(s);n["default"]=a.a},"94b7":function(t,n,i){"use strict";var e;i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return s})),i.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"main-view"},[e("v-uni-image",{staticClass:"backB-btn",attrs:{src:i("0c56"),mode:"aspectFill"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.back.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"login-tips-view"},[e("v-uni-text",{staticStyle:{"font-weight":"700","font-size":"45upx"}},[t._v("用户信息")]),e("v-uni-text",{staticStyle:{"font-size":"30upx","margin-left":"15upx"}},[t._v("User Registration")])],1),e("v-uni-view",[e("inputView",{staticStyle:{"text-align":"right"},attrs:{type:"REALNAME",preText:"用户姓名",placeholder:"请输入您的用户姓名"},on:{bindInputChange:function(n){arguments[0]=n=t.$handleEvent(n),t.bindInputChange.apply(void 0,arguments)}}}),e("inputView",{staticStyle:{"text-align":"right"},attrs:{type:"cardType",isPicker:!0,range:t.array,disabled:!0,preText:"证件类型",placeholder:"请选择您的证件类型"},on:{bindInputChange:function(n){arguments[0]=n=t.$handleEvent(n),t.bindInputChange.apply(void 0,arguments)}}}),e("inputView",{staticStyle:{"text-align":"right"},attrs:{type:"USER_PID",preText:"证件号码",placeholder:"请输入您的证件号码"},on:{bindInputChange:function(n){arguments[0]=n=t.$handleEvent(n),t.bindInputChange.apply(void 0,arguments)}}}),e("inputView",{staticStyle:{"text-align":"right"},attrs:{type:"PASSWORD",password:!0,preText:"用户密码",placeholder:"请输入您的用户密码"},on:{bindInputChange:function(n){arguments[0]=n=t.$handleEvent(n),t.bindInputChange.apply(void 0,arguments)}}}),e("inputView",{staticStyle:{"text-align":"right"},attrs:{type:"confirmPWD",password:!0,preText:"确认密码",placeholder:"请确认您的用户密码"},on:{bindInputChange:function(n){arguments[0]=n=t.$handleEvent(n),t.bindInputChange.apply(void 0,arguments)}}})],1),e("v-uni-view",{staticStyle:{"margin-top":"40upx"}},[e("normalBtn",{attrs:{text:"注 册"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.regist.apply(void 0,arguments)}}})],1)],1)],1)},s=[]},c559:function(t,n,i){"use strict";i.r(n);var e=i("94b7"),a=i("919d");for(var s in a)"default"!==s&&function(t){i.d(n,t,(function(){return a[t]}))}(s);i("15d2");var o,r=i("f0c5"),c=Object(r["a"])(a["default"],e["b"],e["c"],!1,null,"c80b1210",null,!1,e["a"],o);n["default"]=c.exports},d184:function(t,n,i){var e=i("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.container[data-v-c80b1210]{width:100vw;height:100vh;position:relative}.container .backB-btn[data-v-c80b1210]{position:absolute;top:%?80?%;left:%?40?%;width:%?40?%;height:%?40?%}.container .main-view[data-v-c80b1210]{position:relative;padding:%?220?% %?40?% %?40?%}.container .main-view .login-tips-view[data-v-c80b1210]{color:#3685d4;margin-bottom:%?50?%}',""]),t.exports=n}}]);