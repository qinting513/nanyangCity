<template>
	<view class="query-result">
		<view class="container">
			<view v-if="!bsModel" class="no-data-view">
				<nodata-view dataState="noData"></nodata-view>
			</view>
			
			<view v-else>
				<view class="schedule-info" @click="showApply">
					<view class="item-row" v-for="(title, index) in titleList" :key="index">
						<view class="item-title">{{ title }}</view>
						：
						<view class="item-detail">{{ getDetail(index) }}</view>
					</view>
				</view>
				<view class="schedule-step">
					<businessStep :LOGS="bsModel.LOGS" :STATUS="bsModel.STATUS"></businessStep>
				</view>
				<view class="up-body">

				</view>
			</view>

		</view>
	</view>
</template>
<script>
	import businessStep from "@/components/my_business_step.vue"
	import Http from "@/static/js/nanyang_http.js"
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			businessStep,
		},
		data() {
			return {
				bsModel: null,
				titleList: ["业务流水号", "办理事项", "办理部门", "申请人"],
			}
		},
		onLoad(options) {
			this.loadData(options);
		},
		methods: {
			checkData(username, bsnum) {
				if (username.trim().length == 0) {
					uni.showToast({
						title: "搜索人姓名不能为空",
						icon: "none"
					})
					return false
				}
				if (bsnum.trim().length == 0) {
					uni.showToast({
						title: '业务流水号不能为空',
						icon: "none"
					})
					return false
				}
				return true;
			},
			loadData(options) {
				// options的id就是业务流水号
				if (!this.checkData(options.username, options.id)) {
					return;
				}
				let params = {
					"APPNAME": options.username,
					"BSNUM": options.id,
				}
				Http.getBusinessProcess(params).then(res => {
					console.log(res)
					if (res.code == '200') {
						this.bsModel = res.ReturnValue;
						this.bsModel.SXZXNAME = this.bsModel.SXZXNAME ? this.bsModel.SXZXNAME : this.bsModel.PNAME;
						this.bsModel.APPNAME = this.bsModel.APPNAME ? this.bsModel.APPNAME : this.bsModel
						.APPLICANT;
						// this.bsModel.STATUS = '1';
						console.log("schedule res:", this.bsModel)
					} else {
						uni.showToast({
							title: "未查询到数据",
							icon: "none"
						})
					}
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: "查询失败",
						icon: "none"
					})
				})
			},
			getDetail(index) {
				switch (index) {
					case 0:
						return this.bsModel.BSNUM;
						break;
					case 1:
						return this.bsModel.SXZXNAME;
						break;
					case 2:
						return this.bsModel.DEPTNAME;
						break;
					case 3:
						return this.bsModel.APPNAME;
						break;
					default:
						break;
				}
				return '';
			},
			showApply() {
				let url = '/pages/base_apply/base_apply_page?readOnly=true';
				url += `&itemName=${this.bsModel.SXZXNAME}`;
				url += `&permId=${this.bsModel.PERMID}`;
				url += `&bsnum=${this.bsModel.BSNUM}`;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.query-result {
		background-color: #FFFFFF;
		height: 100%;
		.container {
			width: 100%;
			padding: 10upx 30upx;
		}

		.schedule-info {
			background-color: #FFFFFF;
			font-size: 30upx;
			box-shadow: 2upx 2upx 20upx #ddd;
			padding: 20upx;
			margin-top: 40upx;
			border-radius: 15upx;

		}

		.item-row {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin: 20upx auto;
			height: 60upx;
		}

		.item-title {
			width: 160upx;
			text-align: right;
			flex-shrink: 0;
		}

		.item-detail {
			margin-left: 10upx;
			flex: 1;
			word-break: break-all;
			color: #666;
		}

		.schedule-step {
			margin: 50upx 0;
		}

		.up-body {
			height: 100upx;
		}
	}
</style>
