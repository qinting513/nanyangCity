<template>
	<view class="item-list-wrap">
		<view class="item-list">
			<view class="search">
				<u-search :focus="autoFocus" height="40" :show-action="false" action-text="搜索" :animation="true"
					v-model="searchKeyWord" @search="startSearch"></u-search>
			</view>
			<view class="cell-list">
				<view v-for="(item, index) in dataList" :key="index" class="flex-column cell">
					<view class="flex-row top-section" @click="expendCell(index)">
						<view>
							<view :class="['name',expends[index]?'name-on':'']">
								{{item.SXZXNAME}}
							</view>
							<view class="desc">
								<text class="yuyue" v-if="item.ISRESERVE == '1'">
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
						<view v-for="(it,i) in  btnsAll" :key="i" class="flex-column btn" @click="btnClick(i, item)">
							<image
								:src="((i== 1 &&item.SFYDSB) || (i == 2 && item.ISRESERVE == '1')) ? it.enableImg : it.disableImg"
								mode="scaleToFill" class="btn-img"></image>
							<view
								:class="[(i == 0 || (i == 1 && item.SFYDSB) || (i == 2 && item.ISRESERVE == '1')) ? 'enable' : 'disable']">
								{{it.name}}
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="no-more" v-if="noMoreData && dataList.length > 10">
			没有更多数据了
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	import {
		mapState
	} from 'vuex';

	export default {
		name: "ItemList",
		data() {
			return {
				pageNum: 1,
				pageSize: 20,
				totalNum: 0,
				searchKeyWord: '',
				autoFocus: false,
				dataState: 'noData',
				noMoreData: false,
				dataList: [],
				userType: '1', // 1是个人 2是企业 3是部门
				pictureCode: '', // 用于网络请求的ID(部门办事时就是departmentId)
				pictureName: "", // 用于标题栏进行显示的
				expends: [],
				btnsAll: [{
						name: '指南',
						enableImg: "../../static/images/home/icon_banshi_zhinan.png",
						disableImg: "../../static/images/home/icon_banshi_zhinan.png",
					},
					{
						name: '申报',
						enableImg: "../../static/images/home/icon_banshi_shenbao.png",
						disableImg: "../../static/images/home/icon_banshi_ash_shenbao.png",
					},
					{
						name: '预约',
						enableImg: "../../static/images/home/icon_banshi_yuyue.png",
						disableImg: "../../static/images/home/icon_banshi_ash_yuyue.png"
					},
				],
			}
		},
		computed: mapState(['userInfo']),
		onLoad: function(option) {
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
			// this.loadData();
			setTimeout(function() {
				uni.startPullDownRefresh()
			}, 200)
		},
		methods: {
			expendCell(index) {
				this.$set(this.expends, index, !this.expends[index]);
				// console.log("expends:", this.expends);
			},
			btnClick(index, item) {
				console.log("index:", index, item);
				switch (index) {
					case 0: {
						uni.setStorageSync('nItemInfo', JSON.stringify(item));
						uni.navigateTo({
							url: `../business_guide/guide_page?ID=${item.ID}`
						});
						break;
					}
					case 1: {
						// 申报
						this.gotoApply(item);
						break;
					}
					case 2: {
						if (item.ISRESERVE == '1') {
							window.location.href = "http://111.6.77.68:8888/system/channel/getForm?id=845"
						} else {
							uni.showToast({
								icon: 'none',
								title: '该事项不支持在线预约'
							})
						}
						break;
					}
				}
			},
			gotoApply(item) {
				// debugger
				if (item.SFYDSB) {
					// P个人，C企业，A全部
					if (item.TYPE == 'C' && this.userInfo.userAuth) { // 企业事项，个人不能办理
						uni.showToast({
							icon: 'none',
							title: '该事项不支持个人办理'
						})
						return;
					} else if (item.TYPE == 'P' && this.userInfo.enterAuth) { // 个人事项，企业不能办理
						uni.showToast({
							icon: 'none',
							title: '该事项不支持法人办理'
						})
						return;
					}
					let url = '../base_apply/base_apply_page'
					url += `?itemName=${item.SXZXNAME}`;
					url += `&permId=${item.ID}`;
					this.$store.commit('updateApplyItemInfo', item);
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
			onPullDownRefresh() {
				this.pageNum = 1;
				this.totalNum = 0;
				// this.searchKeyWord = "";
				this.noMoreData = false;
				this.dataList = [];
				this.loadData();
			},
			loadData() {
				Http.getItemList(this.pictureCode, this.userType, this.pageNum + '', this.pageSize + '').then(res => {
					uni.stopPullDownRefresh();
					console.log("getItemList:", res);
					if (res.code == 200 && res.ReturnValue != null) {
						let list = res.ReturnValue;
						if (list.length > 0 && !this.noMoreData) {
							this.dataList = this.dataList.concat(list);
						}
						if (list.length < this.pageSize) { // 已经到最后一页了,页数不再加
							this.pageNum--;
							this.noMoreData = true;
						}
						console.log("数组长度:", this.dataList.length);
					} else {
						this.noMoreData = false;
						uni.showToast({
							icon: 'none',
							title: '网络异常，请稍后重试'
						})
						this.pageNum--;
					}
				});

			},
			onReachBottom() {
				if (this.noMoreData) {
					uni.showToast({
						icon: 'none',
						title: '没有更多数据了'
					})
				} else {
					this.pageNum++;
					this.loadData();
				}
			},
			startSearch() {
				console.log("searchWord:", this.searchKeyWord);
				if (this.searchKeyWord.trim().length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入关键词'
					})
					return;
				}
				Http.getPermByPermname(this.searchKeyWord).then(res => {
					console.log("getPermByPermname list:", res);
					if (res.code == 200) {
						this.dataList = res.ReturnValue;
					}
					if (this.dataList.length == 0) {
						this.dataState = 'noData'
					} else {
						this.dataState = 'hasData'
					}
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	.item-list {
		background-color: #fff;
		padding: 10upx 0;

		.search {
			margin: 20upx 30upx;
			border-radius: 50upx;
			background-color: #F1F1F1;
			border: 1upx solid #F1F1F1;
			padding: 20upx 30upx;
			font-size: 29upx;
		}

		.cell:last-child {
			border: none;
		}

		.cell {
			align-items: flex-start;
			margin: 0 30upx;
			padding: 30upx 0;
			border-bottom: 1upx solid #F1F1F1;
			// overflow: hidden;
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
				justify-content: space-around;
				height: 120upx;
				width: 100%;
				// padding: 0 40upx;
				margin-top: 30upx;

				.btn {
					justify-content: center;
					font-size: 25upx;

					.btn-img {
						width: 48upx;
						height: 48upx;
						margin-bottom: 6upx;
					}
				}

				.enable {
					color: #000;
				}

				.disable {
					color: #999999;
				}
			}
		}
	}

	.no-more {
		padding: 30upx 0;
		text-align: center;
		color: #999999;
		background-color: #F1F1F1;
	}
</style>
