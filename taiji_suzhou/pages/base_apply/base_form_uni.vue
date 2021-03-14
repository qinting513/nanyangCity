<template>
	<view class="base-form-uni">
		<view class="input-list">
			<!-- <form>
				<input-cell title='联系人:' field='realName' placeholder='请输入联系人' @getItemData="getItemData" :isNeed="true" :initValue="inputData.realName"></input-cell>
				<input-cell title='移动电话:' field='mobile' placeholder='请输入移动电话' @getItemData="getItemData" :isNeed="true" :initValue="inputData.mobile"></input-cell>
				<input-cell title='证件类型:' field='certificateTypesCode' placeholder='请选择证件类型' type="select" :itemList="itemList"
				 @getItemData="getItemData" :isNeed="true" :initValue="itemList[0]"></input-cell>
				<input-cell title='证件号码:' field='code' placeholder='请输入证件号码' @getItemData="getItemData" :isNeed="true" :initValue="inputData.code"></input-cell>
				<input-cell title='电子邮件:' field='userEmail' placeholder='请输入电子邮件' @getItemData="getItemData" :initValue="inputData.userEmail"></input-cell>
				<input-cell title='联系地址:' field='userAddress' placeholder='请输入联系地址' @getItemData="getItemData"></input-cell
				 :initValue="inputData.userAddress">
				<input-cell title='项目名称:' field='itemName' type="readOnly" :initValue="inputData.itemName" :isNeed="true"></input-cell>
			</form> -->

			<u-form :model="inputData" ref="uForm" label-width="180" :error-type="errorType">
				<u-form-item label="联系人" prop="realName" required>
					<u-input type="text" v-model="inputData.realName" placeholder='请输入联系人' />
				</u-form-item>
				<u-form-item label="移动电话" prop="mobile" required>
					<u-input type="number" v-model="inputData.mobile" placeholder='请输入移动电话' />
				</u-form-item>
				<u-form-item label="证件类型" prop="certificateTypesCode" required>
					<u-input type="select" @click="showPicker = true" v-model="inputData.certificateTypesName"
						placeholder='请选择证件类型' />
					<u-picker mode="selector" v-model="showPicker" :default-selector="[0]" :range="itemList"
						range-key="label" @confirm="confirmPicker"></u-picker>

				</u-form-item>
				<u-form-item label="证件号码" prop="code" required>
					<u-input type="idcard" v-model="inputData.code" placeholder='请输入证件号码' />
				</u-form-item>
				<u-form-item label="电子邮件" prop="userEmail">
					<u-input type="text" v-model="inputData.userEmail" placeholder='请输入电子邮件' />
				</u-form-item>
				<u-form-item label="联系地址" prop="userAddress">
					<u-input type="text" v-model="inputData.userAddress" placeholder='请输入联系地址' />
				</u-form-item>
				<u-form-item label="项目名称" prop="itemName" required>
					<u-input type="textarea" :auto-height="true" :disabled="true" v-model="inputData.itemName" placeholder='请输入项目名称' />
				</u-form-item>
			</u-form>
		</view>
		<view class="flex-row bottom-btns">
			<view class="tempstore" @click="tempStore">
				存为草稿
			</view>
			<view class="next" @click="next">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import InputCell from '../../components/input_cell.vue';
	import Http from '../../static/js/nanyang_http.js'
	import Api from '../../static/js/api.js';
	import Util from '../../static/js/util.js';
	import {
		mapState
	} from "vuex";
	export default {
		name: 'mine',
		components: {
			InputCell
		},
		data() {
			return {
				errorType: ['toast'],
				showPicker: false,
				rules: {
					realName: [{
						required: true,
						message: '请输入联系人',
						trigger: ['blur', 'change']
					}],
					mobile: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}]
				},


				itemList: [],
				inputData: {
					realName: '',
					mobile: "",
					certificateTypesCode: "10",
					certificateTypesName: '',
					code: "",
					userEmail: "",
					userAddress: "",
					itemName: ""
				}
			}
		},
		computed: mapState(['applyItemInfo', 'userInfo', 'businessModel', 'formsModel', 'materialsModel', 'postModel']),
		created() {
			this.itemList = Http.cerArr;
		},
		mounted() {
			// 挂载后的数据回填
			this.updateInputData(this.formsModel)
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			confirmPicker(i) { // 选择第几个
				let item = this.itemList[i];
				this.inputData.certificateTypesName = item.label;
				this.inputData.certificateTypesCode = item.value;
				this.$store.commit('updateFormsModel', this.inputData);
			},
			updateInputData(formsModel) { // 表单回填
				this.inputData.realName = formsModel.realName;
				this.inputData.mobile = formsModel.mobile;
				this.inputData.certificateTypesCode = formsModel.certificateTypesCode;
				for (var i = 0; i < this.itemList.length; i++) {
					let item = this.itemList[i];
					if (item.value == this.inputData.certificateTypesCode) {
						this.inputData.certificateTypesName = item.label;
					}
				}
				this.inputData.code = formsModel.code;
				this.inputData.userEmail = formsModel.userEmail;
				this.inputData.userAddress = formsModel.userAddress;
				this.inputData.itemName = formsModel.itemName;
				console.log("表单回填:", this.inputData);
			},
			//   showTip 表示是否要显示提示
			checkBaseInfo(showTip) {

				if (Util.isEmpty(this.inputData.realName)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "请输入联系人"
						})
					}
					return false;
				}
				if (Util.isEmpty(this.inputData.mobile)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "请输入正确的手机号码"
						})
					}
					return false;
				}
				if (!Util.checkMobile(this.inputData.mobile)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "请输入正确的手机号码"
						})
					}
					return false;
				}
				if (Util.isEmpty(this.inputData.code)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "请输入证件号码"
						})
					}
					return false;
				}


				if (!Util.checkIDCard(this.inputData.certificateTypesCode, this.inputData.code)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "请输入正确的证件号码"
						})
					}
					return false;
				}
				if (!Util.isEmpty(this.inputData.userEmail)) {
					if (!Util.isEmail(this.inputData.userEmail)) {
						if (showTip) {
							uni.showToast({
								icon: 'none',
								title: "请输入正确的邮箱地址"
							})
						}
						return false;
					}
				}
				this.formsModel.stateBaseForm = true;
				this.$store.commit('updateFormsModel', this.formsModel);
				return true;
			},
			// getItemData(data) {
			// 	let form = this.formsModel;
			// 	if (data.field == 'certificateTypesCode') {
			// 		this.inputData['certificateTypesCode'] = data.value;
			// 		form.certificateType = data.value;
			// 		let cers = Api.certificateTypes;
			// 		for (let key in cers) {
			// 			if (data.value === cers[key]) {
			// 				form.certificateTypesCode = key;
			// 				break;
			// 			}
			// 		}
			// 	} else {
			// 		this.inputData[data.field] = data.value;
			// 		form[data.field] = data.value;
			// 	}
			// 	// console.log("mine data:", data);
			// 	this.$store.commit('updateFormsModel', form);
			// },
			tempStore: function() {
				// console.log("mine this.inputData:", JSON.stringify(this.inputData));
				
				// 暂存则不检查
				// this.checkBaseInfo(true);
				this.$emit('tempStore', {
					page: 'baseFormPage'
				});
			},
			next: function() {
				this.$emit('next', {
					page: 'baseFormPage'
				});
			},
		}
	}
</script>

<style lang="scss">
	.base-form-uni {
		background-color: #FFFFFF;

		.input-list {
			padding-left: 40upx;
			padding-right: 30upx;
		}
	}

	@import "../../static/css/apply/apply.scss";
</style>
