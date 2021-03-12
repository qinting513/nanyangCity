<template>
	<view class="hot-service">
		<view class="list">
			<view class="search">
				<u-search :focus="autoFocus" height="40" :show-action="false" action-text="搜索" :animation="true"
					v-model="searchKeyWord" @search="startSearch"></u-search>
			</view>

			<view class="">
				<view class="item" v-for="(item, i) in dataList" :key="i" @click="gotoDetail(item)">
					<view class="flex-row item-left">
						<image :src="item.PIC" mode="aspectFill" class="item-icon"></image>
						<view class="">{{item.SORTNAME}}</view>
					</view>
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
				dataState: 'init',
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: '热门服务'
			})
			this.loadData();
		},
		methods: {
			loadData() {
				if (this.dataList == null || this.dataList.length == 0) {
					//  个人办事 传1
					Http.getBusinessItems('1').then(res => {
						console.log("事项列表", res);
						let result = res.ReturnValue;
						result.forEach(item => {
							// if(item.PIC) {
							// 	item.PIC = Http.downloadFileURL + item.PIC;
							// }
							item.PIC = `../../static/images/business/${item.SORTCODE}.png`
						});
						this.dataList = result;
						if (this.dataList.length == 0) {
							this.dataState = 'noData'
						} else {
							this.dataState = 'init'
						}
					}, err => {

					});
				}
			},
			startSearch() {
				console.log("searchWord:", this.searchKeyWord);
				debugger
				if (this.searchKeyWord.trim().length == 0) {
					this.dataList = [];
					this.loadData();
					return;
				}

				// 直接本地的搜索即可
				let result = []
				for (let i = 0; i < this.dataList.length; i++) {
					let item = this.dataList[i];
					if (item.SORTNAME.indexOf(this.searchKeyWord) > -1) {
						result.push(item)
					}
				}
				this.dataList = result;
				if (this.dataList.length == 0) {
					this.dataState = 'noData'
				} else {
					this.dataState = 'init'
				}
			},
			gotoDetail(item) {
				let url =
					`/pages/government_service/item_list?userType=${this.userTypeFlag}&pictureCode=${item.SORTCODE}&pictureName=${item.SORTNAME}`;
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-service {
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
				padding: 16upx 0upx;
				margin: 0 30upx;
				border-bottom: 1px solid #F1F1F1;
				color: #222;
				font-size: 34upx;
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
