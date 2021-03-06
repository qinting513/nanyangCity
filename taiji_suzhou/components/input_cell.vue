<template>
	<view class="input-cell" :style="cellStyle">
		<view class="flex-row title-box">
			<text class="title-star" v-if="isNeed">*</text>
			<view :style="titleStyle" class="cell-title">{{title}}</view>
		</view>
		<view class="cell-content">
			<picker v-if='type == "select"' :disabled="isDisable" :range='itemList' :value="index" :start='startDate' :end='endDate'
			 mode='selector' @change="bindSelect">
				<view class="contentView">
					<input disabled :data-field="field" :placeholder="placeholder" :value="(selectStr != '') ? selectStr : initValue"></input>
					<image  class="image" :src="isDisable ? '' : '/static/images/input_cell_imgs/icon_arrow_down.png'"></image>
				</view>
			</picker>

			<view v-else-if='type == "linkBtn"' class="buttonView">
				<input :type="inputType" :data-field="field" :placeholder="placeholder" :value="inputStr != '' ? inputStr : initValue"
				 disabled="true" @click="clickBtn"></input>
				<image mode="widthFix"  class="image" src='/static/images/input_cell_imgs/icon_right_arrow.png'></image>
			</view>

			<view v-else-if='type == "readOnly"' class="contentView" :style="contentColor">
				<input :type="inputType" :data-field="field" :placeholder="placeholder" :value="inputStr || initValue" disabled="true"></input>
			</view>

			<view v-else-if='type == "textView"' class="contentView" :style="contentColor">
				<view class="textView">{{inputStr != '' ? inputStr : initValue}}</view>
			</view>

			<view v-else class="contentView">
				<input :type="inputType" :data-field="field" @input="bindInputChange" :placeholder="placeholder" :value="initValue"></input>
				<image mode="widthFix" v-if="isShowRightArrow" class="image" @click="clear" :src="inputStr == '' && initValue == '' ? '/static/images/input_cell_imgs/icon_clear_normal.png' : '/static/images/input_cell_imgs/icon_clear.png'"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "InputCell",
		props: {
			title: { //左侧标题
				type: String,
			},
			height: { //cell高度
				type: String,
				value: '200upx'
			},
			field: { //返回值参数名
				type: String,
			},
			placeholder: { //站位文字
				type: String,
			},
			itemList: { //select数组
				type: Array
			},
			type: { //text：输入框，select：选择器，button:右侧显示按钮，linkBtn：显示右箭头 readOnly只读
				type: String,
				default: 'text'
			},
			pickerMode: { // 选择器类型
				type: String,
				default: 'selector'
			},
			inputType: { // 输入框mode
				type: String,
				default: 'text'
			},
			dataWithBtn: { //点击按钮后获取的数据
				type: String,
				default: ''
			},
			startDate: { //日期选择器开始日期
				type: String,
				default: ''
			},
			endDate: { //日期选择器结束日期
				type: String,
				default: ''
			},
			initValue: { //初始化数据，回填使用
				type: String
			},
			isDisable: { //是否禁止操作
				type: Boolean,
			},
			openType: { //按钮开放能力（type:button才有用）
				type: String,
				default: ''
			},
			titleStyle: {
				type: String,
				default: ''
			},
			contentColor: {
				type: String,
				default: ''
			},
			isNeed: { // title前面的星号是否显示
				type: Boolean,
				default: false,
			},
			isShowRightArrow: {
				type: Boolean,
				default: true,
			},
			cellStyle:{
				type: Object,
				default: function(){
					return {}
				}
			}
		},
		data() {
			return {
				index: 0,
				selectStr: '',
				inputStr: '',
			};
		},
		created() {
			this.inputStr = this.initValue;
			// console.log("itemList", this.itemList, this.pickerMode);
		},
		methods: {
			bindSelect(e) {
				if (this.pickerMode == 'date' || this.pickerMode == 'time') {
					this.selectStr = e.detail.value;
				} else {
					this.index = e.detail.value;
					this.selectStr = this.itemList[e.detail.value];
				}
				let data = {
					field: this.field,
					value: this.selectStr,
					index: this.index
				}
				console.log("bindSelect:", data);
				this.$emit('getItemData', data);
			},

			bindInputChange(e) {
				console.log("bindInputChange", e);
				this.inputStr = e.detail.value;
				let data = {
					field: this.field,
					value: this.inputStr
				}
				this.$emit('getItemData', data)
			},

			clear() {
				this.inputStr = '';
				this.initValue = '';

				var data = {
					field: this.field,
					value: this.inputStr
				}
				this.$emit('getItemData', data)
			},

			clickBtn() {
				this.$emit('clickBtn')
			},
		},
	}
</script>

<style scoped lang="scss">
	.input-cell {
		display: flex;
		margin-left: 30upx;
		margin-right: 30upx;
		border-bottom: 1px solid rgb(232, 232, 232);
		height: 110upx;
		align-items: center;
		font-size: 30upx;
		color: #000000;
		
		.cell-title {
			width: 220upx;
			color: #666;
		}
		
		.title-box {
			align-items: center;
			justify-content: flex-start;
		}
		
		.title-star {
			font-size: 38upx;
			color: #f00;
			margin-top: 10upx;
		}
		
		.cell-content {
			width: 100%;
			/* height: 100%; */
		}
		
		.contentView {
			height: 100upx;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		
		input {
		
			text-align: right;
			width: 100%;
			height: 100upx;
			/* font-size: 15px; */
		}
		
		.image {
			width: 40upx;
			height: 40upx;
			margin-left: 20upx;
		}
	}

	

	.button {
		background: rgb(59, 122, 242);
		width: 180upx !important;
		height: 70upx !important;
		color: white;
		text-align: center !important;
		line-height: 70upx !important;
		border-radius: 10upx !important;
		margin-right: 10upx !important;
		font-size: 30upx !important;
		padding: 0 !important;
	}

	.buttonView {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.buttonView view {
		flex: 1;
		text-align: right;
		margin-right: 20upx;
	}

	.textView {
		height: 100upx;
		width: 100%;
		text-align: right;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
