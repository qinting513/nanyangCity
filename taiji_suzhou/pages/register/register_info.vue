<template>
	<view class="container">
		<view class="main-view">
			<image @click="back" class="backB-btn" src="../../static/images/home/icon_back_arrow.png" mode="aspectFill"></image>
			<view class="login-tips-view">
				<text style="font-weight: 700; font-size: 45upx;">用户信息</text>
				<text style="font-size: 30upx; margin-left: 15upx;">User Registration</text>
			</view>
			<view>
				<inputView @bindInputChange="bindInputChange" type="REALNAME" style="text-align: right;" preText="用户姓名" placeholder="请输入您的用户姓名"></inputView>
				<inputView
					@bindInputChange="bindInputChange"
					type="cardType"
					:isPicker="true"
					:range="array"
					style="text-align: right;"
					:disabled="true"
					preText="证件类型"
					placeholder="请选择您的证件类型"
				></inputView>
				<inputView @bindInputChange="bindInputChange" type="USER_PID" style="text-align: right;" preText="证件号码" placeholder="请输入您的证件号码"></inputView>
				<inputView
					@bindInputChange="bindInputChange"
					type="PASSWORD"
					:password="true"
					style="text-align: right;"
					preText="用户密码"
					placeholder="请输入您的用户密码"
				></inputView>
				<inputView
					@bindInputChange="bindInputChange"
					type="confirmPWD"
					:password="true"
					style="text-align: right;"
					preText="确认密码"
					placeholder="请确认您的用户密码"
				></inputView>
			</view>

			<view style="margin-top: 40upx;"><normalBtn @click="regist" text="注 册"></normalBtn></view>
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
			index: 0,
			array: ['身份证', '护照', '军官证', '士兵证', '警官证', '港澳居民来往内地通行证', '台湾居民来往大陆通行证', '香港身份证', '澳门身份证', '台湾身份证'],
			cardID: ['10', '20', '11', '12', '13', '14', '15', '16', '17', '18'],
			parms:{}
		};
	},
	onLoad(options) {
		this.parms['USERNAME'] = options.mobile
		this.parms['USER_MOBILE'] = options.mobile
		this.parms['USER_SOURCE'] = '0'
		this.parms['CERTIFICATETYPE'] = '10'
	},
	methods: {
		back(e) {
			uni.navigateBack({});
		},
		bindInputChange(e, type, index) {
			if (type == 'cardType') {
				this.parms['CERTIFICATETYPE'] = this.cardID[index]
			}
			this.parms[type] = e
			// console.log(e.length, type, index);
		},
		regist(e) {
			
			
			if (this.parms['REALNAME'] == undefined || this.parms['REALNAME'].length == 0) {
				this.showToast('请输入姓名')
				return
			}
			
			if (this.parms['USER_PID'] == undefined || this.parms['USER_PID'].length == 0) {
				this.showToast('请输入证件号码')
				return
			}
			
			if (this.parms['PASSWORD'] == undefined || this.parms['PASSWORD'].length < 6) {
				this.showToast('请输入不少于6位的用户密码')
				return
			}
			
			if (this.parms['PASSWORD'] != this.parms['confirmPWD']) {
				this.showToast('两次输入的密码不正确')
				return
			}
			
			
			console.log(this.parms);
			http.regist(this.parms).then(res => {
				console.log(res)
				if (http.checkRes(res)) {
					uni.showToast({
						title:'注册成功!',
					})
					setTimeout(_ => {
						uni.navigateBack({
							delta: 3
						});
					}, 1500)
				}
				
			});
			
		},
		showToast(text) {
			uni.showToast({
				title:text,
				icon:'none'
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
