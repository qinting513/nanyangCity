<template>
	<view class="business-guide">
		<view class="list-container">
			<scroll-view scroll-y="true">
				<view v-for="(item,index) in dataList" :key="index" :class="{'cell':true,'cell-border':expends[index]}">
					<view class="flex-row  top-section" @click="expendCell(index)">
						<view class="flex-row left">
							<image class="left-img" :src="item.img" mode="scaleToFill"></image>
							<view>{{item.title}}</view>
						</view>
						<view :class="[expends[index] ? 'bottom-arrow':'right-arrow']"></view>
					</view>
					<view class="flex-row cell-bottom" v-if="expends[index]">
						<view class="forms" v-if="item.id == 7 && files.length > 0">
							<view v-for="(file,i) in files" :key="i" class="file">
								<a :href="file.downloadUrl">{{file.name}}</a>
							</view>
						</view>
						<view class="cell-img" v-else-if="item.id == 2 || item.id == 6">
							<image v-if="item.contentImg" :src="item.contentImg" mode="aspectFit"
								@click="preView(item.contentImg)"></image>
							<view class="" v-else>
								{{item.data}}
							</view>
						</view>
						<view v-else>
							{{item.data}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="flex-row bottom-btns">
			<!-- <view class="btn left left-line" @click="gotoZixun">
				 咨询
			</view>
			<view class="btn left" @click="gotoPingjia">
				 评价
			</view>
			<view class="btn r-gray" @click="gotoYuyue">
				在线预约
			</view> -->
			<!-- <view class="btn r-blue" @click="gotoDeclare">
				在线办理
			</view> -->
			<view class="b-btn" @click="gotoDeclare">
				在线办理
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';

	export default {
		name: "BusinessGuide",
		data() {
			return {
				dataList: [], //组装后要显示的数据
				files: [], // 表格文件数据
				itemInfo: null,
				businessGuideModel: null,
				expends: [],
				ID: '',
			}
		},
		onLoad: function(options) {
			this.ID = options.ID;
			this.itemInfo = JSON.parse(uni.getStorageSync('nItemInfo') || "{}");
			console.log("事项ID：", this.itemInfo);
			this.loadData();

		},
		methods: {
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
					if (res.ReturnValue != null) {
						let model = res.ReturnValue;
						this.businessGuideModel = model;
						this.handleFiles(model.FORMS);
						this.handleDatas(model);
						this.getItemInfo(model.SXZXNAME)
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
					if (files.length > 0) {
						this.files = files;
					}
					// console.log("forms:", this.files);
				}
			},
			replaceStr(str) {
				if (str == null) return '暂无数据';
				return str.replace(/&nbsp;/g, '');
			},
			handleDatas(model) {
				let wangshangImg = ""; // 网上办理流程 可能是图片
				let chaungkouImg = "" // 窗口办理流程

				if (model.WLBLLC.indexOf('http') > -1) {
					wangshangImg = model.WLBLLC;
				} else {
					model.WLBLLC = model.WLBLLC.replace(/&times;/g, 'X');
				}
				if (model.SPCX.indexOf('http') > -1) {
					chaungkouImg = model.SPCX;
				}
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
						"id": 2,
						"title": "网上办理流程",
						"img": "../../static/images/banshi/icon_bs_wsbllc.png",
						"data": model.WLBLLC || '',
						"contentImg": wangshangImg,
						// "contentImg": 'https://uploadmatter.hnzwfw.gov.cn/fileserver/download.jsp?filePath=/group1/M00/1C/12/rBQCQl-aVS6ADTYoAACsHtWcfow264.png'
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
						"id": 6,
						"title": "窗口办理流程",
						"img": "../../static/images/banshi/icon_bs_chuangkou_banli_liucheng.png",
						"data": model.SPCX || '',
						"contentImg": chaungkouImg,
						// "contentImg": 'https://uploadmatter.hnzwfw.gov.cn/fileserver/download.jsp?filePath=/group1/M00/1C/12/rBQCQl-aVS6ADTYoAACsHtWcfow264.png'
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
					// 先检查登录
					// console.log("userInfo", this.$store.getters.userInfo)
					// debugger
					// if (this.$store.getters.hasLogin) {
					let url = '../base_apply/base_apply_page'
					url += `?itemName=${this.businessGuideModel.SXZXNAME}`;
					url += `&permId=${this.ID}`;
					this.$store.commit('updateApplyItemInfo', this.itemInfo);
					uni.navigateTo({
						url: url
					});
					// } else {
					// 	uni.navigateTo({
					// 		url: '../login/login'
					// 	});
					// }

				} else {
					uni.showToast({
						icon: 'none',
						title: '该事项暂不支持在线申报'
					})
				}

			},
		},
	}
</script>

<style lang="scss" scoped>
	.business-guide {
		background-color: #fff;

		.list-container {
			// padding-bottom: 200upx;
			overflow-y: scroll;

			.cell-border {
				border-top: 1upx solid #f1f1f1;
				border-bottom: 1upx solid #f1f1f1;
			}



			.cell {
				padding: 30upx;

				.top-section {
					justify-content: space-between;

					.left {
						font-size: 29upx;
						color: #333;
						justify-content: flex-start;

						.left-img {
							width: 86upx;
							height: 86upx;
							margin-right: 16upx;
						}
					}
				}

				.cell-bottom {
					padding-top: 30upx;
					font-size: 29upx;

					.file {
						padding: 16upx;
					}

					.cell-img {
						width: 100%;
						padding: 16upx;
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
				background-color: #007AFF;
				color: #FFFFFF;
				text-align: center;
				padding: 26upx 20upx;
				width: 90%;
				border-radius: 10upx;
			}
		}
	}
</style>
