<template>
	<view class="s-query">
		<view class="search-wrap">
			<view class="s-search">
				<u-search height="90" shape="square" :clearabled="true" placeholder="请输入搜索人姓名" :show-action="false"
					search-icon="" v-model="userName"></u-search>
			</view>
			<view class="flex-row s-search">
				<u-search height="90" shape="square" :clearabled="true" placeholder="请输入业务流水号" :show-action="false"
					search-icon="" v-model="bsnum"></u-search>
				<view class="scan" @click="scanCode">
					<u-icon name="scan" color="#2979ff" size="60"></u-icon>
				</view>
			</view>
		</view>
		<view class="button" @click="searchProcess">进度查询</view>
		<view class="tips-view">
			{{tip}}
		</view>
	</view>
</template>

<script>
	import Http from "@/static/js/nanyang_http.js"
	export default {
		data() {
			return {
				tip: "提示：可能点击二维码扫描按钮，扫描“业务受理回执单”上的二维码进行查询",
				userName: '杜廷广',
				bsnum: '411323033210311A000003'
			}
		},
		methods: {
			scanCode() {
				// uni.
			},
			searchProcess() {
				if (!this.checkInputData()) {
					return;
				}
				uni.navigateTo({
					url: `./schedule_query_result?id=${this.bsnum}&username=${this.userName}`
				});
				
				// debugger
				// 411323033210311A000003
				// 杜廷广
				// let params = {
				// 	"APPNAME": this.userName,
				// 	"BSNUM": this.bsnum,
				// }
				// Http.getBusinessProcess(params).then(res => {
				// 	debugger
				// 	console.log(res)
				// 	if (res.code == '200') {
				// 		let result = JSON.stringify(res.ReturnValue)
				// 		uni.navigateTo({
				// 			url: `./schedule_query_result?bsnum=${this.bsnum}&username=${this.userName}`
				// 		})
				// 	} else {
				// 		uni.showToast({
				// 			title: "未查询到数据",
				// 			icon: "none"
				// 		})
				// 	}
				// }).catch(err => {
				// 	console.log(err)
				// 	uni.showToast({
				// 		title: "查询失败",
				// 		icon: "none"
				// 	})
				// })
			},
			checkInputData() {
				if (this.userName.trim().length == 0) {
					uni.showToast({
						title: "请输入搜索人姓名",
						icon: "none"
					})
					return false
				}
				if (this.bsnum.trim().length == 0) {
					uni.showToast({
						title: '请输入业务流水号',
						icon: "none"
					})
					return false
				}
				return true;
			}
		}
	}
</script>

<style lang="scss">
	.s-query {
		.search-wrap {
			background-color: #FFFFFF;
			padding: 10upx 30upx;
		}

		.s-search {
			padding: 16upx 0;
			color: #000000;
		}

		.scan {
			width: 100upx;
			height: 100upx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.button {
			background-color: $uni-main-theme-color;
			margin: 30upx;
			text-align: center;
			height: 90upx;
			line-height: 90upx;
			color: #FFFFFF;
			font-size: 32upx;
			letter-spacing: 2upx;
			border-radius: 10upx;
		}

		.tips-view {
			color: #999;
			padding: 20upx 30upx;
			font-size: 28upx;
		}
	}
</style>
