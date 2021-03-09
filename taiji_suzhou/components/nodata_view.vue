<template>
	<view v-if="dataState == 'noData'" class="nodata-containenr">
		<image src="../static/images/home/nodata.png" class="nodata-image" mode="aspectFit"></image>
		暂无数据
	</view>
</template>

<script>
	//数据状态:初始化'init' 无数据'noData' 有数据'hasData'
	export default {
		name:"NoDataView",
		props:{
			dataState:{
				type:String,
				default:'init'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.nodata-containenr{
		position: absolute;
		width: 400upx;
		height: 350upx;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		margin: auto;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-size: 28upx;
		.nodata-image{
			width: 400upx;
			height: 300upx;
			margin-bottom: 20upx;
		}
	}
</style>
