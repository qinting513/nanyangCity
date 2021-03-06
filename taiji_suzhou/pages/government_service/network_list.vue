<template>
	<view class="network-list">
		<scroll-view class="list-container" scroll-y="true" :style="[heightStyle]">
			<view v-for="(item, index) in dataList" :key="index" class="flex-row cell" @click="gotoDetail(item)">
				<view class="flex-column left-cell">
					<view class="">
						{{item.NETWORKNAME}}
					</view>
					<view class="subtitle">
						详情地址: {{item.NETWORKADDRESS}}
					</view>
					<view class="subtitle">
						联系电话: {{item.NETWORKPHONE}}
					</view>
				</view>
				<view class="right-arrow"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Api from '../../static/js/api.js';
	import Http from '../../static/js/http.js';

	export default {
		name: "NetworkList",
		props: {
			heightStyle: {
				type: Object,
				value: {
					height: '600px'
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
				dataList: [],
			}
		},
		created() {
			// console.log("网点导航");
			this.loadData();
			uni.setNavigationBarTitle({
				title: '网点导航'
			});
		},
		methods: {
			gotoDetail(item) {
				if (this.isComponent) {
					this.$emit('gotoNetworkDetail', item);
				} else {
					item = encodeURIComponent(JSON.stringify(item));
					console.log("network_detail:", item);
					uni.navigateTo({
						url: '../government_service/network_detail?item=' + item
					})
				}
			},
			loadData(index) {
				if (this.dataList == null || this.dataList.length == 0) {
					Http.getNetworkList().then(res => {
						console.log("getNetworkList:", res);
						if (res.ReturnValue != null && res.ReturnValue.Items != null) {
							this.dataList = res.ReturnValue.Items;
						}
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	.network-list {
		font-size: 29upx;
		font-family: 'PingFangSC-Regular';
		color: #666666;

		.list-container {
			background-color: #fff;

			.cell {
				padding: 30upx 30upx 30upx 0upx;
				margin-left: 30upx;
				border-bottom: 1upx solid #f1f1f1;
				justify-content: space-between;

				.left-cell {
					align-items: flex-start;
					font-size: 30upx;
					color: #333;

					.subtitle {
						font-size: 27upx;
						color: #999;
						padding: 10upx 0;
					}
				}
			}

		}
	}
</style>
