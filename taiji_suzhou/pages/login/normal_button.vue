<template>
	<view class="button-container">
		<button @click="$emit('click')" hover-class="normal-button-hover" class="normal-button" type="default">
			{{text}}
		</button>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:String,
				value: ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.normal-button {
		color: white !important;
		background-color: rgb(63,122,255) !important;
		-webkit-appearance: none !important;
		padding: 10upx 0;
	}
	.normal-button-hover {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}
</style>
