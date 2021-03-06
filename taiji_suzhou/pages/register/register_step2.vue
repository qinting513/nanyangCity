<template>
	<view class="container">
		<view class="main-view">
			<image @click="back" class="backB-btn" src="../../static/images/home/icon_back_arrow.png" mode="aspectFill"></image>
			<view class="login-tips-view">
				<text style="font-weight: 700; font-size: 45upx;">短信验证</text>
				<text style="font-size: 30upx; margin-left: 15upx;">SMS verification</text>
			</view>
			<view style="font-size: 40upx; margin-bottom: 20upx;">
				输入验证码
			</view>
			<view style="font-size: 20upx; margin-bottom: 40upx; color: #9c9c9c;">
				验证码已发送至 {{phone}}
			</view>
			<view class="input-view">
				<view class="hide-input"><input @input="inputCode" :focus="focus" @blur="focus=false" type="number" maxlength="6" /></view>
				<view class="code-container" @click="inputEnable">
					<view class="code-item" v-for="(item,index) in codeArr" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view v-if="countDown > 0" style="font-size: 22upx; color: rgb(54, 133, 212); margin-top: 30upx;">
				<text>{{countDown}}s</text>
				<text style="color: rgb(0,0,0);">后重新获取验证码？</text>
			</view>
			<view v-else style="font-size: 22upx; color: rgb(54, 133, 212); margin-top: 30upx;" @click="getCode">获取验证码</view>
			
			<view style="margin-top: 40upx;"><normalBtn @click='gotoInputInfo' text='填写身份信息'></normalBtn></view>
			
		
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
			codeArr:['','','','','',''],
			code:'',
			focus:true,
			countDown:60,
			saveCode:'',
			type:''
		};
	},
	methods: {
		back(e) {
			uni.navigateBack({});
		},
		inputEnable(){
			this.focus = true
		},
		inputCode(e) {
			this.code = e.detail.value
			let codeStrArr = this.code.split('')
			this.codeArr = ['','','','','','']
			for (let i = 0; i < codeStrArr.length; i ++) {
				this.codeArr[i] = codeStrArr[i]
			}
		},
		getCode(e) {
			http.sendCaptcha(this.phone, '0').then(res => {
				console.log(res)
				if (res.code == 200) {
					uni.showToast({
						title:'验证码已发送',
						icon:'success'
					})
					this.countDown = 60
					this.doCountdown()
				}
			})
			
		},
		doCountdown(){
			var that = this
			var interval = setInterval(function(){
				that.countDown --;
				if (that.countDown == 0) {
					clearInterval(interval)
				}
			}, 1000)
		},
		gotoInputInfo(){
			console.log('gotoInputInfo')
			if (this.code == this.saveCode) {
				if (this.type == 1) {
					uni.navigateTo({
						url:'../login/forget_password/forget_password_final?mobile=' + this.phone
					})
				} else {
					uni.navigateTo({
						url:'./register_info?mobile=' + this.phone
					})
				}
				
			} else {
				uni.showToast({
					title:'验证码输入错误',
					icon:'none'
				})
			}
			
		}
	},
	onLoad(options) {
		this.type = options.type
		this.saveCode = options.code
		this.phone = options.mobile
		this.doCountdown()
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
		
		.hide-input {
			position: absolute;
			width: 10;
			height: 10;
			color: rgba(0,0,0,0);
		}
		
		.code-container {
			// position: relative;
			// background-color: white;
			display: flex;
			justify-content: space-between;
			.code-item {
				$width : 12vw;
				width: $width;
				height: $width;
				line-height: $width;
				text-align: center;
				background-color: rgb(243,243,243);
			}
		}
		

	}
}
</style>
