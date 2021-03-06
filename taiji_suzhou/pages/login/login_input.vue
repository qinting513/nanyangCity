<template>
	<view class="input-container" @click="click">
		<image v-if="img" :src="img" mode="aspectFill"></image>
		<text v-else>{{ preText }}</text>
		<picker v-if="isPicker" mode="selector" :range="range" @change="pickerChange">
			<view>{{ range[index] }}</view>
		</picker>
		<input v-else :disabled="disabled" :password="password" @input="bindInputChange" type="text" :placeholder="placeholder" :value="initValue" />
	</view>
</template>

<script>
export default {
	props: {
		preText: String,
		img: {
			type: String,
			value: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		password: {
			type: Boolean,
			value: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		type: String,
		isPicker: Boolean,
		range: {
			type: Array,
		},
		initValue: String,
	},
	data() {
		return {
			index: 0
		};
	},
	methods: {
		bindInputChange(e) {
			this.$emit('bindInputChange', e.detail.value, this.type);
		},
		click(e) {
			this.$emit('click');
		},
		pickerChange(e) {
			this.index = e.target.value;
			this.$emit('bindInputChange', this.range[this.index], this.type, this.index);
		}
	}
};
</script>

<style scoped lang="scss">
.input-container {
	display: flex;
	border-bottom: 1px solid $uni-separator-color;
	align-items: center;
	padding: 40upx 0 20upx;
	image {
		width: 50upx;
		height: 50upx;
	}
	input {
		margin-left: 30upx;
		flex: 1;
		font-size: 16px;
	}
	picker {
		flex: 1;
		font-size: 16px;
	}
}
</style>
