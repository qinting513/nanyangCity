<template>
	<view class="hotlist">
		<view class="list">
			<view class="search">
				<u-search :focus="autoFocus" height="40" :show-action="false" placeholder="请输入关键字"
					v-model="searchKeyWord" @search="startSearch"></u-search>
			</view>

			<view class="">
				<view class="item" v-for="(item, i) in dataList" :key="i" @click="gotoDetail(item)">
					<view class="">{{item.SXZXNAME}}</view>
					<view class='right-arrow'></view>
				</view>
			</view>
			<view class="no-data">
				<nodata-view :dataState="dataState"></nodata-view>
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	export default {
		data() {
			return {
				dataList: [],
				searchKeyWord: '',
				autoFocus: false,
				dataState: 'noData',
			}
		},
		onLoad(options) {
			let type = options.type;
			if (type == 'search') {
				this.autofocus = true
				uni.setNavigationBarTitle({
					title: '事项搜索'
				})
			} else {
				this.loadData();
			}
		},
		methods: {
			loadData() {
				if (this.dataList == null || this.dataList.length == 0) {
					Http.getHotPermList().then(res => {
						console.log("getHotPermList:", res);
						if (res.code == 200) {
							this.dataList = res.ReturnValue.Items || [];
						}
						if (this.dataList && this.dataList.length > 0) {
							this.dataState = 'init'
						} else {
							this.dataState = 'noData'
						}
					});
				}
			},
			startSearch() {
				console.log("searchWord:", this.searchKeyWord);
				if (this.searchKeyWord && this.searchKeyWord.trim().length == 0) {
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '请输入关键词'
					// })
					this.dataList = [];
					this.loadData();
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
						this.dataState = 'init'
					}
				});
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: `../business_guide/business_guide?ID=${item.ID}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotlist {
		background-color: #F2F5F5;
		height: 100vh;

		.list {
			background-color: #FFFFFF;
			padding-top: 10upx;
			padding-bottom: 10upx;

			.search {
				margin: 20upx 30upx;
				border-radius: 50upx;
				// box-shadow: 0 0 10px #D2D2D2;
				background-color: #F1F1F1;
				border: 1upx solid #F1F1F1;
				padding: 20upx 30upx;
				font-size: 29upx;

				input {
					padding-left: 10upx;
				}
			}

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 24upx 0upx;
				margin: 0 30upx;
				border-bottom: 1px solid #F1F1F1;
				color: #222;
				font-size: 30upx;
				font-weight: 500;

				.item-left {
					align-items: center;
				}

				.item-icon {
					width: 90upx;
					height: 90upx;
					margin-right: 20upx;
					flex-shrink: 0;
				}
			}

			.item:last-child {
				border-bottom: none;
			}
		}
	}
</style>
