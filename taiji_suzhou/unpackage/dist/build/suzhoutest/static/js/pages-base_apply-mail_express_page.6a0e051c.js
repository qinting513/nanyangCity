(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-base_apply-mail_express_page"],{"01df":function(e,t,i){var n=i("710c");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("298c9566",n,!0,{sourceMap:!1,shadowMode:!1})},"0a2e":function(e,t,i){"use strict";i.r(t);var n=i("9d9f"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},"0d9b":function(e,t,i){"use strict";i.r(t);var n=i("382d"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},"1f41":function(e,t,i){var n=i("97c2");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("45d0160e",n,!0,{sourceMap:!1,shadowMode:!1})},"382d":function(e,t,i){"use strict";var n=i("4ea4");i("99af"),i("c975"),i("e25e"),i("ac1f"),i("1276"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n(i("33b4"));var a=n(i("95c1")),s=n(i("b978")),l=(n(i("cbf0")),i("2f62")),o={name:"MailExpressPage",components:{InputCell:s.default},data:function(){return{blmsModel:null,blmsTitle:"办理模式：暂无",guishudiModelList:[],guishudiTitlesList:[],selectedGuiShuDiModel:{},djzzclList:[],djzzclValueList:{1:"网点递交",2:"邮寄递交",3:"无需递交"},lqspjgList:[],lqspjgValueList:{1:"网点领取",2:"邮寄领取",3:"自行打印"},networkItems:[],userAddressModel:null,currentDjzzcl:"",currentLqspjg:"",postXml:""}},computed:(0,l.mapState)(["applyItemInfo","userInfo","businessModel","formsModel","materialsModel","postModel","materialList"]),mounted:function(){this.getPermWsfwsd(),this.getRegionByPermidBsnum()},methods:{getPermWsfwsd:function(){var e=this,t=this.businessModel;console.log("邮政速递id:",t.permId),null!=t&&null!=t.permId&&a.default.getPermWsfwsd(t.permId).then((function(t){console.log("邮政速递res：",t),200==t["code"]&&null!=t["ReturnValue"]&&(e.blmsModel=t["ReturnValue"],e.setBlms(),e.getDJZZCL(),e.getLQSPJG())}))},setBlms:function(){var e=this.blmsModel.BLMS,t="",i=parseInt(e)||-1;switch(i){case 1:t="办理模式：全程网上办";break;case 2:t="办理模式：默认全程网上办";break;case 3:t="办理模式：窗口一次办";break;case 4:t="办理模式：窗口一次办";break;default:t="办理模式：暂无";break}this.blmsTitle=t},getDJZZCL:function(){var e=this.blmsModel.DJZZCL;-1==e.indexOf("2")&&-1==e.indexOf("3")||this.getNetworkItems();var t=e.split(",");this.djzzclList=t,this.currentDjzzcl=t[0],console.log("DJZZCL tempList:",t,this.currentDjzzcl)},getLQSPJG:function(){var e=this.blmsModel.LQSPJG;-1!=e.indexOf("2")&&this.getUserAdderssItems();var t=e.split(",");this.lqspjgList=t,this.currentLqspjg=t[0]||"",console.log("LQSPJG tempList:",t,this.currentLqspjg)},getNetworkItems:function(){var e=this;a.default.getNetworkByPermid(this.businessModel.permId).then((function(t){if(console.log("获取网点名称",t),"200"==t.code&&null!=t["ReturnValue"]){var i=t["ReturnValue"];e.networkItems=i.Items,console.log("获取网点名称",e.networkItems)}}))},radioChange:function(e){this.currentDjzzcl=e.detail.value},radioChangeLq:function(e){this.currentLqspjg=e.detail.value},getUserAdderssItems:function(){var e=this;a.default.getUserPostInfo(this.userInfo.USER_ID).then((function(t){if("200"==t.code&&null!=t["ReturnValue"]){var i=t["ReturnValue"];e.userAddressModel=i.Items[0]}}))},getRegionByPermidBsnum:function(){var e=this,t=this.businessModel.permId||"",i=this.businessModel.bsNum||"";a.default.getRegionByPermidBsnum(t,i).then((function(t){if("200"==t.code&&null!=t["ReturnValue"]){var i=t["ReturnValue"];e.guishudiModelList=i.PARENTS,e.selectedGuiShuDiModel=i.PARENTS[0];var n=[];for(var a in i.PARENTS)console.log("归属地model: ",a),n.push(i.PARENTS[a].AREANAME||"");e.guishudiTitlesList=n}}))},getItemData:function(e){var t=e.detail.value,i=parseInt(t);this.selectedGuiShuDiModel=this.guishudiModelList[i]},gotoSelectAddress:function(){console.log("跳转去选择地址")},pre:function(){this.$emit("pre",{page:"MailExpressPage"})},tempStore:function(){this.$emit("tempStore",{page:"MailExpressPage"})},next:function(){this.$emit("next",{page:"MailExpressPage"})},getPostXmlData:function(){var e,t;if("2"!=this.currentDjzzcl&&"1"!=this.currentDjzzcl||null==this.networkItems)t="";else{var i=this.networkItems[0],n={type:"1",RECEIVE:i.NETWORKNAME,ADDRESS:i.NETWORKADDRESS,MOBILE:i.NETWORKPHONE,PHONE:i.NETWORKPHONE,POSTCODE:"000000"};t=this.getXmlByType(n)}if(console.log("========>:",this.currentLqspjg),"2"==this.currentLqspjg&&null!=this.userAddressModel){var a={type:"2",RECEIVE:this.userAddressModel.receive,ADDRESS:this.userAddressModel.address,MOBILE:this.userAddressModel.mobile,PHONE:this.userAddressModel.phone,POSTCODE:this.userAddressModel.postcode};e=this.getXmlByType(a)}else e="";return this.postXml=""==t&&""==e?"":"<emsinfos>".concat(t).concat(e,"</emsinfos>"),console.log("===> postXML:",this.postXml),this.postXml},getXmlByType:function(e){return"<emsinfo><ddhm></ddhm><ddmc></ddmc>"+"<ddlx>".concat(e["type"],"</ddlx><item>")+"<type>S</type><xm>".concat(e["RECEIVE"],"</xm>")+"<dw></dw>"+"<dz>".concat(e["ADDRESS"],"</dz>")+"<dh>".concat(e["MOBILE"],"</dh>")+"<sj>".concat(e["PHONE"],"</sj>")+"<yb>".concat(e["POSTCODE"],"</yb>")+"<csdm>".concat(e["type"],"</csdm>")+"</item></emsinfo>"}}};t.default=o},5140:function(e,t,i){"use strict";var n=i("1f41"),a=i.n(n);a.a},6237:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"mail-express-page"},[i("v-uni-view",{staticClass:"blms"},[e._v(e._s(e.blmsTitle))]),i("v-uni-view",{staticClass:"flex-row ywgsd"},[i("v-uni-view",{staticClass:"left"},[e._v("业务归属地:")]),i("v-uni-view",{staticClass:"right"},[i("v-uni-picker",{attrs:{range:e.guishudiTitlesList,mode:"selector"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.getItemData.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"flex-row picker-area"},[i("v-uni-view",{},[e._v(e._s(e.selectedGuiShuDiModel.AREANAME))]),i("v-uni-view",{staticClass:"right-arrow"})],1)],1)],1)],1),i("v-uni-view",{staticClass:"djcl"},[i("v-uni-view",{},[e._v("请选择递交材料方式:")]),e.djzzclList.length>0?i("v-uni-view",[i("v-uni-radio-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.radioChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"flex-row radio-list"},[e._l(e.djzzclList,(function(t,n){return[i("v-uni-view",{key:n+"_0",staticClass:"flex-row one-radio"},[i("v-uni-radio",{attrs:{value:t,checked:t===e.currentDjzzcl}}),i("v-uni-view",[e._v(e._s(e.djzzclValueList[t]||""))])],1)]}))],2)],1),i("v-uni-view",{staticClass:"djcl-detail"},["1"==e.currentDjzzcl||"2"==e.currentDjzzcl?i("v-uni-view",{},e._l(e.networkItems,(function(t,n){return i("v-uni-view",{key:n},[i("v-uni-view",{staticClass:"one-net"},[i("v-uni-view",{},[e._v("网点名称: "+e._s(t.NETWORKNAME||"暂无数据"))]),i("v-uni-view",{},[e._v("网点地址: "+e._s(t.NETWORKADDRESS||"暂无数据"))]),i("v-uni-view",{},[e._v("网点电话: "+e._s(t.NETWORKPHONE||"暂无数据"))])],1)],1)})),1):e._e(),"3"==e.currentDjzzcl?i("v-uni-view",{},[e._v("说明:业务办理无须递交纸质材料")]):e._e()],1)],1):i("v-uni-view",{staticClass:"djcl-nodata"},[e._v("暂无")])],1),i("v-uni-view",{staticClass:"lzfs"},[i("v-uni-view",{},[e._v("请选择领取证照方式:")]),e.lqspjgList.length>0?i("v-uni-view",[i("v-uni-radio-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.radioChangeLq.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"flex-row radio-list"},[e._l(e.lqspjgList,(function(t,n){return[i("v-uni-view",{key:n+"_0",staticClass:"flex-row one-radio"},[i("v-uni-radio",{attrs:{value:t,checked:t===e.currentLqspjg}}),i("v-uni-view",[e._v(e._s(e.lqspjgValueList[t]||""))])],1)]}))],2)],1),i("v-uni-view",{staticClass:"djcl-detail"},["1"===e.currentLqspjg?i("v-uni-view",{},e._l(e.networkItems,(function(t,n){return i("v-uni-view",{key:n},[i("v-uni-view",{staticClass:"one-net"},[i("v-uni-view",{},[e._v("承诺办结时限: "+e._s(e.applyItemInfo.ITEMLIMITTIME||"1")+"个工作日，具体时间以短信通知为主")]),i("v-uni-view",{},[e._v("网点名称: "+e._s(t.NETWORKNAME||"暂无数据"))]),i("v-uni-view",{},[e._v("网点地址: "+e._s(t.NETWORKADDRESS||"暂无数据"))]),i("v-uni-view",{},[e._v("网点电话: "+e._s(t.NETWORKPHONE||"暂无数据"))])],1)],1)})),1):e._e(),"2"===e.currentLqspjg?i("v-uni-view",{},[i("v-uni-view",{staticClass:"flex-row add-address",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.gotoSelectAddress.apply(void 0,arguments)}}},[null!=e.userAddressModel?i("v-uni-view",[i("v-uni-view",[e._v("收件人: "+e._s(e.userAddressModel.RECEIVE||"暂无数据"))]),i("v-uni-view",[e._v("联系方式: "+e._s(e.userAddressModel.MOBILE||"暂无数据"))]),i("v-uni-view",[e._v("地址: "+e._s(e.userAddressModel.ADDRESS||"暂无数据"))])],1):i("v-uni-view",{},[e._v("添加地址")]),i("v-uni-view",{staticClass:"right-arrow"})],1)],1):e._e(),"3"===e.currentLqspjg?i("v-uni-view",[e._v('说明: 请申请人于业务办结登录PC网厅“我的办事”点击“我的证照”栏目下载电子证照并打印"')]):e._e()],1)],1):i("v-uni-view",{staticClass:"djcl-nodata"},[e._v("暂无")])],1),i("v-uni-view",{staticClass:"flex-row bottom-btns"},[i("v-uni-view",{staticClass:"pre",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pre.apply(void 0,arguments)}}},[e._v("上一步")]),i("v-uni-view",{staticClass:"tempstore",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.tempStore.apply(void 0,arguments)}}},[e._v("暂存")]),i("v-uni-view",{staticClass:"next",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.next.apply(void 0,arguments)}}},[e._v("下一步")])],1)],1)},s=[]},"710c":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.bottom-btns[data-v-0bcf4a8d]{position:fixed;z-index:9999;bottom:0;left:0;right:0;height:%?100?%;width:100vw;text-align:center;line-height:%?100?%}.bottom-btns .pre[data-v-0bcf4a8d]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#0072ff;background-color:#fff;position:relative}.bottom-btns .pre[data-v-0bcf4a8d]:after{content:"";position:absolute;top:%?24?%;right:0;bottom:%?24?%;width:1px;margin:auto 0;background-color:#ddd;overflow:hidden}.bottom-btns .tempstore[data-v-0bcf4a8d]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#0072ff;background-color:#fff}.bottom-btns .next[data-v-0bcf4a8d]{-webkit-box-flex:1;-webkit-flex:1;flex:1;background-color:#0072ff;color:#fff}base[data-v-0bcf4a8d], .mail-express-page .blms[data-v-0bcf4a8d], .mail-express-page .ywgsd[data-v-0bcf4a8d], .mail-express-page .djcl[data-v-0bcf4a8d], .mail-express-page .lzfs[data-v-0bcf4a8d]{margin-top:%?16?%;background-color:#fff;padding:%?26?%}.mail-express-page[data-v-0bcf4a8d]{background-color:#f8f8f8;color:#2b2b2b}.mail-express-page .blms[data-v-0bcf4a8d]{margin-top:0}.mail-express-page .ywgsd[data-v-0bcf4a8d]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.mail-express-page .ywgsd .right[data-v-0bcf4a8d]{-webkit-box-flex:2;-webkit-flex:2;flex:2}.mail-express-page .ywgsd .right .picker-area[data-v-0bcf4a8d]{-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.mail-express-page .radio-list[data-v-0bcf4a8d]{padding:%?20?% 0;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.mail-express-page .radio-list .one-radio[data-v-0bcf4a8d]{margin-right:%?24?%}.mail-express-page .djcl-detail[data-v-0bcf4a8d]{font-size:%?29?%;color:#353535}.mail-express-page .one-net[data-v-0bcf4a8d]{padding-bottom:%?10?%}.mail-express-page .djcl-nodata[data-v-0bcf4a8d]{padding:%?10?% 0;font-size:%?29?%;color:#666}.mail-express-page .add-address[data-v-0bcf4a8d]{-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?30?%;padding:%?30?% %?20?%}',""]),e.exports=t},"95c1":function(e,t,i){"use strict";var n=i("4ea4");i("d3b7");var a=n(i("b8bb")),s=n(i("33b4")),l=n(i("cbf0"));function o(e){return new Promise((function(t,i){var n={PERMID:e};console.log("获取材料列表"),a.default.soup(s.default.url_base_apply_get_materail,s.default.method_base_apply_get_materail,n).then((function(e){t(e)})).catch((function(e){i(e)}))}))}function r(e){return new Promise((function(t,i){var n={PERMID:e,ENTERANCE:"1"};a.default.soup(s.default.url_base_apply_get_materail,s.default.method_base_apply_get_getFormByPermidV2,n).then((function(e){t(e)})).catch((function(e){i(e)}))}))}function d(e,t){return new Promise((function(i,n){var l={token:e,BSNUM:t};a.default.soup(s.default.url_submit_apply,s.default.method_base_apply_getwebhallbusiness,l).then((function(e){i(e)})).catch((function(e){n(e)}))}))}function u(e,t){return new Promise((function(i,n){var o={token:e,BSNUM:t};a.default.soup(s.default.url_submit_apply,s.default.method_base_apply_getInsFormData,o).then((function(e){if(200==e["code"]&&null!=e["ReturnValue"]){var t=e["ReturnValue"],n=t["FORMS"],a=l.default.base64Decode(n);i(l.default.formDealWithData(a))}})).catch((function(e){n(e)}))}))}function c(e,t){return new Promise((function(i,n){var o={token:e,BSNUM:t};a.default.soup(s.default.url_submit_apply,s.default.method_base_apply_getInsMaterialInfo,o).then((function(e){if(200==e["code"]&&null!=e["ReturnValue"]){var t=e["ReturnValue"],n=t["MATERIALS"],a=l.default.base64Decode(n);i(l.default.materialDealWithData(a))}})).catch((function(e){n(e)}))}))}function f(e){return new Promise((function(t,i){var n={PERMID:e};a.default.soup(s.default.url_permname_list,s.default.mothod_getPermWsfwsd,n).then((function(e){t(e)})).catch((function(e){i(e)}))}))}function p(e){return new Promise((function(t,i){var n={PERMID:e};a.default.soup(s.default.url_organization,s.default.mothod_getNetworkByPermid,n).then((function(e){t(e)})).catch((function(e){i(e)}))}))}function m(e,t){return new Promise((function(i,n){var l={PERMID:e};null!=t&&(l["BSNUM"]=t),a.default.soup(s.default.url_department,s.default.mothod_getRegionByPermidBsnum,l).then((function(e){i(e)})).catch((function(e){n(e)}))}))}function v(e){return new Promise((function(t,i){var n={PAGESIZE:"20",PAGENO:"1",USERID:e};a.default.soup(s.default.url_reset_address_service_query,s.default.mothod_getUserPostInfo,n).then((function(e){t(e)})).catch((function(e){i(e)}))}))}function g(e){return new Promise((function(t,i){console.log("申报参数:",e),a.default.soup(s.default.url_submit_apply,s.default.method_submit_apply,e).then((function(e){t(e)})).catch((function(e){i(e)}))}))}function h(e,t,i){var n='<?xml version="1.0" encoding="UTF-8"?><business><businessid><![CDATA['+(t.bsnum||"")+"]]></businessid><cbusinessid><![CDATA["+(t.bsnum||"")+"]]></cbusinessid><citemid><![CDATA["+(t.citemid||"")+"]]></citemid><citemversion><![CDATA["+(t.citemversion||"")+"]]></citemversion><permid><![CDATA["+(t.permId||"")+"]]></permid><largeitemid><![CDATA["+(t.largeitemid||"")+"]]></largeitemid><smallitemid><![CDATA["+(t.smallitemid||"")+"]]></smallitemid><smallitemname><![CDATA["+(t.smallitemname||"")+"]]></smallitemname><itemversion><![CDATA["+(t.itemversion||"")+"]]></itemversion><itemlimittime><![CDATA["+(t.itemlimittime||"")+"]]></itemlimittime><itemlimitunit><![CDATA["+(t.itemlimitunit||"")+"]]></itemlimitunit><regionid><![CDATA["+(t.regionid||"")+"]]></regionid><deptcode><![CDATA["+(t.deptcode||"")+"]]></deptcode><deptname><![CDATA["+(t.deptname||"")+"]]></deptname><projectname><![CDATA["+(t.projectname||"")+"]]></projectname><receiptid><![CDATA["+(t.bsnum||"")+"]]></receiptid><submittype><![CDATA[5]]></submittype><lawaddr><![CDATA["+(t.lawaddr||"")+"]]></lawaddr><realaddr><![CDATA["+(t.realaddr||"")+"]]></realaddr><status><![CDATA["+String(e)+"]]></status><applicantid><![CDATA["+(i.USER_ID||"")+"]]></applicantid><state>5</state><sqr_type><![CDATA["+(i.TYPE||"")+"]]></sqr_type></business>";return console.log("business 数据:",n),l.default.base64Encode(l.default.utf16to8(n))}function b(e){return null==e?"":l.default.base64Encode(l.default.utf16to8(e))}function w(e){var t='<?xml version="1.0" encoding="UTF-8"?><forms><data><dataid>'+(e.dataid||"")+"</dataid><formtype>"+(e.formtype||"")+"</formtype><pid>"+(e.pid||"")+"</pid><bsnum>"+(e.bsnum||"")+"</bsnum><formid>"+(e.formid||"")+'</formid><version></version><sqr_mc type="TEXTINPUT"><![CDATA['+(e.sqrmc||"")+']]></sqr_mc><sqr_yddh type="TEXTINPUT"><![CDATA['+(e.sqryddh||"")+']]></sqr_yddh><sqr_sfzjhm type="TEXTINPUT"><![CDATA['+(e.sqrsfzjhm||"")+']]></sqr_sfzjhm><sqr_dzxx type="TEXTINPUT"><![CDATA['+(e.sqrdzxx||"")+']]></sqr_dzxx><sqr_gddh type="TEXTINPUT"><![CDATA['+(e.sqrgddh||"")+']]></sqr_gddh><sqr_gddz type="TEXTINPUT"><![CDATA['+(e.sqrgddz||"")+']]></sqr_gddz><sqxmmc type="TEXTINPUT"><![CDATA['+(e.sqxmmc||"")+']]></sqxmmc><zjlx type="COMBOBOX"><![CDATA['+(e.zjlx||"")+']]></zjlx><bz type="TEXTINPUT"><![CDATA['+(e.bz||"")+"]]></bz></data></forms>";return console.log("form 数据:",t),l.default.base64Encode(l.default.utf16to8(t))}function x(e,t,i){for(var n='<?xml version="1.0" encoding="UTF-8"?><materials>',a=0;a<e.length;a++){var s=e[a];if(n+="<materialinfo><id><![CDATA[]]></id><materialid><![CDATA["+(s.ID||"")+"]]></materialid><materialname><![CDATA["+(s.CLMC||"")+"]]></materialname><materialcode><![CDATA["+(s.ID||"")+"]]></materialcode><submittype><![CDATA["+(s.DZHYQ||"")+"]]></submittype><orinum><![CDATA[]]></orinum><copynum><![CDATA[]]></copynum><isneed><![CDATA["+(s.SFBY||"")+"]]></isneed><status><![CDATA["+(s.STATUS||"")+"]]></status><formid><![CDATA[]]></formid><formver><![CDATA[]]></formver><dataid><![CDATA[]]></dataid><remark><![CDATA[]]></remark><username><![CDATA["+(i.realName||"")+"]]></username>",null!=t){var o=t[s.ID];if(null!=o&&o.length>0)for(var r in o){var d=o[r];n+="<file>",n+="<fileid><![CDATA["+d["fileid"]+"]]></fileid><filename><![CDATA["+d["filename"]+"]]></filename><filepath><![CDATA["+d["filepath"]+"]]></filepath><filedel><![CDATA["+d["filedel"]+"]]></filedel>",n+="</file>"}}n+="</materialinfo>"}return n+="</materials>",console.log("material 数据:",n),l.default.base64Encode(l.default.utf16to8(n))}e.exports={getMaterialList:o,getFormByPermidV2:r,getWebhallbusiness:d,getInsFormData:u,getInsMaterialInfo:c,getPermWsfwsd:f,getRegionByPermidBsnum:m,getNetworkByPermid:p,getUserPostInfo:v,getPostXmlData:b,tempStore:g,getBusinessXml:h,getFormXml:w,getMaterialXml:x}},"97c2":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.input-cell[data-v-72ce3d2b]{display:-webkit-box;display:-webkit-flex;display:flex;margin-left:%?30?%;margin-right:%?30?%;border-bottom:1px solid #e8e8e8;height:%?110?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?30?%;color:#313131}.input-cell .cell-title[data-v-72ce3d2b]{width:%?220?%}.input-cell .title-box[data-v-72ce3d2b]{-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.input-cell .title-star[data-v-72ce3d2b]{font-size:%?38?%;color:red;margin-top:%?10?%}.input-cell .cell-content[data-v-72ce3d2b]{width:100%\n  /* height: 100%; */}.input-cell .contentView[data-v-72ce3d2b]{height:%?100?%;width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.input-cell uni-input[data-v-72ce3d2b]{text-align:right;width:100%;height:%?100?%\n  /* font-size: 15px; */}.input-cell .image[data-v-72ce3d2b]{width:%?40?%;height:%?40?%;margin-left:%?20?%}.button[data-v-72ce3d2b]{background:#3b7af2;width:%?180?%!important;height:%?70?%!important;color:#fff;text-align:center!important;line-height:%?70?%!important;border-radius:%?10?%!important;margin-right:%?10?%!important;font-size:%?30?%!important;padding:0!important}.buttonView[data-v-72ce3d2b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.buttonView uni-view[data-v-72ce3d2b]{-webkit-box-flex:1;-webkit-flex:1;flex:1;text-align:right;margin-right:%?20?%}.textView[data-v-72ce3d2b]{text-align:right;text-overflow:-o-ellipsis-lastline;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical}',""]),e.exports=t},"9d9f":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"InputCell",props:{title:{type:String},height:{type:String,value:"200upx"},field:{type:String},placeholder:{type:String},itemList:{type:Array},type:{type:String,default:"text"},pickerMode:{type:String,default:"selector"},inputType:{type:String,default:"text"},dataWithBtn:{type:String,default:""},startDate:{type:String,default:""},endDate:{type:String,default:""},initValue:{type:String},isDisable:{type:Boolean},openType:{type:String,default:""},titleStyle:{type:String,default:""},contentColor:{type:String,default:""},isNeed:{type:Boolean,default:!1}},data:function(){return{index:0,selectStr:"",inputStr:""}},created:function(){this.inputStr=this.initValue},methods:{bindSelect:function(e){"date"==this.pickerMode||"time"==this.pickerMode?this.selectStr=e.detail.value:(this.index=e.detail.value,this.selectStr=this.itemList[e.detail.value]);var t={field:this.field,value:this.selectStr,index:this.index};console.log("bindSelect:",t),this.$emit("getItemData",t)},bindInputChange:function(e){console.log("bindInputChange",e),this.inputStr=e.detail.value;var t={field:this.field,value:this.inputStr};this.$emit("getItemData",t)},clear:function(){this.inputStr="",this.initValue="";var e={field:this.field,value:this.inputStr};this.$emit("getItemData",e)},clickBtn:function(){this.$emit("clickBtn")}}};t.default=n},a1ee:function(e,t,i){"use strict";i.r(t);var n=i("6237"),a=i("0d9b");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("b801");var l,o=i("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"0bcf4a8d",null,!1,n["a"],l);t["default"]=r.exports},b801:function(e,t,i){"use strict";var n=i("01df"),a=i.n(n);a.a},b8bb:function(e,t,i){"use strict";var n=i("4ea4");i("c975"),i("d3b7");var a=n(i("cbf0")),s=n(i("43a3")),l='<?xml version="1.0" encoding="utf-8"?>',o='<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',r="<soap:Body>",d="</soap:Body>",u="</soap:Envelope>";function c(e,t,i,n){return uni.showLoading({title:"数据加载中..."}),new Promise((function(s,c){null!=n&&""!=n||(n="POST");var m="<"+t+' xmlns:n0="http://service.rest2.cms.jeecms.com/"><param>'+JSON.stringify(i)+"</param></"+t+">",v=l+o+r+m+d+u;uni.request({url:e,data:v,method:n,header:{"content-type":"text/xml; charset=utf-8",SOAPAction:t},success:function(t){if(200===t.statusCode){var i=f(t.data),n=JSON.parse(i);a.default.checkResponse(n),s(n)}else console.log("请求参数:",e,v),p("错误码："+t.statusCode+"\n\t  错误信息："+t.data);uni.hideLoading()},fail:function(e){uni.hideLoading(),c(e)}})}))}function f(e){for(var t=new s.default.DOMParser,i=t.parseFromString(e,"text/xml"),n=i.getElementsByTagName("soap:Body")[0],a=n.childNodes,l=n.childNodes.length,o=0;o<l;o++)if(a[o].nodeName.indexOf("Response")>=0)for(var r=a[o].childNodes,d=0;d<r.length;d++)if(r[d].nodeName.indexOf("return")>=0)return r[d].childNodes[0].nodeValue;return""}function p(e){console.log("--------------------------我是错误分割线--------------------------"),uni.showModal({title:"提示",content:"服务请求异常"}),console.log("服务请求异常:",e),console.log("--------------------------我是错误分割线--------------------------")}e.exports={soup:c}},b978:function(e,t,i){"use strict";i.r(t);var n=i("bc29"),a=i("0a2e");for(var s in a)"default"!==s&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("5140");var l,o=i("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"72ce3d2b",null,!1,n["a"],l);t["default"]=r.exports},bc29:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"input-cell"},[i("v-uni-view",{staticClass:"flex-row title-box"},[e.isNeed?i("v-uni-text",{staticClass:"title-star"},[e._v("*")]):e._e(),i("v-uni-view",{staticClass:"cell-title",style:e.titleStyle},[e._v(e._s(e.title))])],1),i("v-uni-view",{staticClass:"cell-content"},["select"==e.type?i("v-uni-picker",{attrs:{disabled:e.isDisable,range:e.itemList,value:e.index,start:e.startDate,end:e.endDate,mode:"selector"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindSelect.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"contentView"},[i("v-uni-input",{attrs:{disabled:!0,"data-field":e.field,placeholder:e.placeholder,value:""!=e.selectStr?e.selectStr:e.initValue}}),i("v-uni-image",{staticClass:"image",attrs:{src:e.isDisable?"":"/static/images/input_cell_imgs/icon_arrow_down.png"}})],1)],1):"linkBtn"==e.type?i("v-uni-view",{staticClass:"buttonView"},[i("v-uni-input",{attrs:{type:e.inputType,"data-field":e.field,placeholder:e.placeholder,value:""!=e.inputStr?e.inputStr:e.initValue,disabled:"true"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clickBtn.apply(void 0,arguments)}}}),i("v-uni-image",{staticClass:"image",attrs:{mode:"widthFix",src:"/static/images/input_cell_imgs/icon_right_arrow.png"}})],1):"readOnly"==e.type?i("v-uni-view",{staticClass:"contentView",style:e.contentColor},[i("v-uni-input",{attrs:{type:e.inputType,"data-field":e.field,placeholder:e.placeholder,value:e.inputStr||e.initValue,disabled:"true"}})],1):"textView"==e.type?i("v-uni-view",{staticClass:"contentView",style:e.contentColor},[i("v-uni-view",{staticClass:"textView"},[e._v(e._s(""!=e.inputStr?e.inputStr:e.initValue))])],1):i("v-uni-view",{staticClass:"contentView"},[i("v-uni-input",{attrs:{type:e.inputType,"data-field":e.field,placeholder:e.placeholder,value:e.initValue},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.bindInputChange.apply(void 0,arguments)}}}),i("v-uni-image",{staticClass:"image",attrs:{mode:"widthFix",src:""==e.inputStr&&""==e.initValue?"/static/images/input_cell_imgs/icon_clear_normal.png":"/static/images/input_cell_imgs/icon_clear.png"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clear.apply(void 0,arguments)}}})],1)],1)],1)},s=[]}}]);