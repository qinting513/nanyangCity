<template>
	<view class="network-detail">
		<view class="flex-row network-name" v-if="model.NETWORKNAME != null">
			<view>
				{{model.NETWORKNAME}}
			</view>
			<image class="address-img" src="../../static/images/home/icon_address_guide.png" mode="scaleToFill"></image>
		</view>
		<view v-for="(item,index) in dataList" :key="index" class="cell">
			<view class="flex-row cell-left">
				<view class="flex-column cell-item">
					<view class="title">
						{{item.title}}
					</view>
					<view class="subtitle">{{item.data}}</view>
				</view>
				<view v-if="item.showDetail == 1" class="right-arrow"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../static/js/api.js';
	import Http from '../../static/js/http.js';

	export default {
		name: "NetworkDetail",
		data() {
			return {
				dataList: [],
				model: null,
			}
		},
		onLoad(option) {
			console.log("networkd detail:", option);
			const model = JSON.parse(decodeURIComponent(option.item));
			this.model = model;

			if (model != null) {
				this.dataList = [{
						"title": "咨询电话",
						"data": model.NETWORKPHONE || ''
					},
					{
						"title": "办事地址",
						"data": model.NETWORKADDRESS || '',
						"showDetail": 1
					},
					{
						"title": "服务时间",
						"data": model.OFFICEHOURS || '',
					},
					{
						"title": "服务事项",
						"data": `服务中心可办理${model.PERMNUM}项服务`,
					},
					{
						"title": "交通信息",
						"data": model.TRAFFIC || '',
					}
				]
			}
		},
		methods: {

		},
	}
</script>

<style lang="scss" scoped>
	.network-detail {
		.network-name {
			justify-content: space-between;
			font-size: 34upx;
			color: #000000;
			padding: 34upx 26upx;
			border-bottom: 1upx solid #f1f1f1;

			.address-img {
				width: 50upx;
				height: 50upx;
			}
		}

		.cell {
			padding: 30upx;
			border-bottom: 1upx solid #f1f1f1;

			.cell-left {
				justify-content: space-between;
			}

			.cell-item {
				align-items: flex-start;

				.title {
					color: #000;
					font-size: 32upx;
					margin-bottom: 10upx;
				}

				.subtitle {
					color: #999;
					font-size: 28upx;
				}
			}
		}
	}
</style>
