(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-tabbar-convenient_service"],{"13ae":function(t,i,n){"use strict";n.r(i);var e=n("5e65"),a=n.n(e);for(var c in e)"default"!==c&&function(t){n.d(i,t,(function(){return e[t]}))}(c);i["default"]=a.a},2441:function(t,i,n){"use strict";var e=n("ac73"),a=n.n(e);a.a},3529:function(t,i,n){"use strict";n.r(i);var e=n("c246"),a=n("13ae");for(var c in a)"default"!==c&&function(t){n.d(i,t,(function(){return a[t]}))}(c);n("2441");var o,s=n("f0c5"),m=Object(s["a"])(a["default"],e["b"],e["c"],!1,null,"6c0a878c",null,!1,e["a"],o);i["default"]=m.exports},"5e65":function(t,i,n){"use strict";var e=n("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=e(n("f8d4")),c={name:"ConvenientService",components:{},data:function(){return{list:a.default.items}},methods:{tabClick:function(t){t?window.location.href=t:uni.showToast({title:"功能暂未开放"})}}};i.default=c},ac73:function(t,i,n){var e=n("e252");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=n("4f06").default;a("0a5d1830",e,!0,{sourceMap:!1,shadowMode:!1})},c246:function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return c})),n.d(i,"a",(function(){return e}));var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{staticClass:"convenientService"},t._l(t.list,(function(i,e){return n("v-uni-view",{key:e,staticClass:"section"},[n("v-uni-view",{staticClass:"section-title"},[t._v(t._s(i.tab))]),n("v-uni-view",{staticClass:"tabs"},t._l(i.tabs,(function(i,e){return n("v-uni-view",{key:e,staticClass:"tab",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.tabClick(i.url)}}},[n("v-uni-image",{staticClass:"tab-img",attrs:{src:i.imgPath,mode:"aspectFill"}}),n("v-uni-view",{staticClass:"tab-title"},[t._v(t._s(i.title))])],1)})),1)],1)})),1)},c=[]},e252:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.convenientService[data-v-6c0a878c]{padding:%?30?%}.convenientService .section[data-v-6c0a878c]{margin-bottom:%?20?%}.convenientService .section .section-title[data-v-6c0a878c]{font-size:%?36?%;font-weight:700;color:#000;padding:%?20?% 0}.convenientService .section .tabs[data-v-6c0a878c]{font-size:%?28?%;color:#666;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap}.convenientService .section .tabs .tab[data-v-6c0a878c]{width:24.8%;height:%?120?%;box-sizing:border-box;padding:%?10?%;text-align:center;margin-bottom:%?30?%}.convenientService .section .tabs .tab .tab-img[data-v-6c0a878c]{width:%?70?%;height:%?70?%;margin-bottom:%?10?%}',""]),t.exports=i},f8d4:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=[{tab:"城市服务",tabs:[{title:"公积金查询",imgPath:"../../static/images/itemIcon/icon_bm_gjjcx.png"},{title:"找工作",imgPath:"../../static/images/itemIcon/icon_bm_zgz.png",url:"http://www.jqrc.net"},{title:"快递单号查询",imgPath:"../../static/images/itemIcon/icon_bm_kddhcx.png"},{title:"社会保险",imgPath:"../../static/images/itemIcon/icon_bm_shbx.png"},{title:"养老保险",imgPath:"../../static/images/itemIcon/icon_bm_ylbx.png"},{title:"医疗保险",imgPath:"../../static/images/itemIcon/icon_bm_ylibx.png"}]},{tab:"教育服务",tabs:[{title:"中考成绩查询",imgPath:"../../static/images/itemIcon/icon_bm_zkcjcx.png",url:"http://60.165.175.98:8099"},{title:"高考成绩查询",imgPath:"../../static/images/itemIcon/icon_bm_gkcjcx.png",url:"http://gaokao.ganseea.cn"},{title:"学校查询",imgPath:"../../static/images/itemIcon/icon_bm_xxcx.png",url:"http://www.xuexiaodaquan.com"}]},{tab:"出行服务",tabs:[{title:"公交",imgPath:"../../static/images/itemIcon/icon_bm_gongjiao.png",url:"http://jiuquan.gongjiao.com"},{title:"火车票",imgPath:"../../static/images/itemIcon/icon_bm_huochepiao.png",url:"https://www.12306.cn/index"},{title:"飞机票",imgPath:"../../static/images/itemIcon/icon_bm_feijipiao.png",url:"http://www.9883air.com"},{title:"汽车票",imgPath:"../../static/images/itemIcon/icon_bm_qichepiao.png",url:"http://www.checi.cn/qiche/jiuquan"},{title:"旅游景点",imgPath:"../../static/images/itemIcon/icon_bm_lvyoujingdian.png",url:"http://www.jqta.gov.cn/index/index.htm"},{title:"酒店查询",imgPath:"../../static/images/itemIcon/icon_bm_jiudianchaxun.png",url:"https://www.ctrip.com/?sid=155952&allianceid=4897&ouid=index"},{title:"车辆违章",imgPath:"../../static/images/itemIcon/icon_bm_cheliangweizhang.png",url:"http://gs.122.gov.cn/views/inquiry.html"}]},{tab:"生活服务",tabs:[{title:"电费查询",imgPath:"../../static/images/itemIcon/icon_bm_dianfeichaxun.png",url:"http://www.95598.cn/person/as/index.shtml"},{title:"水费查询",imgPath:"../../static/images/itemIcon/icon_bm_shuifeichaxun.png"},{title:"煤气费查询",imgPath:"../../static/images/itemIcon/icon_bm_meiqifeichaxun.png"},{title:"话费查询",imgPath:"../../static/images/itemIcon/icon_bm_huafeichongzhi.png",url:"https://shop.10086.cn/i/?f=home"}]},{tab:"看病服务",tabs:[{title:"预约挂号",imgPath:"../../static/images/itemIcon/icon_bm_yuyueguahao.png"},{title:"检验结果",imgPath:"../../static/images/itemIcon/icon_bm_jianyanjieguo.png"},{title:"药品信息查询",imgPath:"../../static/images/itemIcon/icon_bm_yaopinxinxichaxun.png"}]}],a={items:e};i.default=a}}]);