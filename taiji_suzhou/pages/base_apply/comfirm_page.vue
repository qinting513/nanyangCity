<template>
	<view class="comfirm-page">
		<view class="tip">
			{{tipString}}
		</view>
		<view class="flex-row base-view">
			<image :src="stateBase ? '/static/images/banshi/icon_bs_success.png' : '/static/images/banshi/icon_bs_unupload.png'"
			 mode="aspectFit" class="left-img"></image>
			<view class="base">
				基本表单
			</view>
		</view>
		<view class="materials" :style="[materialStyle]">
			<view v-for="(m,i) in materialList" :key="i" class="cell">
				<view class="flex-row top">
					<image :src="uploadMaterialsNum[m.ID] != null && uploadMaterialsNum[m.ID]['uploaded']>0 ? '/static/images/banshi/icon_bs_success.png' : '/static/images/banshi/icon_bs_unupload.png'"
					 mode="aspectFit" class="left-img"></image>
					<view class="title">{{m.CLMC}}</view>
				</view>
			</view>
		</view>

		<view class="flex-row bottom-btns">
			<view class="pre" @click="pre">
				上一步
			</view>
			<view class="tempstore" @click="tempStore">
				存为草稿
			</view>
			<view class="next" @click="apply">
				申报
			</view>
		</view>
	</view>
</template>

<script>
	import Util from '../../static/js/util.js';
	import {
		mapState
	} from "vuex";

	export default {
		name: "ComfirmPage",
		props: {
			pageHeight: {
				type: Number
			}
		},
		data() {
			return {
				tipString: "温馨提示：有绿色打勾标识的材料表示编辑正确，有叹号标识的材料需要返回重新编辑。",
				materialStyle: {},
				stateBase: true,
				materialsNumber: {},
			}
		},
		computed: mapState(['applyItemInfo', 'userInfo',
			'businessModel', 'formsModel', 'materialsModel',
			'postModel', 'materialList','uploadMaterialsNum'
		]),
		mounted() {
			if (this.pageHeight > 0) {
				this.materialStyle = {
					// 572 - 472 = 100
					height: (this.pageHeight - 120) + 'px'
				};
				console.log("materialStyle:", this.materialStyle);
			} else {
				this.materialStyle = {
					height: '600px'
				};
				console.log("other materialStyle:", this.materialStyle);
			}
		},
		methods: {
			pre: function() {
				this.$emit('pre', {
					page: 'ComfirmPage'
				});
			},
			tempStore: function() {
				this.$emit('tempStore', {
					page: 'ComfirmPage'
				});
			},
			apply: function() {
				this.$emit('apply', {
					page: 'ComfirmPage'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/apply/apply.scss";
	.tip {
		padding: 20upx 30upx;
		color: #FF5200;
		background-color: #FDF9EE;
		font-size: 24upx;
	}

	.base-view {
		margin-top: 16upx;
		padding: 20upx 30upx 30upx 30upx;
		background-color: #fff;

	}

	.left-img {
		width: 30upx;
		height: 30upx;
		// margin-top: 6upx;
		margin-right: 10upx;
		flex-shrink: 0;
	}

	.materials {
		margin-top: 16upx;
		background-color: #fff;
		overflow-y: scroll;

		.cell {
			border-bottom: 1upx solid #f0f0f0;
			align-items: flex-start;
			padding: 20upx 30upx 30upx 30upx;

			.top {
				justify-content: flex-start;
				font-size: 30upx;
				color: #333;
			}
		}
	}
</style>
