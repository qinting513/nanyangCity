<template>
	<view class="convenientService">
		<view class="section" v-for="(t,i) in list" :key="i">
			<view class="section-title">
				{{t.tab}}
			</view>
			<view class="tabs">
				<view class="tab" v-for="(item, j) in t.tabs" :key="j" @click="tabClick(item.url)">
					<image :src="item.imgPath" mode="aspectFill" class="tab-img"></image>
					<view class="tab-title">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ConvenientItems from './convenient.js';
	export default {
		name: 'ConvenientService',
		components: {

		},
		data() {
			return {
				list: ConvenientItems.items,
			}
		},
		methods: {
			tabClick(url){
				if (url) {
					window.location.href = url;
				} else {
					uni.showToast({
						title:'功能暂未开放'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.convenientService {
		padding: 30upx;
		.section {
			margin-bottom: 20upx;
			.section-title {
				font-size: 36upx;
				font-weight: bold;
				color: #000000;
				padding: 20upx 0;
			}
			.tabs {
				font-size: 28upx;
				color: #666;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				
				.tab {
					width: 24.8%;
					height: 120upx;
					box-sizing: border-box;
					padding: 10upx;
					text-align: center;
					margin-bottom: 30upx;
					.tab-img {
						width: 70upx;
						height: 70upx;
						margin-bottom: 10upx;
					}
				}
			}
		}

	}
</style>
