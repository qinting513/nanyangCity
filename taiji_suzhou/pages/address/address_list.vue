<template>
	<view class="address-list">
		<view class="cell-list">
			<view class="cell" v-for="(item,i) in dataList" :key="i">
				<view class="cell-content">
					<view class="cell-top">
						<view class="pd8">
							{{item.name}} <text class="ml-20">{{item.mobile}}</text>
						</view>
						<view class="pd8 c-address">
							地址：{{item.region}}{{item.detail}}
						</view>
					</view>
					<view class="cell-bottom">
						<label class="flex-row radio" @click="changeRadio(item)">
							<image class="radio-img"
								:src="item.isDefault ?  '../../static/images/home/icon_checkbox_on.png' : '../../static/images/home/icon_checkbox.png'"
								mode=""></image>
							<text class="ml-8">{{item.isDefault ? '默认地址' : '设为默认'}}</text>
						</label>
						<view class="c-right">
							<label @click="edit(item)">
								<u-icon name="edit-pen" color="#878787" size="30"></u-icon>
								<text class="ml-8">编辑</text>
							</label>
							<label class="ml-20" @click="trash(i)">
								<u-icon name="trash" color="#878787" size="30"></u-icon>
								<text class="ml-8">删除</text>
							</label>
						</view>
					</view>
				</view>
				<view class="line"></view>
			</view>

		</view>
		<view class="bottom-btn">
			<view class="add-button" @click="addNew">添加新地址</view>
		</view>
	</view>
</template>

<script>
	import Api from '../../static/js/api.js';
	import Util from '../../static/js/util.js';

	export default {
		name: 'address-list',
		components: {},
		data() {
			return {
				dataList: {},
			}
		},
		onShow() {
			this.loadData();
		},
		methods: {
			loadData() {
				this.dataList = JSON.parse(uni.getStorageSync("addressList") || '[]');
				console.log("地址列表", this.dataList);
			},
			edit(item) {
				// console.log(item)
				uni.navigateTo({
					url: './add_address?id=' + item.id,
				})
			},
			trash(i) {

			},
			changeRadio(item) {
				for (let key in this.dataList) {
					this.dataList[key].isDefault = false;
				}
				item.isDefault = !item.isDefault;
				uni.setStorageSync('addressList', JSON.stringify(this.dataList));
				if (item.isDefault) {
					console.log("设置为默认的", item);
					uni.setStorageSync('defaultAddress', JSON.stringify(item));
				}
			},
			addNew() {
				uni.navigateTo({
					url: './add_address?id=' + '-1',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.address-list {
		.pd8 {
			padding: 8upx 0;
		}

		.ml-8 {
			margin-left: 8upx;
		}

		.ml-20 {
			margin-left: 20upx;
		}

		.cell-list {
			padding-bottom: 140upx;

			.cell {
				background-color: #FFFFFF;
				border-top: 1px solid #F1F1F1;
				border-bottom: 1px solid #F1F1F1;
				font-size: 29upx;

				.cell-content {
					padding: 0 30upx;

					.cell-top {
						font-size: 34upx;
						padding: 24upx 0;
						border-bottom: 1px solid #F1F1F1;

						.c-address {
							font-size: 30upx;
							color: #878787;
						}
					}

					.cell-bottom {
						padding: 24upx 0;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						.radio-img {
							width: 40upx;
							height: 40upx;
						}
					}
				}


				.line {
					width: 100%;
					height: 20upx;
					background-color: #f2f5f5;
				}
			}

		}

		.bottom-btn {
			height: 140upx;
			width: 100%;
			position: fixed;
			bottom: 0;
			background-color: #f2f5f5;

			.add-button {
				padding: 30upx 0;
				margin: 14upx 30upx;
				border-radius: 10upx;
				border: 1px solid rgba(77, 112, 217, 1);
				text-align: center;
				color: rgba(77, 112, 217, 1);
			}
		}
	}
</style>
