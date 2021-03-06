<template>
	<view class="base-form-web">	
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		name: 'BaseFormWeb',
		data() {
			return {
				url: "http://61.178.200.43:8200/u/forms/A/A.html?shareformvalue="
			}
		},
		onLoad() { 
			//这里对要传入到webview中的参数进行encodeURIComponent编码否则中文乱码
			   let userInfo = {REALNAME:"任我行"};
				userInfo = JSON.stringify(userInfo);
				this.url += encodeURIComponent(userInfo);
		},
		methods: {},
	}
</script>

<style scoped>
	.next {
		background-color: #FFFF00;
		position: fixed;
		z-index: 99999;
		height: 100upx;
		width: 100vw;

	}
</style>
