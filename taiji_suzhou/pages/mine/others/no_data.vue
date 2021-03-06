<template>
	<view class="contaner">
		<image src="../../../static/images/home/icon_no_data.png" mode="aspectFit"></image>
		<text>暂无数据</text>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.contaner {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 200px;
		align-items: center;
		justify-content: center;
		image {
			width: 80px;
			height: 80px;
		}
		text {
			margin-top: 10px;
			font-size: 14px;
			color: rgb(128,128,128);
		}
	}
</style>
