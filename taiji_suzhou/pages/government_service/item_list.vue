<template>
	<view class="item-list">
		<view v-for="(item, index) in dataList" :key="index" class="flex-column cell">
			<view class="flex-row top-section" @click="expendCell(index)">
				<view>
					<view :class="['name',expends[index]?'name-on':'']">
						{{item.SXZXNAME}}
					</view>
					<view class="desc" v-if="item.ISRESERVE">
						<text class="yuyue">
							可预约
						</text>
						<text class="shenbao" v-if="item.SFYDSB">
							可申报
						</text>
						<text class="ellipsis bumen">
							{{item.DEPTNAME || ''}}
						</text>
					</view>
				</view>
				<view :class="[expends[index] ? 'bottom-arrow':'right-arrow']"></view>
			</view>
			<view class="flex-row cell-bottom" v-if="expends[index]">
				<view v-for="(it,i) in btns" :key="i" class="flex-column btn" @click="btnClick(i, item)">
					<image :src="it.img" mode="scaleToFill" class="btn-img"></image>
					<view class="">{{it.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	export default {
		name: "ItemList",
		data() {
			return {
				dataList: [],
				userType: '1', // 1是个人 2是企业 3是部门
				pictureCode: '', // 用于网络请求的ID(部门办事时就是departmentId)
				pictureName: "", // 用于标题栏进行显示的
				expends: [],
				btns: [{
						name: '指南',
						img: "../../static/images/home/icon_banshi_zhinan.png"
					},
					{
						name: '申报',
						img: "../../static/images/home/icon_banshi_shenbao.png"
					},
					{
						name: '预约',
						img: "../../static/images/home/icon_banshi_yuyue.png"
					},
				]
			}
		},
		onLoad: function(option) {
			console.log(option);
			if (option.pictureName.length > 0) {
				uni.setNavigationBarTitle({
					title: option.pictureName
				});
			}
			if (option.pictureCode != null) {
				this.pictureCode = option.pictureCode;
			}
			if (option.userType != null) {
				this.userType = option.userType
			}
			this.loadData();
		},
		methods: {
			expendCell(index) {
				this.$set(this.expends, index, !this.expends[index]);
				console.log("expends:", this.expends);
			},
			btnClick(index, item) {
				console.log("index:", index, item);
				switch (index) {
					case 0: {
						// 办事指南
						// let itemInfo = encodeURIComponent(JSON.stringify(item));
						uni.setStorageSync('guide__item', JSON.stringify(item));
						uni.navigateTo({
							url: '../business_guide/business_guide' // ?itemInfo='+itemInfo
						});
						break;
					}
					case 1: {
						// 申报
						if (item.SFYDSB) {
							// 先检查登录
							// console.log("userInfo", this.$store.getters.userInfo)
							if (this.$store.getters.hasLogin) {
								let url = '../base_apply/base_apply_page'
								url += `?itemName=${item.SXZXNAME}`;
								url += `&permId=${item.ID}`;
								this.$store.commit('updateApplyItemInfo', item);
								uni.navigateTo({
									url: url
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								})
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '该事项暂不支持在线申报'
							})
						}
						break;
					}
					case 2: {
						console.log("预约");
						break;
					}
				}
			},
			loadData() {
				Http.getItemList(this.pictureCode, this.userType).then(res => {
					// console.log("getItemList:", JSON.stringify(res));
					if (res.ReturnValue != null) {
						this.dataList = res.ReturnValue;
					}
				});

			},
		},
	}
</script>

<style lang="scss" scoped>
	.item-list {
		background-color: #fff;

		.cell {
			align-items: flex-start;
			margin: 0 30upx;
			padding: 30upx 0;
			border-bottom: 1upx solid #F1F1F1;
			overflow: hidden;
			background-color: #fff;

			.top-section {
				justify-content: space-between;
				width: 98%;

				.name {
					color: #000000;
					font-size: 32upx;
				}

				.name-on {
					color: #0072ff;
				}

				.desc {
					margin-top: 10upx;
					font-size: 24upx;
					color: #999999;

					.yuyue {
						color: #0085F7;
						background-color: #F0F8FF;
						padding: 6upx 16upx;
						margin: 6upx 12upx 6upx 0;
						border-radius: 30upx;
					}

					.shenbao {
						color: #50BB2C;
						background-color: #F5FFF2;
						padding: 6upx 16upx;
						margin: 6upx 12upx 6upx 0;
						border-radius: 30upx;
					}

					.bumen {
						width: 300upx;
					}
				}
			}

			.cell-bottom {
				justify-content: space-between;
				height: 120upx;
				width: 80%;
				padding: 0 40upx;
				margin-top: 30upx;

				.btn {
					justify-content: center;
					color: #333;
					font-size: 25upx;

					.btn-img {
						width: 48upx;
						height: 48upx;
						margin-bottom: 6upx;
					}
				}
			}
		}
	}
</style>
