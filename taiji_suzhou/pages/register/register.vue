<template>
	<view class="container">
		<view class="main-view">
			<image @click="back" class="backB-btn" src="../../static/images/home/icon_back_arrow.png" mode="aspectFill"></image>
			<view class="login-tips-view">
				<text style="font-weight: 700; font-size: 45upx;">用户注册</text>
				<text style="font-size: 30upx; margin-left: 15upx;">User Registration</text>
			</view>
			<view style="font-size: 40upx; margin-bottom: 20upx;">
				手机号码
			</view>
			<inputView @bindInputChange="getPhoneInput" preText='+86' placeholder="请输您的手机号码"></inputView>
			<view style="margin-top: 40upx;"><normalBtn @click="regist" text="发送验证码"></normalBtn></view>
		</view>
	</view>
</template>

<script>
import http from '../../static/js/login_regist.js';
import inputView from '../login/login_input.vue';
import normalBtn from '../login/normal_button.vue';
import { mapState } from 'vuex';
export default {
	components: {
		inputView,
		normalBtn
	},
	data() {
		return {
			phone: '',
		};
	},
	methods: {
		back(e) {
			uni.navigateBack({});
		},
		getPhoneInput(e) {
			this.user = e;
		},
		regist(e) {
			http.sendCaptcha(this.user, '0').then(res => {
				console.log(res)
				if (res.code == 200) {
					uni.navigateTo({
						url:'./register_step2?code=' + res.ReturnValue.CODE + '&mobile=' + this.user
					})
				} else {
					uni.showToast({
						title:res.error,
						icon:'none'
					})
				}
				
			})
			
		},
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100vw;
	height: 100vh;
	position: relative;

	.backB-btn {
		position: absolute;
		top: 80upx;
		left: 40upx;
		width: 40upx;
		height: 40upx;
	}

	.main-view {
		position: relative;
		padding: 220upx 40upx 40upx;
		.login-tips-view {
			color: rgb(54, 133, 212);
			margin-bottom: 50upx;
		}

	}
}
</style>
