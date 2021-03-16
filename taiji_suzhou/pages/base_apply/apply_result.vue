<template>
	<view class="apply-result">
		<view class="info-wrap">
			<image class="info-img" src="../../static/images/home/applysuccess.png" mode="aspectFill"></image>
			<view class="info-result">提交成功，等待受理</view>
			<view class="info-content">
				<view class="i-pd">
					为保证您提交的材料准确无误，稍后工作人员会对
				</view>
				<view class="i-pd">
					您提交的材料进行核验。
				</view>
				<view class="i-pd">
					如果材料有误，我们会以消息的方式通知您，
				</view>
				<view class="i-pd">
					请您注意查收消息，请在<text class="blue" @click="gotoMessage">APP-我的消息</text>内查看消息内容
				</view>
			</view>

			<view class="info-num" v-if="bsnum">
				申报号 <text class="blue pd-left">{{bsnum}}</text>
			</view>
		</view>
		<view class="btns">
			<view class="btn bg" @click="gotoBusiness">
				查看我的办事
			</view>
			<view class="btn" @click="goHome">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	
	export default {
		data() {
			return {
				bsnum: null
			}
		},
		computed: mapState(['isAndroid', 'isIOS']),
		onLoad(options) {
			if (options.bsnum) {
				this.bsnum = options.bsnum;
			}
		},
		methods: {
			goHome() {
				// 回到App首页
				// 4.4.关闭
				// 说明：此方法用于调用APP关闭webview窗口的方法。
				// Android方法：android.close()
				// iOS方法：innoPlus.native.close()
				if(this.isAndroid) {
					android.close();
				} else if(this.isIOS) {
					innoPlus.native.close();
				}
			},
			gotoBusiness() {
				let url = "/pages/mine/my_business_page/my_business_page"
				if (this.bsnum) {
					url += `?isFromMine=1`
				}
				setTimeout(() => {
					uni.redirectTo({
						url: url
					});
				}, 1500);
			},
			gotoMessage() {

			},
		}
	}
</script>

<style lang="scss" scoped>
	.apply-result {
		.info-wrap {
			background-color: #FFFFFF;
			padding: 30upx 20upx;
			text-align: center;

			.info-img {
				width: 250upx;
				height: 250upx;
				margin: 30upx 0;
			}

			.info-result {
				font-size: 36upx;
				color: #000000;

			}

			.i-pd {
				padding: 8upx 0;
			}

			.info-content {
				font-size: 27upx;
				color: #999;
				padding: 30upx;
			}

			.info-num {
				color: #000000;
				font-size: 38upx;
				font-weight: 700;
				padding: 20upx 0;
			}

			.blue {
				color: #007AFF;
			}

			.pd-left {
				padding-left: 20upx;
			}
		}

		.btns {
			margin: 50upx;
			text-align: center;

			.btn {
				padding: 20upx;
				font-size: 36upx;
				color: #007AFF;
				border: 1px solid #007AFF;
				border-radius: 8upx;
				margin-bottom: 30upx;
			}

			.bg {
				background-color: #007AFF;
				color: #FFFFFF;
			}
		}
	}
</style>
