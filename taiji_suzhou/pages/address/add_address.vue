<template>
	<view class="add-address">
		<view class="add-container">
			<u-form :model="form" label-width="200" ref="uForm" :error-type="errorType">
				<view class="add-cell">
					<u-form-item label="姓名" prop="name">
						<u-input v-model="form.name" maxlength="20" />
					</u-form-item>
					<u-form-item label="手机号码" prop="mobile">
						<u-input v-model="form.mobile" />
					</u-form-item>

					<u-form-item label="所在地区" prop="region">
						<u-input v-model="form.region" placeholder="请选择所在地区" :disabled="true"
							@click="isShowRegion = true" />
						<view class="right-arrow">

						</view>
					</u-form-item>
				</view>
				<u-picker mode="region" v-model="isShowRegion" @confirm="confirmPicker"></u-picker>

				<view class="default-cell">
					<u-input v-model="form.detail" :type="type" :auto-height="autoHeight" placeholder="请输入详细地址" />
				</view>

				<view class="seperator-cell"></view>
				<view class="default-cell">
					<view class="">设置为默认</view>
					<u-switch v-model="form.isDefault"></u-switch>
				</view>
			</u-form>
		</view>
		<view class="seperator-cell"></view>
		<view class="save-button" @click="save">保 存</view>
	</view>
</template>

<script>
	import InputCell from '../../components/input_cell.vue';
	import Api from '../../static/js/api.js';
	import Util from '../../static/js/util.js';
	import {
		mapState
	} from "vuex";
	export default {
		name: 'add-address',
		components: {
			InputCell
		},
		data() {
			return {
				editId: -1,
				type: 'textarea',
				height: 150,
				autoHeight: true,
				isShowRegion: false,
				errorType: ['toast'],
				form: {
					name: '覃挺',
					mobile: "13058058350",
					region: '',
					detail: "详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址详细地址",
					isDefault: true,
				},
				addressList: {}, // 是一个对象
				rules: {
					name: [{
						required: true,
						message: '请填写收货人姓名',
						// 可以单个或者同时写两个触发验证方式 
						// trigger: ['change', 'blur'],
					}],
					mobile: [{
							required: true,
							message: '请填写手机号',
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
						}
					]

				}
			}
		},
		onLoad(options) {
			this.editId = options.id;
			this.addressList = JSON.parse(uni.getStorageSync("addressList") || '{}');
			let form = addressList[this.editId];
			if (form != null) {
				this.form = form;
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getUUID() { // 生成唯一的ID
				const now = new Date()
				const year = now.getFullYear();
				let month = now.getMonth() + 1;
				let day = now.getDate();
				let hour = now.getHours();
				let minutes = now.getMinutes();
				let seconds = now.getSeconds();
				String(month).length < 2 ? (month = Number("0" + month)) : month;
				String(day).length < 2 ? (day = Number("0" + day)) : day;
				String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
				String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
				String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
				const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
				return yyyyMMddHHmmss + '_' + Math.random().toString(36).substr(2, 9);
			},
			save() {
				console.log("form:", this.form);
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.saveAction();
					} else {
						console.log('验证失败');
					}
				});
			},
			saveAction() {
				uni.showLoading({
					title: '正在保存中'
				})
				// debugger
				if (!this.form.id) { // 首次加的 要加id
					this.form.id = this.getUUID();
				}

				if (this.form.isDefault) { // 先清除默认地址
					for (let key in this.addressList) {
						this.addressList[key].isDefault = false;
					}
					uni.setStorageSync('defaultAddress', JSON.stringify(this.form));
				}
				this.addressList[this.form.id] = this.form;
				uni.setStorageSync('addressList', JSON.stringify(this.addressList));
				uni.hideLoading();
				uni.showToast({
					title: '保存成功!'
				})
				setTimeout(() => {
					uni.navigateBack();
				}, 1000)
			},
			getItemData(data) {
				this.form[data.field] = data.value;
				console.log("form:", this.form);
			},
			confirmPicker(e) {
				this.form.region = `${e.province.label} ${e.city.label} ${e.area.label}`
				console.log("form:", this.form);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-address {
		background-color: #f2f5f5;
		height: 100vh;

		.add-container {
			background-color: #FFFFFF;

			.seperator-cell {
				width: 100vw;
				background-color: #f2f5f5;
				height: 20upx;

			}

			.add-cell {
				padding: 0 30upx;
				font-size: 30upx;
			}

			.default-cell {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 30upx;
				font-size: 30upx;
			}
		}

		.save-button {
			background: linear-gradient(90deg, rgba(103, 134, 228, 1), rgba(77, 112, 217, 1));
			padding: 34upx 0upx;
			margin: 50upx 30upx 30upx;
			text-align: center;
			color: #FFFFFF;
			font-size: 36upx;
			border-radius: 10upx;
		}

	}
</style>
