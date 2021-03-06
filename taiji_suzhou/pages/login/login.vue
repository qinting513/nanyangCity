<template>
	<view class="container">
		<image class="bg-image" src="../../static/images/login_register/icon_login_bg.png" mode="aspectFill"></image>
		<view class="main-view">
			<image @click="back" class="backB-btn" src="../../static/images/home/icon_back_arrow.png" mode="aspectFill"></image>
			<view class="login-tips-view">
				<text style="font-weight: 700; font-size: 45upx;">用户登录</text>
				<text style="font-size: 30upx; margin-left: 15upx;">Login</text>
			</view>
			<inputView @bindInputChange="getUserInput" img="../../static/images/login_register/icon_login_phone.png" placeholder="请输入账号" :initValue="user"></inputView>
			<inputView :password="true" @bindInputChange="getPwdInput" img="../../static/images/login_register/icon_login_pwd.png" placeholder="请输入密码" :initValue="pwd"></inputView>
			<view style="margin-top: 40upx;"><normalBtn @click="login" text="登 录"></normalBtn></view>

			<view class="other-view">
				<view @click="gotoRegist">注册账号</view>
				<view @click="gotoForgetPwd">忘记密码？</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../static/js/login_regist.js';
import inputView from './login_input.vue';
import normalBtn from './normal_button.vue';
import { mapState } from 'vuex';
export default {
	components: {
		inputView,
		normalBtn
	},
	data() {
		return {
			user: 'renjingtaogr',
			pwd: 'Xbb319826'
		};
	},
	computed: mapState(['userInfo']),
	methods: {
		back(e) {
			uni.navigateBack({});
		},
		getUserInput(e) {
			this.user = e;
		},
		getPwdInput(e) {
			this.pwd = e;
		},
		login(e) {
			http.login(this.user, this.pwd).then(res => {
				console.log('login:', res);
				if (http.checkRes(res)) {
					uni.showToast({
						title: '登录成功',
						complete() {
							setTimeout(() => {
								uni.navigateBack({});
							}, 1500);
						}
					});
					this.$store.commit('updateUserInfo', res.ReturnValue);
				} 
			});
		},
		gotoRegist(e) {
			uni.navigateTo({
				url:'../register/register'
			})
		},
		gotoForgetPwd(e) {
			uni.navigateTo({
				url:'./forget_password/forget_password'
			})
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100vw;
	height: 100vh;
	position: relative;
	.bg-image {
		top: 0;
		position: absolute;
		width: 100%;
		height: 100%;
	}

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

		.other-view {
			color: rgb(63, 124, 255);
			font-size: 15px;
			font-weight: 550;
			margin-top: 20upx;
			height: 50upx;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
