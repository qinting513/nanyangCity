<template>
	<view class="base-apply">
		<view class="slider-tab">
			<scroll-view scroll-x="true" class="scroll-view-x">
				<view class="scroll-view-item" v-for="(item, index) in navs" :key="index">
					<view :class="[currentNav == index ? 'on' : '']" @click="switchNav(index)">{{ item.name }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="seperator"></view>
		<swiper :style="[heightStyle]" @change="changeSwiper" :autoplay="autoplay" :current="currentNav">
			<swiper-item>
				<base-form ref="baseForm" @next="nextStep" @tempStore="tempStore"></base-form>
				<!-- <base-form-web></base-form-web> -->
			</swiper-item>
			<swiper-item>
				<material-page ref="material" :pageHeight="pageHeight" @pre="preStep" @tempStore="tempStore"
					@next="nextStep"></material-page>
			</swiper-item>
			<swiper-item>
				<mail-express-page ref="express" :defaultAddress="defaultAddress" @pre="preStep" @tempStore="tempStore" @next="nextStep">
				</mail-express-page>
			</swiper-item>
			<swiper-item>
				<comfirm-page :pageHeight="pageHeight" @pre="preStep" @tempStore="tempStore" @apply="apply">
				</comfirm-page>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	import Apply from '../../static/js/nanyang_apply.js';
	import Util from '../../static/js/util.js';
	import BaseForm from './base_form_uni.vue';
	import BaseFormWeb from './base_form_web.vue';
	import MaterialPage from './material_page.vue';
	import MailExpressPage from './mail_express_view.vue';
	import ComfirmPage from './comfirm_page.vue';
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'BaseApply',
		components: {
			BaseForm,
			BaseFormWeb,
			MaterialPage,
			MailExpressPage,
			ComfirmPage
		},
		data() {
			return {
				defaultAddress: null,
				hasToken: false,
				autoplay: false,
				currentNav: 0,
				pageHeight: 0,
				heightStyle: {
					// height: '600px'
				},
				navs: [{
						id: 0,
						name: '基本表单'
					},
					{
						id: 1,
						name: '材料上传'
					},
					{
						id: 2,
						name: '速递服务'
					},
					{
						id: 3,
						name: '申报确认'
					}
				],
				isEditable: true // 是否可编辑默认可以编辑，申报过的不可以再编辑
			};
		},
		computed: mapState(['applyItemInfo', 'userInfo', 'businessModel', 'formsModel', 'materialsModel', 'postModel',
			'uploadMaterials', 'uploadMaterialsNum', 'materialList'
		]),
		onLoad(options) {
			// debugger
			let user = uni.getStorageSync('nuser');
			if (null != user && undefined != user && '' != user) {
				user = JSON.parse(user);
				this.$store.commit('updateUserInfo', user);
			}
			// 初始化数据
			this.initPage(options);
			// 加载数据
			this.initModels(options);
		},
		onShow() {
			// let pagearr = getCurrentPages(); //获取应用页面栈
			// let currentPage = pagearr[pagearr.length - 1]; //获取当前页面信息
			// console.log('option:', currentPage.options) //获取页面传递的信息

			//省统一身份认证对接
			// this.handleToken(currentPage.options);
			
			let defaultAddress = uni.getStorageSync("defaultAddress");
			if (defaultAddress != null && defaultAddress != '') {
				this.defaultAddress = JSON.parse(defaultAddress);
			}
		},
		methods: {
			handleToken: function(options) {
				if (options == null || options == undefined) {
					return;
				}
				var that = this;
				if (options.token != undefined && options.token != null) {
					this.hasToken = true;
					var userType;
					//naturalToken0475768457497087980313383278377519132046114878551499920001261493

					var param;
					if (options.token.startsWith('naturalToken')) {
						userType = '1';
						param = {
							'naturalToken': options.token
						}
					} else {
						userType = '2';
						//cropToken
						param = {
							'cropToken': options.token
						}
					}
					uni.request({
						url: Http.rootUrl + "/mobile/login.jspx",
						method: "GET",
						data: param,
						success: function(resource) {
							console.log("logininfo", resource)
							if (resource.statusCode == 200) {
								var data = resource.data;
								if (data.code == 200) {
									// 		var userInfo={};

									// 		userInfo.USER_ID = "123";
									// 		userInfo.USERNAME = "测试";
									// 		userInfo.REALNAME= "测试";
									// 		userInfo.TOKEN = '';
									// 		userInfo.EMAIL = '';
									// 		userInfo.MOBILE = "19889897878";
									// 		userInfo.TYPE = "1";
									// 		userInfo.CODE = "312345199809090909"; // 身份证号码
									// 		userInfo.AUTHLEVE = '4';
									// 		userInfo.USER_IMG = '';
									// 		userInfo.COMPANY = '';
									that.$store.commit('updateUserInfo', data.ReturnValue);


									//初始化数据
									that.initPage(options);
									// 加载数ß据
									that.initModels(options);
								} else {
									uni.showToast("用户信息获取失败")
								}
							}
						},
						fail: function(error) {
							// 初始化数据
							that.initPage(options);
							// 加载数据
							that.initModels(options);
						}
					})

				}
			},
			preStep: function(data) {
				console.log('preStep', data);
				this.currentNav = this.currentNav - 1;
			},
			nextStep: function(data) {
				console.log('nextStep', data);
				this.currentNav = this.currentNav + 1;
			},
			// 暂存
			tempStore: function(data) {
				// console.log("====> tempStore", this.uploadMaterials);
				this.goApply(9);
			},
			// 申报
			apply: function(data) {
				console.log('apply', data);
				this.goApply(0);
			},
			goApply: function(type) {
				// 1.先检查各个状态
				let formData = this.cacheBaseInfo();

				let stateBaseForm = this.$refs.baseForm.checkBaseInfo(true);
				if (stateBaseForm === false) {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '基本表单带*的选项为必填内容'
					// });
					return;
				}

				if (type == 0) {
					// 申报时则检测带*是否都填写了
					// 先检查状态 如果*有某一个没完成 则提示
					if (!this.$refs.material.checkMaterial(true)) {
						return;
					}
				}
				// debugger
				// 2.进行参数拼接
				const businessXml = Apply.getBusinessXml(type, this.businessModel, this.userInfo);
				const formXml = Apply.getFormXml(formData);
				const materialXml = Apply.getMaterialXml(this.materialList, this.uploadMaterials, formData);
				let post = this.$refs.express.getPostXmlData();
				const postXml = Apply.getPostXmlData(post);

				// 拼接参数进行申报
				let params = {
					token: this.userInfo.userToken,
					BUSINESS: businessXml,
					FORMS: formXml,
					MATERIALS: materialXml,
					POSTXML: postXml
				};
				var that = this
				Apply.tempStore(params)
					.then(res => {
						console.log('申报成功:', res);
						if(res.code == 200 && res.ReturnValue){
							that.businessModel.bsnum = res.ReturnValue.bsnum;
						}
						uni.showToast({
							icon: 'success',
							title: type == 9 ? '暂存成功!' : '申报成功!',
							complete() {
								let url = "";
								if (type == 9) { // 暂存直接去到我的办件 暂存列表那里
									url = "/pages/mine/my_business_page/my_business_page"
									if (that.businessModel.bsnum) {
										url += `?isFromMine=1`
									}
								} else {
									url = "/pages/base_apply/apply_result"
									if (that.businessModel.bsnum) {
										url += `?bsnum=` + that.businessModel.bsnum
									}
								}
								setTimeout(() => {
									uni.redirectTo({
										url: url
									});
								}, 1500);
							}
						});
						
					})
					.catch(err => {
						console.log('err:', err);
					});
			},
			cacheBaseInfo: function() {
				//更新form的内容 用户信息表单
				let form = this.formsModel;
				form.pid = form.permId; // 办理事项ID
				form.sqrmc = form.realName; // 联系人
				form.sqryddh = form.mobile; // 移动电话
				form.zjlx = form.certificateTypesCode || '10'; // 证件类型
				form.sqrsfzjhm = form.code; //身份证号码
				form.sqrdzxx = form.userEmail; //邮箱
				form.sqrgddh = form.userPhone; //固定电话
				form.sqrgddz = form.userAddress; // 联系地址
				form.sqxmmc = form.itemName; // 项目名称
				form.bz = form.bz; // 备注
				return form;
			},
			initPage(options) {
				uni.setNavigationBarTitle({
					title: '申报'
				});
				// 获取屏幕高度 用来设置swiper的高度
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.pageHeight = res.windowHeight;
						that.heightStyle = {
							// 55 是底部按钮的高度 30顶部的
							height: res.windowHeight - 55 + 'px'
						};
					}
				});

				// 项目名称初始化
				this.businessModel.permId = options.permId;
				this.formsModel.permId = options.permId;
				this.formsModel.stateBaseForm = false; // 基本表单的状态
				this.formsModel.itemName = options.itemName;
				if (options.bsnum != null) {
					this.businessModel.bsnum = options.bsnum;
				} else {
					this.businessModel.bsnum = null;
				}
				// TODO： applicantid 应该传递什么
				this.businessModel.applicantid = this.userInfo.userAuth.cardId;
				this.$store.commit('updateBusinessModel', this.businessModel);
			},
			initModels(options) {
				debugger
				// 加载材料列表数据
				this.loadMaterialData();
				// 获取表单URL
				this.getFormByPermidV2();
				//注意：从我的办件进来 itemInfoModel为空，需要通过_getWebhallbusiness()获取
				this.initBusinessModel();
				// 保存业务流水号 从我的办件、暂存件进来会有bsnum, 给FormModel赋值
				if (options.bsnum != null && options.bsnum.length > 0) {
					this.businessModel.bsnum = options.bsnum;
					this.formsModel.bsnum = options.bsnum;
					// business 表单的初始化 该接口主要为了获取ItemInfo数据
					this.getWebhallbusiness();
					// 获取暂存基本表单实例
					this.getInsFormData();
					// 获取暂存材料
					this.getInsMaterialInfo();
				} else {
					// 读取缓存的用户信息进行显示 有bsnum的 则网络请求后赋值
					if (this.userInfo.userAuth) {
						this.formsModel.code = this.userInfo.userAuth.cardId; // 身份证号码
						this.formsModel.realName = this.userInfo.userAuth.realName || ""; // 真实名字
					}
					this.formsModel.mobile = this.userInfo.phone || ""; // 手机号码
					this.formsModel.userEmail = this.userInfo.email || "";
					this.formsModel.certificateTypesCode = '10'; // 证件类型 "身份证",
					this.formsModel.userPhone = this.userInfo.telephone || "";
					this.formsModel.userAddress = this.userInfo.address || '';
					this.formsModel.bsnum = null;
					this.$store.commit('updateFormsModel', this.formsModel);
					this.initBusinessModel(this.applyItemInfo);
					setTimeout(() => {
						this.$refs.baseForm.updateInputData(this.formsModel);
					}, 1500)
				}
			},
			loadMaterialData() {
				console.log('getMaterialList');
				Apply.getMaterialList(this.businessModel.permId).then(res => {
					console.log('loadMaterialData', res);
					if (res['code'] == 200 && res['ReturnValue'] != null) {
						let list = res['ReturnValue'];
						this.$store.commit('updateMaterialList', list);
					}
				});
			},
			// 获取表单URL
			getFormByPermidV2() {
				console.log('getFormByPermidV2');
				/* 返回的数据类型：
					{"code":200,"error":"","ReturnValue":
					[{"ID":"P","NAME":"个人基本表单","FORMVER":"1.0","FORMTYPE":"10","FILEID":"P"}]}
					*/
				Apply.getFormByPermidV2(this.businessModel.permId).then(res => {
					console.log('getFormByPermidV2 res:', res);
					if (res['code'] == 200 && res['ReturnValue'] != null) {
						let form = res['ReturnValue'][0];
						if (form) {
							this.formsModel.version = form['FORMVER'] || '';
							this.formsModel.formtype = form['FORMTYPE'] || '10';
							this.formsModel.formid = form['ID'] || 'A';
							this.$store.commit('updateFormsModel', this.formsModel);
						}
					} else {
						uni.showToast({
							title: '基本表单加载失败'
						});
					}
				});
			},
			// business 表单的初始化
			initBusinessModel(itemInfo) {
				// 从办事列表点击申报按钮进来时 有ItemInfoModel
				//注意：从我的办件进来 itemInfoModel为空，需要通过_getWebhallbusiness()获取
				if (itemInfo == null) {
					return;
				}
				// debugger
				this.businessModel.largeitemid = itemInfo.LARGEITEMID;
				this.businessModel.smallitemid = itemInfo.SMALLITEMID;
				this.businessModel.smallitemname = itemInfo.SXZXNAME;
				this.businessModel.itemversion = itemInfo.ITEMVERSION;
				this.businessModel.itemlimittime = itemInfo.ITEMLIMITTIME;
				this.businessModel.itemlimitunit = itemInfo.ITEMLIMITUNIT;
				this.businessModel.regionid = itemInfo.REGIONID;
				this.businessModel.deptcode = itemInfo.DEPTID;
				this.businessModel.deptname = itemInfo.DEPTNAME;
				this.businessModel.projectname = itemInfo.SXZXNAME;
				this.businessModel.lawaddr = itemInfo.LAWADDR;
				this.businessModel.realaddr = itemInfo.REALADDR;
				this.$store.commit('updateBusinessModel', this.businessModel);
			},
			// 获取itemInfoModel
			getWebhallbusiness() {
				if (this.businessModel.bsnum == null || this.businessModel.bsnum.length == 0) {
					return;
				}
				Apply.getWebhallbusiness(this.userInfo.userTOKEN, this.businessModel.bsnum).then(res => {
					console.log('getWebhallbusiness result:', res);
					if (res['code'] == 200) {
						this.initBusinessModel(res.ReturnValue);
					}
				});
			},
			getInsFormData() {
				// 根据bsnum获取提交过的表单实例
				if (this.businessModel.bsnum == null || this.businessModel.bsnum.length == 0) {
					return;
				}
				Apply.getInsFormData(this.userInfo.userTOKEN, this.businessModel.bsnum).then(res => {
					console.log('getInsFormData result:', res);
					// if (res['code'] == 200) {
					let result = res;
					this.initBusinessModel(result);
					this.formsModel.realName = result.sqr_mc;
					this.formsModel.mobile = result.sqr_yddh;
					this.formsModel.code = result.sqr_sfzjhm;
					this.formsModel.userEmail = result.sqr_dzxx;
					this.formsModel.certificateTypesCode = result.zjlx; // "身份证",
					this.formsModel.userPhone = result.sqr_yddh;
					this.formsModel.userAddress = result.sqr_yddh || '';
					this.$store.commit('updateFormsModel', this.formsModel);
					this.$refs.baseForm.updateInputData(this.formsModel);
					// }
				});
			},
			back() {
				uni.navigateBack();
			},
			getInsMaterialInfo() {
				// 根据bsnum获取提交过的材料
				if (this.businessModel.bsnum == null || this.businessModel.bsnum.length == 0) {
					return;
				}
				Apply.getInsMaterialInfo(this.userInfo.userTOKEN, this.businessModel.bsnum).then(res => {
					console.log('getInsMaterialInfo result:', res);
					var materials = {};
					var materialsNumber = {};

					for (var i = 0; i < res.length; i++) {
						let fileInfo = res[i];
						let files = fileInfo.file;
						if (files) {
							var fileArr = [];
							for (var j = 0; j < files.length; j++) {
								let file = files[j];
								fileArr.push({
									filedel: '',
									fileid: file.fileid,
									filename: file.filename,
									filepath: Http.downloadFileURL + file.fileid,
									fileNo: file.fileid,
									filetype: 'img',
									id: file.fileid,
									isUploading: 0,
									localImg: ''
								});
							}
							materials[fileInfo.materialid] = fileArr;
							materialsNumber[fileInfo.materialid] = {
								uploaded: files.length,
								uploading: files.length
							};
						}
					}

					this.$store.commit('updateUploadMaterials', materials);
					this.$store.commit('updateUploadMaterialsNum', materialsNumber);
					this.$refs.material.updateMaterials(materials, materialsNumber);
				});
			},
			switchNav(index) {
				if (index == this.currentNav) {
					return;
				}
				this.currentNav = index;
				console.log('nav:', this.currentNav);
			},
			changeSwiper(e) {
				this.currentNav = e.detail.current;
			}
		}
	};
</script>

<style scoped lang="scss">
	.base-apply {
		background-color: #f1f1f1;
	}

	.slider-tab {
		.scroll-view-x {
			background-color: #fff;
			white-space: nowrap;
			z-index: 9999;
			top: 0;
		}

		.scroll-view-x .scroll-view-item {
			display: inline-block;
			margin: 0 30rpx;
			line-height: 45px;
			cursor: pointer;
		}

		.on {
			border-bottom: 2px solid #4280e7;
			color: #4280e7;
		}
	}

	.seperator {
		height: 20upx;
		width: 100%;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: row;
	}

	.apply-navigation {
		width: 100%;
		height: 60upx;
		background-color: #f6f7f6;
	}

	.back {

		width: 30upx;
		height: 40upx;
	}

	.apply-title {}
</style>
