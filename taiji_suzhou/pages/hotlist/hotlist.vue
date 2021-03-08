<template>
	<view class="hotlist">
		<view class="list">
			<view class="search flex-row">
				<icon type="search" size="16" />
				<input type="text" placeholder="请输入事项名称" />
			</view>
			<view class="no-data">
				暂无数据
			</view>
			<view class="item" v-for="(item, i) in dataList" :key="i">
				<view class="">{{item.SXZXNAME}}</view>
				<view class='right-arrow'></view>
			</view>
		</view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	export default {
		data() {
			return {
				dataList: []
			}
		},
		created(options) {
			this.loadData();
		},
		methods: {
			loadData() {
				if (this.dataList == null || this.dataList.length == 0) {
					Http.getHotPermList().then(res => {
						console.log("getHotPermList:", res);
						if (res.code == 200) {
							this.dataList = res.ReturnValue.Items || [];
						}
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.hotlist {
		background-color: #F2F5F5;
		height: 100vh;

		.list {
			background-color: #FFFFFF;
			padding-top: 30upx;

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
				padding: 30upx 0upx;
				margin: 0 30upx;
				border-bottom: 1px solid #F1F1F1;
				color: #222;
			}

			.item:last-child {
				border-bottom: none;
			}
			.no-data {
				padding: 50upx 0;
				text-align: center;
				color: #999999;
			}
		}
	}
</style>
