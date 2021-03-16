<template>
	<view class="guide-page">
		<view class="top">
			<view class="title" v-if="businessGuideModel">
				{{businessGuideModel.SXZXNAME || ""}}
			</view>
			<view class="top-list">
				<view class="top-cell" v-for="(item, index) in topList" :key="index">
					<view class="">
						{{item.data}}
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="header">
				<view @click="clickNav(index)" class="navItem" :class="current == index ? 'check' : ''"
					v-for="(item, index) in list" :key="index">{{ item.name }}</view>
			</view>
			<view class="body">
				<swiper :current="current" @change="swiperChange" class="swiper">
					<swiper-item>
						<scroll-view class="list" scroll-y="true">
							<view class="lc-cell" v-for="(m, i) in baseList" :key="i">
								<view class="lc-title">{{m.title}}</view>
								<view class="lc-content">
									<view class="flex-row lc-item" v-for="(item, j) in m.data" :key="j">
										<view class="lc-item-title">{{item.title}}</view>
										<view class="lc-item-content">{{item.content}}</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y="true">
							<view class="lc-cell" v-for="(m, i) in materailList" :key="i">
								<view class="lc-title">{{m.title}}</view>
								<view class="lc-content">
									<view class="" v-if="m.data.length > 0" v-html="m.data"></view>
									<view class="" v-else>
										暂无数据
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y="true">
							<view class="lc-cell" v-for="(m, i) in stepList" :key="i">
								<view class="lc-title">{{m.title}}</view>
								<view class="lc-content">
									<image v-if="m.contentImg" :src="m.contentImg" mode="aspectFit"
										@click="preView(m.contentImg)"></image>
									<view class="" v-else v-html="m.data"></view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item>
						<scroll-view class="list" scroll-y="true">
							<view class="lc-cell" v-for="(m, i) in moreList" :key="i">
								<view class="lc-title">{{m.title}}</view>
								<view class="lc-content">
									<view class="" v-if="m.data.length > 0" v-html="m.data"></view>
									<view class="" v-else>
										暂无数据
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<view class="flex-row bottom-btns">
				<view :class="['b-btn', itemInfo.SFYDSB ? 'blue' : 'grey']" @click="gotoDeclare">
					在线办理
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	import ScrollTab from '../../components/scroll-tab.vue'
	import {
		mapState
	} from 'vuex';

	export default {
		name: "BusinessGuide",
		components: {
			ScrollTab
		},
		data() {
			return {
				dataList: [], //组装后要显示的数据
				files: [], // 表格文件数据
				itemInfo: null,
				businessGuideModel: null,
				expends: [],
				ID: '',
				dataState: 'init',

				current: 0,
				swiperCurrent: 0,
				list: [{
						name: '基本信息'
					},
					{
						name: '材料清单'
					},
					{
						name: '办事流程'
					},
					{
						name: '更多信息'
					}
				],
				topList: [
					// {
					// 	name: '到现场次数',
					// 	data: "无"
					// },
					// {
					// 	name: '法定办结时限',
					// 	data: "无期限"
					// },
					// {
					// 	name: '承诺办结时限',
					// 	data: "无期限"
					// },
					// {
					// 	name: '通办范围',
					// 	data: "无"
					// },
				],
				baseList: [],
				stepList: [],
				materailList: [],
				moreList: []
			}
		},
		computed: mapState(['userInfo']),
		onLoad: function(options) {
			this.ID = options.ID;
			this.itemInfo = JSON.parse(uni.getStorageSync('nItemInfo') || "{}");
			console.log("事项ID：", this.itemInfo);
			this.loadData();

		},
		methods: {
			clickNav(index) {
				this.swiperCurrent = index;
				this.current = index;
			},
			swiperChange(e) {
				this.current = e.detail.current;
				this.swiperCurrent = this.current;
			},
			preView(url) {
				uni.previewImage({
					current: url,
					urls: [url],
				})
			},
			expendCell(index) {
				this.$set(this.expends, index, !this.expends[index]);
				// console.log("expends:", this.expends);
			},
			loadData() {
				Http.getBusinessGuideData(this.ID).then(res => {
					console.log("getBusinessGuideData", res);
					if (res.code == 200 && res.ReturnValue != null) {
						let model = res.ReturnValue;
						this.businessGuideModel = model;
						this.itemInfo = model.PERMISSION;
						this.$store.commit('updateApplyItemInfo', this.itemInfo);
						this.handleDatas(model);
						// this.getItemInfo(model.SXZXNAME)
						this.dataState = "init"
					} else {
						this.dataState = "noData"
					}
				});
			},
			getItemInfo(name) {
				Http.getPermByPermname(name).then(res => {
					console.log("事项信息:", res);
					if (res.code == 200 && res.ReturnValue.length > 0) {
						this.itemInfo = res.ReturnValue[0];
						this.$store.commit('updateApplyItemInfo', this.itemInfo);
					}
				});
			},

			// 处理表格数据
			handleFiles(forms) {
				var files = [];
				if (forms.length > 0) {
					// 通过字符串截取获取出表格数据
					// console.log("=========== forms:", forms);
					while (forms.indexOf("<name>") != -1) {
						// <id> 长度是4 所以加上4
						let id = forms.substring(
							forms.indexOf("<id>") + 4, forms.indexOf("</id>"));
						// <name> 长度是6 所以加上6
						let filename = forms.substring(
							forms.indexOf("<name>") + 6, forms.indexOf("</name>"));
						forms = forms.substring(forms.indexOf("</name>") + 1, forms.length);
						// console.log("=========== filename:", id, filename);
						if (filename.indexOf("CDATA[]") == -1) {
							// 过滤掉这些空内容的东西
							files.push({
								"name": filename,
								"id": id,
								"downloadUrl": Http.downloadFileURL + id
							});
						}
					}
				}
				return files;
			},
			replaceStr(str) {
				if (str == null) return '暂无数据';
				return str.replace(/&nbsp;/g, '');
			},
			handleDatas(model) {
				// P个人，C企业，A全部
				let fuwuduixiang = "个人";
				if (this.itemInfo) {
					if (this.itemInfo.TYPE == 'C') {
						fuwuduixiang = "企业"
					} else if (this.itemInfo.TYPE == 'A') {
						fuwuduixiang = "个人、企业"
					}
				}
				let baseList = [{
						title: "受理结构",
						content: this.itemInfo.DEPTNAME || "",
					},
					{
						title: "办理时限",
						content: model.LIMITDAYS || "",
					},
					{
						title: "服务对象",
						content: fuwuduixiang
					},
					{
						title: "是否收费",
						content: model.CHARGE || ""
					},
				]
				this.baseList = [{
					"id": 0,
					"title": "基本信息",
					"data": baseList,
				}];

				let files = this.handleFiles(model.FORMS);
				model.SQCL = model.SQCL.replace(/；/g, '；<br />');
				model.SQCL = model.SQCL.replace(/;/g, '；<br />');
				this.materailList = [{
						"id": 0,
						"title": "申请材料",
						"data": model.SQCL || '暂无数据',
					},
					{
						"id": 1,
						"title": "审批表格下载",
						"data": files,
					},
				];

				let wangshangImg = ""; // 网上办理流程 可能是图片
				let chaungkouImg = "" // 窗口办理流程

				if (model.WLBLLC.indexOf('http') > -1) {
					wangshangImg = model.WLBLLC;
				} else {
					model.WLBLLC = model.WLBLLC.replace(/&times;/g, 'X');
					model.WLBLLC = model.WLBLLC.replace(/；/g, '；<br />');
					model.WLBLLC = model.WLBLLC.replace(/环节名称/g, '<br /> 环节名称');
					if (model.WLBLLC.indexOf('<br />') == 0) {
						model.WLBLLC = model.WLBLLC.replace('<br />', '');
					}

				}
				if (model.SPCX.indexOf('http') > -1) {
					chaungkouImg = model.SPCX;
				}
				this.stepList = [{
						"id": 0,
						"title": "网上办理流程",
						"data": model.WLBLLC || '',
						"contentImg": wangshangImg,
					},
					{
						"id": 1,
						"title": "窗口办理流程",
						"data": model.SPCX || '',
						"contentImg": chaungkouImg,
					},
				];
				model.SPTJ = model.SPTJ.replace(/&nbsp;/g, '');
				model.SPTJ = model.SPTJ.replace(/；/g, '；<br />');
				this.moreList = [{
						"id": 0,
						"title": "办理条件",
						"data": model.SPTJ
					},
					{
						"id": 1,
						"title": "办理依据",
						"data": model.LAWPRODUCE || '暂无数据'
					},
					{
						"id": 8,
						"title": "常见问题解答",
						"data": model.CJWTJD || '暂无数据'
					},
					{
						"id": 9,
						"title": "事项办理地点",
						"data": model.PERMISSION.bLDD || '暂无数据'
					}
				];
				this.topList = [{
							name: '到现场次数',
							data: this.itemInfo.NUMCOUNT ? (this.itemInfo.NUMCOUNT + '次') : "无"
						},
						{
							name: '法定办结时限',
							data: this.itemInfo.ITEMLIMITTIME ? (this.itemInfo.ITEMLIMITTIME + '个工作日') : "无期限"
						},
						{
							name: '承诺办结时限',
							data: this.itemInfo.ITEMLIMITTIME ? (this.itemInfo.ITEMLIMITTIME + '个工作日') : "无期限"
						},
						{
							name: '通办范围',
							data: "全市"
						},
					],
					this.dataList = [{
							"id": 0,
							"title": "办理条件",
							"img": "../../static/images/banshi/icon_bs_banli_tiaojian.png",
							"data": this.replaceStr(model.SPTJ)
						},
						{
							"id": 1,
							"title": "申请材料",
							"img": "../../static/images/banshi/icon_bs_shenqing_cailiao.png",
							"data": model.SQCL || '暂无数据'
						},

						{
							"id": 3,
							"title": "办理时限",
							"img": "../../static/images/banshi/icon_bs_banli_shixian.png",
							"data": model.LIMITDAYS || '暂无数据'
						},
						{
							"id": 4,
							"title": "收费标准",
							"img": "../../static/images/banshi/icon_bs_shoufei_biaozhun.png",
							"data": model.CHARGE || '暂无数据'
						},
						{
							"id": 5,
							"title": "办理依据",
							"img": "../../static/images/banshi/icon_bs_banli_yiju.png",
							"data": model.LAWPRODUCE || '暂无数据'
						},

						{
							"id": 7,
							"title": "审批表格下载",
							"img": "../../static/images/banshi/icon_bs_biaoge_xiazai.png",
							"data": '暂无审批表格数据', // 这个现实form表格
						},
						{
							"id": 8,
							"title": "常见问题解答",
							"img": "../../static/images/banshi/icon_bs_changjian_wenti.png",
							"data": model.CJWTJD || '暂无数据'
						},
						{
							"id": 9,
							"title": "事项办理地点",
							"img": "../../static/images/banshi/icon_bs_banli_chuangkou.png",
							"data": model.PERMISSION.bLDD || '暂无数据'
						}
					];
				// console.log("dataList:", this.dataList);
			},
			gotoZixun() {},
			gotoPingjia() {},
			gotoYuyue() {},
			gotoDeclare() {
				console.log("banshi:", this.itemInfo);
				if (!this.itemInfo) {
					uni.showToast({
						icon: 'none',
						title: '事项信息为空'
					})
					return;
				}
				if (this.itemInfo.SFYDSB) {
					// debugger
					// P个人，C企业，A全部
					if (this.itemInfo.TYPE == 'C' && this.userInfo.userAuth) { // 企业事项，个人不能办理
						uni.showToast({
							icon: 'none',
							title: '该事项不支持个人办理'
						})
						return;
					} else if (this.itemInfo.TYPE == 'P' && this.userInfo.enterAuth) { // 个人事项，企业不能办理
						uni.showToast({
							icon: 'none',
							title: '该事项不支持法人办理'
						})
						return;
					}
					let url = '../base_apply/base_apply_page'
					url += `?itemName=${this.businessGuideModel.SXZXNAME}`;
					url += `&permId=${this.ID}`;
					this.$store.commit('updateApplyItemInfo', this.itemInfo);
					uni.navigateTo({
						url: url
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '该事项不支持在线办理'
					})
				}

			},
		},
	}
</script>

<style lang="scss" scoped>
	.guide-page {
		.top {
			background-color: #FFFFFF;
			padding: 40upx 30upx;

			.title {
				font-size: 36upx;
				color: #000;
				font-family: 'Microsoft YaHei';
				font-weight: 500;
				line-height: 1.5;
			}
		}

		.top-list {
			padding: 50upx 10upx 0 10upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			color: #222222;
			font-size: 33upx;
			text-align: center;

			.name {
				color: #999999;
				font-size: 28upx;
			}
		}

		.content {
			// background-color: #FFFFFF;
			margin-top: 20upx;
			padding-bottom: 160upx;

			.header {
				background-color: #FFFFFF;
				display: flex;
				justify-content: space-around;
				padding: 24upx 0;

				.navItem {
					font-size: 32upx;
					height: 80upx;
					line-height: 80upx;
				}

				.check {
					$check-color: rgb(62, 118, 255);
					color: $check-color;
					border-bottom: 2px solid $check-color;
				}
			}


			.swiper {
				height: calc(100vh - 45px);

				.list {
					height: 100%;
					// padding: 30upx;

					&::-webkit-scrollbar {
						display: none;
					}
				}
			}


			.lc-cell {
				.lc-title {
					font-size: 36upx;
					font-weight: 600;
					color: #000000;
					padding: 30upx 20upx;
				}

				.lc-content {
					background-color: #FFFFFF;
					padding: 30upx 30upx;
					font-size: 30upx;
					line-height: 2;
				}

				.lc-item {
					font-size: 34upx;
					color: #000000;

					.lc-item-title {
						width: 180upx;
						flex-shrink: 0;
						color: #878787;
					}

				}
			}
		}

		.bottom-btns {
			background-color: #fff;
			position: fixed;
			bottom: 0;
			height: 140upx;
			width: 100%;
			font-size: 34upx;
			justify-content: space-evenly;

			.btn {
				padding: 16upx 24upx;
			}

			.left {
				color: #007AFF;
			}

			.left-line {
				position: relative;
			}

			.left-line::after {
				content: "";
				width: 2px;
				height: 36upx;
				border-right: 1px solid #007AFF;
				position: absolute;
				right: -16upx;
				top: 50%;
				transform: translateY(-50%);
			}

			.r-gray {
				color: #FFFFFF;
				background-color: #777777;
				border-radius: 80upx;
			}

			.r-blue {
				color: #FFFFFF;
				background-color: #007AFF;
				border-radius: 80upx;
			}

			.b-btn {
				color: #FFFFFF;
				text-align: center;
				padding: 26upx 20upx;
				width: 90%;
				border-radius: 10upx;
			}

			.blue {
				background-color: #007AFF;
			}

			.grey {
				background-color: #999;
			}
		}
	}
</style>
