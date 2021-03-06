<template>
	<view class="item-list">
		<view v-for="(item, index) in dataList" :key="index" class="flex-column cell">
			<view class="flex-row top-section" @click="expendCell(index)">
				<view>
					<view :class="['name', expends[index] ? 'name-on' : '']">{{ item.SXZXNAME }}</view>
					<view class="desc" v-if="item.ISRESERVE">
						<text class="yuyue">可预约</text>
						<text class="shenbao" v-if="item.SFYDSB">可申报</text>
						<text class="ellipsis bumen">{{ item.DEPTNAME || '' }}</text>
					</view>
				</view>
				<view :class="[expends[index] ? 'bottom-arrow' : 'right-arrow']"></view>
			</view>
			<view class="flex-row cell-bottom" v-if="expends[index]">
				<view v-for="(it, i) in btns" :key="i" class="flex-column btn" @click="btnClick(i, item)">
					<image :src="it.img" mode="scaleToFill" class="btn-img"></image>
					<view class="">{{ it.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type:1,
			dataList: [],
			userType: '1', // 1是个人 2是企业 3是部门
			pictureCode: '', // 用于网络请求的ID(部门办事时就是departmentId)
			pictureName: '', // 用于标题栏进行显示的
			expends: [],
			btns: [
				{
					name: '指南',
					img: '../../../static/images/home/icon_banshi_zhinan.png'
				},
				{
					name: '申报',
					img: '../../../static/images/home/icon_banshi_shenbao.png'
				},
				{
					name: '预约',
					img: '../../../static/images/home/icon_banshi_yuyue.png'
				}
			]
		};
	},
	onLoad(options) {
		if (options) {
			this.type = options.type
			uni.setNavigationBarTitle({
				title:options.type == 1 ? '我的收藏' : '我的足迹'
			})
		}
		
		this.loadData();
	},
	methods: {
		expendCell(index) {
			this.$set(this.expends, index, !this.expends[index]);
			console.log('expends:', this.expends);
		},
		btnClick(index, item) {
			console.log('index:', index, item);
			if (index == 0) {
				let itemInfo = encodeURIComponent(JSON.stringify(item));
				uni.navigateTo({
					url: '../../business_guide/business_guide?itemInfo=' + itemInfo
				});
			} else if (index == 1) {
				let url = '../../base_apply/base_apply_page';
				url += `?itemName=${item.SXZXNAME}`;
				url += `&permId=${item.ID}`;
				this.$store.commit('updateApplyItemInfo', item);
				uni.navigateTo({
					url: url
				});
			} else {
				console.log('预约');
			}
		},
		loadData() {
			this.dataList.push({
				ID: '20181120182915000365',
				LARGEITEMID: '040013511620902013922020K',
				SMALLITEMID: '001',
				ZXYTSDH: '0937-2621235',
				SXZXNAME: '地名命名',
				ITEMVERSION: '5',
				ITEMLIMITTIME: '7',
				ITEMLIMITUNIT: 'G',
				REGIONID: '620902',
				DEPTID: '11620902013922020K',
				DEPTNAME: '区民政局',
				LAWADDR: '620902',
				REALADDR: '620902',
				XZXK: '4',
				SFYDSB: '1',
				ISRESERVE: '1',
				CODE1: '',
				CODE2: '',
				CODE3: '',
				CODE4: '',
				RESERVEONE: '4',
				WSSBDZ: '',
				WSZXDZ: '',
				JGCXDZ: '',
				JDCXDZ: '',
				TYPE: null,
				AUTHLEVEL: null,
				PROVEFLAG: null,
				BLMS: null,
				NUMCOUNT: null,
				ORDERNO: '200',
				BLDD: '酒泉市肃州区富康路8号肃州区民政局地名办307室'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.item-list {
	background-color: #fff;

	.cell {
		align-items: flex-start;
		margin: 0 30upx;
		padding: 30upx 0;
		border-bottom: 1upx solid #f1f1f1;
		overflow: hidden;
		background-color: #fff;

		.top-section {
			justify-content: space-between;
			width: 98%;

			.name {
				color: #000000;
				font-size: 32upx;
			}

			.name-on {
				color: #0072ff;
			}

			.desc {
				margin-top: 10upx;
				font-size: 24upx;
				color: #999999;

				.yuyue {
					color: #0085f7;
					background-color: #f0f8ff;
					padding: 6upx 16upx;
					margin: 6upx 12upx 6upx 0;
					border-radius: 30upx;
				}

				.shenbao {
					color: #50bb2c;
					background-color: #f5fff2;
					padding: 6upx 16upx;
					margin: 6upx 12upx 6upx 0;
					border-radius: 30upx;
				}

				.bumen {
					width: 300upx;
				}
			}
		}

		.cell-bottom {
			justify-content: space-between;
			height: 120upx;
			width: 80%;
			padding: 0 40upx;
			margin-top: 30upx;

			.btn {
				justify-content: center;
				color: #333;
				font-size: 25upx;

				.btn-img {
					width: 48upx;
					height: 48upx;
					margin-bottom: 6upx;
				}
			}
		}
	}
}
</style>
