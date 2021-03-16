<template>
	<view class="user-instructions">
		<view class="list">
			<view class="lc-cell" v-for="(m, i) in dataList" :key="i">
				<view class="lc-title">{{m.title}}</view>
				<view class="lc-content">
					<view class="" v-if="m.data.length > 0" v-html="m.data"></view>
					<view class="" v-else>
						暂无数据
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-btns">
			<view class="flex-row agreement">
				<image class="radio-img"
					:src="isCheck ?  '../../static/images/home/icon_checkbox_on.png' : '../../static/images/home/icon_checkbox.png'"
					@click="isCheck=!isCheck" mode="aspectFit"></image>
				<view>我承诺本人填写的信息和上传的材料真实有效，且同意在事项办理过程中调用本人的相关数据。<text class="xieyi" @click="gotoXieyi">《协议》</text>
				</view>
			</view>

			<view class="btn" @click="gotoDeclare">
				进入办事
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	export default {
		name: 'userInstructions',
		data() {
			return {
				isCheck: false,
				dataList: [],
				SXZXNAME: '',
				ID: '',
				itemInfo: {},
				businessGuideModel: {},
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: '用户须知'
			})
			this.ID = options.ID || '';
			this.loadData();
		},
		methods: {
			loadData() {
				Http.getBusinessGuideData(this.ID).then(res => {
					console.log("getBusinessGuideData", res);
					if (res.code == 200 && res.ReturnValue != null) {
						let model = res.ReturnValue;
						this.itemInfo = model.PERMISSION;
						this.$store.commit('updateApplyItemInfo', this.itemInfo);
						this.handleDatas(model);
					}
				});
			},
			handleDatas(model) {
				model.SPTJ = model.SPTJ.replace(/&nbsp;/g, '');
				model.SPTJ = model.SPTJ.replace(/；/g, '；<br />');
				this.dataList = [{
						"id": 0,
						"title": "办理条件",
						"data": model.SPTJ
					},
					{
						"id": 1,
						"title": "办理依据",
						"data": model.LAWPRODUCE || '暂无数据'
					},
				]
			},
			gotoXieyi() {
				uni.navigateTo({
					url: './agreement'
				})
			},
			gotoDeclare() {
				if (!this.isCheck) {
					uni.showToast({
						icon: 'none',
						title: '请先阅读并同意用户须知'
					})
					return
				}
				let url = '../base_apply/base_apply_page'
				url += `?itemName=${this.itemInfo.SXZXNAME}`;
				url += `&permId=${this.ID}`;
				uni.navigateTo({
					url: url
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		padding-bottom: 250upx;
		overflow-y: scroll;

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
				font-size: 30upx;
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
		// height: 200upx;
		padding: 30upx;

		.agreement {
			font-size: 26upx;
			color: #666;

			.radio-img {
				width: 40upx;
				height: 40upx;
				margin-right: 10upx;
				flex-shrink: 0;
			}
		}

		.btn {
			margin-top: 30upx;
			color: #FFFFFF;
			text-align: center;
			padding: 26upx 20upx;
			border-radius: 10upx;
			background-color: #007AFF;
		}

		.xieyi {
			color: #007AFF;
		}
	}
</style>
