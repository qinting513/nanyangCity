<template>
	<view class="step-cell">
		<view class="cell">
			<view class="item-step-start-end">
				<view class="step-left">
					<view class="step-icon">
						<u-icon name="play-circle" size="50rpx"></u-icon>
					</view>
					<view class="line-on"></view>
				</view>
				<view class="setp-value" @click="show">
					开始
				</view>
			</view>
			<view class="item-step-start-end" v-for="(item, index) in LOGS" :key="index">
				<view class="step-left">
					<view :class="index != LOGS.length - 1 ? 'step-icon' : 'step-icon-on'">
						<u-icon name="clock" size="50rpx"></u-icon>
					</view>
					<view v-show="index < LOGS.length - 1 || STATUS != 0" class="line-on"></view>
				</view>

				<view class="setp-value">
					<view class="">
						环节名称：<text class="value">{{item.NODENAME}}</text>
					</view>
					<view class="">
						办理意见：<text class="value">{{item.IDEA}}</text>
					</view>
					<view class="value-handletime">
						办理时间：<text class="value">{{item.HANDLETIME}}</text>
					</view>
				</view>
			</view>
			<!-- 结束 -->
			<view v-show="STATUS != 0" class="item-step-start-end">
				<view class="step-icon-on">
					<u-icon :name="STATUS != 6 ? 'close-circle' : 'checkmark-circle'" size="50rpx"></u-icon>
				</view>
				<view class="setp-value">
					结束
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			LOGS: {
				type: Array,
				default: () => [],
			},
			STATUS: {
				type: String,
				default: "0",
			},
		},
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.step-cell {
		.item-step-start-end {
			margin: 10upx;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			font-size: 30upx;
		}

		.step-left {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
		}

		.step-icon {
			height: 50upx;
			width: 50upx;
			background-color: #FCFCFD;
			border-radius: 50%;
			color: #007AFF
		}

		.step-icon-on {
			height: 50upx;
			width: 50upx;
			background-color: #007AFF;
			border-radius: 50%;
			color: #FFFFFF;
		}

		.line-on {
			margin-top: 5upx;
			width: 0upx;
			height: 150rpx;
			border: 1px solid #007AFF;
		}

		.setp-value {
			margin-left: 30upx;
			font-size: 28upx;
			color: #232323;
		}
	}
</style>
