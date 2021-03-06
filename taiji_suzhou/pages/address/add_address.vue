<template>
	<view class="base-form-uni">
		<view class="input-list">
			<form>
				<input-cell title='收货人' :isShowRightArrow="false" field='realName' placeholder='请输入收货人' @getItemData="getItemData"
				 :isNeed="false" :initValue="inputData.realName"></input-cell>
				<input-cell title='联系电话' :isShowRightArrow="false" field='mobile' placeholder='请输入联系电话' @getItemData="getItemData"
				 :isNeed="false" :initValue="inputData.mobile"></input-cell>
				<input-cell title='所在地区' :isShowRightArrow="false" field='certificateTypesCode' placeholder='请选择所在地区' type="select"
				 :itemList="itemList" @getItemData="getItemData" :isNeed="false" :initValue="itemList[0]"></input-cell>
				<input-cell title='详细地址:' :isShowRightArrow="false" field='code' placeholder='请输入详细地址' @getItemData="getItemData"
				 :isNeed="false" :initValue="inputData.code"></input-cell>
				<view>
					<uni-data-picker placeholder="请选择地址" popup-title="请选择城市" collection="opendb-city-china" field="code as value, name as text"
					 orderby="value asc" :step-searh="true" :self-field="code" parent-field="parent_code" @change="onchange"
					 @nodeclick="onnodeclick">
					</uni-data-picker>
				</view>

	   <view class="uni-list-cell uni-list-cell-pd">
	                <view class="uni-list-cell-db">设置为默认</view>
	                <switch />
	            </view>
			</form>
		</view>
		<view class="flex-row bottom-btns">
			<view class="tempstore" @click="tempStore">
				暂存
			</view>
			<view class="next" @click="next">
				下一步
			</view>
		</view>
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
		name: 'mine',
		components: {
			InputCell
		},
		data() {
			return {
				itemList: [],
				inputData: {
					realName: '',
					mobile: "",
					certificateTypesCode: "",
					code: "",
					userEmail: "",
					userAddress: "",
					itemName: ""
				}
			}
		},
		computed: mapState(['applyItemInfo', 'userInfo', 'businessModel', 'formsModel', 'materialsModel', 'postModel']),
		created() {
			let items = [];
			let cers = Api.certificateTypes;
			for (let key in cers) {
				items.push(cers[key]);
			}
			this.itemList = items;
		},
		mounted() {
			this.updateInputData(this.formsModel)
		},
		methods: {
			onchange(e) {
				const value = e.detail.value
			},
			onnodeclick(node) {},
			updateInputData(formsModel) {
				this.inputData.realName = formsModel.realName;
				this.inputData.mobile = formsModel.mobile;
				this.inputData.certificateTypesCode = formsModel.certificateTypesCode;
				this.inputData.code = formsModel.code;
				this.inputData.userEmail = formsModel.userEmail;
				this.inputData.userAddress = formsModel.userAddress;
				this.inputData.itemName = formsModel.itemName;
				console.log("基本表单页面:", this.inputData);
			},
			//   showTip 表示是否要显示提示
			checkBaseInfo(showTip) {
				if (Util.isEmpty(this.inputData.realName) ||
					Util.isEmpty(this.inputData.mobile) ||
					Util.isEmpty(this.inputData.code) ||
					Util.isEmpty(this.inputData.itemName)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "基本表单带*的选项为必填内容"
						})
					}
					return false;
				}
				// if (!Util.isMobileExact(this.inputData.mobile)) {
				// 	if (showTip) {
				// 		uni.showToast({
				// 			icon:'none',
				// 			title: "请填写正确的移动电话"
				// 		})
				// 	}
				// 	return false;
				// }

				if (!Util.checkIDCard(this.inputData.certificateTypesCode, this.inputData.code)) {
					if (showTip) {
						uni.showToast({
							icon: 'none',
							title: "请填写正确的证件号码"
						})
					}
					return false;
				}
				if (!Util.isEmpty(this.inputData.userEmail)) {
					if (!Util.isEmail(this.inputData.userEmail)) {
						if (showTip) {
							uni.showToast({
								icon: 'none',
								title: "请填写正确的邮箱地址"
							})
						}
						return false;
					}
				}
				this.formsModel.stateBaseForm = true;
				this.$store.commit('updateFormsModel', this.formsModel);
				return true;
			},
			getItemData(data) {
				let form = this.formsModel;
				if (data.field == 'certificateTypesCode') {
					this.inputData['certificateTypesCode'] = data.value;
					form.certificateType = data.value;
					let cers = Api.certificateTypes;
					for (let key in cers) {
						if (data.value === cers[key]) {
							form.certificateTypesCode = key;
							break;
						}
					}
				} else {
					this.inputData[data.field] = data.value;
					form[data.field] = data.value;
				}
				console.log("mine data:", data);
				this.$store.commit('updateFormsModel', form);
			},
			tempStore: function() {
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
	}

	@import "../../static/css/apply/apply.scss";
</style>
