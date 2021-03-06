<template>
	<view @click="$emit('click', index)" class="cell">
		<view class="title">{{title}}</view>
		<view class="input"><input placeholder-style="placeholder-style" disabled type="text" :value="value" :placeholder="placeholder" /></view>
		<image v-if="showArrow" style="width: 15px; height: 15px; flex-shrink: 0;" src="../../static/images/input_cell_imgs/icon_right_arrow.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		props: {
			title:String,
			placeholder:String,
			showArrow:Boolean,
			value:String,
			index:Number,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
 .cell {
	 display: flex;
	 padding: 10px;
	 font-size: 14px;
	 align-items: center;
	 color: rgb(64,64,64);
	 background-color: white;
	 height: 50px;
	 .title {
		 width: 80px;
		 margin-right: 0px;
	 }
	 
	 .input {
		 flex: 1;
	 }
 }
 
 .placeholder-style {
	 // color: rgb(149,149,149);
 }
</style>
