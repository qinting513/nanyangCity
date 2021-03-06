<template>
	<view class="add-address">
		<view class="add-container">
			<u-form :model="form" ref="uForm" :error-type="errorType">
				<view class="add-cell">
					<u-form-item label="姓名" prop="name">
						<u-input v-model="form.name" maxlength="20" />
					</u-form-item>
				</view>
				<view class="add-cell">
					<u-form-item label="手机号码" prop="mobile">
						<u-input v-model="form.mobile" />
					</u-form-item>
				</view>
				<view class="add-cell">
					<u-form-item label="所在地区" prop="region">
						<u-input v-model="form.region" placeholder="请选择所在地区" :disabled="true" @click="isShowRegion = true" />
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
				editIndex: -1,
				type: 'textarea',
				height: 150,
				autoHeight: true,
				isShowRegion: false,
				errorType: ['toast'],
				form: {
					name: 'qinting',
					mobile: "13058053850",
					region: '',
					detail: "999",
					isDefault: true,
				},
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
			let index = parseInt(options.id);
			this.editIndex = index;
			console.log("index:", index);
			if (index > 0) {
				let addressList = JSON.parse(uni.getStorageSync("addressList") || '[]');
				this.form = addressList[index];
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
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
				let addressList = JSON.parse(uni.getStorageSync("addressList") || '[]');
				if (this.form.isDefault) { // 先清除默认地址
					addressList.forEach(item => {
						item.isDefault = false;
					})
				}
				if (this.editIndex > 0) {
					addressList[this.editIndex] = this.form;
				} else {
					addressList.push(this.form);
				}

				uni.setStorageSync('addressList', JSON.stringify(addressList));
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

<style lang="scss">
	.add-address {

		background-color: #f2f5f5;
		height: 100vh;

		.u-form-item--left {
			width: 100px !important;
		}

		.u-form-item--left__content__label {
			width: 100px !important;
		}

		.u-form-item--right {
			margin-left: 40upx !important;
		}

		.add-container {
			background-color: #FFFFFF;

			.seperator-cell {
				width: 100%;
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
