<template>
	<view class="business-page">
		<view class="flex-row service-container">
			<view class="flex-column service-cell" v-for="(item,index) in dataList" :key="index"
				@click="gotoDetail(item)">
				<image :src="item.PIC" mode="scaleToFill" class="cell-img"></image>
				<view class="ellipsis title">{{item.SORTNAME}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	export default {
		name: "businessPage",
		props: {
			// 1个人办事 2法人办事
			userType: {
				type: String,
				default: () => {
					return '1'
				}
			},
			//  是组件还是页面
			isComponent: {
				type: Boolean,
				value: false
			}
		},
		data() {
			return {
				isLoading: false,
				dataList: [],
				userTypeFlag: '1', // 当是页面的时候 通过参数传递进来的 跟userType同一个东西
			}
		},
		created(options) {
			// debugger
			if (this.isComponent) {
				this.userTypeFlag = this.userType;
				uni.setNavigationBarTitle({
					title: (this.userType == 1 ? '个人办事' : '法人办事')
				});
			}
			this.loadData();
		},
		onLoad(options) {
			// debugger
			if (!this.isComponent) {
				this.userTypeFlag = options.userType
				uni.setNavigationBarTitle({
					title: (options.userType == 1 ? '个人办事' : '法人办事')
				});
			} else {
				this.userTypeFlag = this.userType;
			}
			this.loadData();
			// console.log("start load", this.userTypeFlag, options);
		},
		methods: {
			loadData(index) {
				if (this.isLoading) {
					return;
				}
				this.isLoading = true;
				if (this.userTypeFlag == 1) {
					// 个人办事
					this.dataList = uni.getStorageSync('nListGrbs');
				} else {
					// 企业办事
					this.dataList = uni.getStorageSync('nListQybs');
				}
				if (this.dataList == null || this.dataList.length == 0) {
					Http.getBusinessItems(this.userTypeFlag).then(res => {
						this.isLoading = false;
						console.log("事项列表", res);
						if (res.code == 200 && res.ReturnValue) {
							let result = res.ReturnValue;
							result.forEach(item => {
								item.PIC = `../../static/images/business/${item.SORTCODE}.png`
							});
							this.dataList = result;
							if (this.userTypeFlag == 1) {
								// 个人办事
								uni.setStorageSync('nListGrbs', this.dataList);
							} else {
								// 企业办事
								uni.setStorageSync('nListQybs', this.dataList);
							}
						}
						
					}, err => {
						this.isLoading = false;
						uni.showToast({
							title: '网络异常，请稍后重试',
							icon: 'none'
						})
					});
				}
			},
			gotoDetail(item) {
				if (this.isComponent) {
					// 如果是组件则需要在其所在的页面调用uni.navigateTo才有用
					this.$emit('gotoDetail', {
						item: item,
						userType: this.userTypeFlag
					});
				} else {
					let url =
						`./item_list?userType=${this.userTypeFlag}&pictureCode=${item.SORTCODE}&pictureName=${item.SORTNAME}`;
					// console.log("item url:", item, url);
					uni.navigateTo({
						url: url
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.business-page {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	.service-container {
		background-color: #fff;
		padding-top: 20upx;
		padding-bottom: 30upx;
		justify-content: flex-start;
		flex-wrap: wrap;

		.service-cell {
			box-sizing: border-box;
			width: 25vw;
			height: 25vw;
			text-align: center;

			.cell-img {
				width: 80upx;
				height: 80upx;
			}

			.title {
				max-width: 24vw;
				padding: 8upx;
				font-size: 29upx;
				color: #333333;
			}
		}

	}
</style>
