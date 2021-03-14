<template>
	<view v-if="dataList.length == 0" class="no-data-view">
		<noDataView></noDataView>
	</view>
	<view v-else class="container">
		<view v-if="item.STATUS != 7" v-for="(item, index) in dataList" :key="index" class="item-container">
			<view class="date">{{ item.CREATETIME }}</view>
			<view class="item">
				<view class="item-row" v-for="(title, index2) in titleArr" :key="index2">
					<view class="item-title">{{ title }}</view>
					：
					<view class="item-detail">{{ getDetail(item, index2) }}</view>
				</view>
				<button :class="item.STATUS == 7 ? 'gray' : ''" style="margin: 40upx 0 20upx 0;" :disabled="item.STATUS == 7" @click="cancelSubscribe(item)" type="default">{{item.STATUS == 7 ? '已取消预约' : '取消预约'}}</button>
			</view>
		</view>
	</view>
</template>

<script>
import http from '../../../static/js/mine.js';
import { mapState } from 'vuex';
import noDataView from '../others/no_data.vue'
export default {
	components:{
		noDataView
	},
	data() {
		return {
			titleArr: ['预约日期', '预约时间', '业务编号', '预约事项', '预约部门', '预约人'],
			dataList: []
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		requestData() {
			http.getMySubscribe(this.userInfo.userToken, this.userInfo.USER_ID).then(res => {
				console.log(res.ReturnValue);
				this.dataList = res.ReturnValue ? res.ReturnValue : [];
			});
		},
		getDetail(item, index) {
			switch (index) {
				case 0:
					return item.RESERVEDATE;
					break;
				case 1:
					return item.RESERVETIME;
					break;
				case 2:
					return item.BSNUM;
					break;
				case 3:
					return item.PNAME;
					break;
				case 4:
					return item.DEPTNAME;
					break;
				case 5:
					return item.APPLICANT;
					break;
				default:
					break;
			}
			return '';
		},
		cancelSubscribe(item) {
			var that = this
			uni.showModal({
				title:'提示',
				content:'确定要取消该预约吗？',
				success(res) {
					if (res.confirm) {
						http.cancelMyAppointment(item.BSNUM, that.userInfo.userToken).then(res => {
							if (res.code == 200) {
								uni.showToast({
									title:"取消预约成功",
									icon:"success",
									complete() {
										setTimeout(()=>{
											that.requestData()
										}, 1000)
									}
								})
							} else {
								uni.showToast({
									title:res.error,
									icon:"none"
								})
							}
						})
					}
				}
			})
			console.log(item)
		}
	},
	onLoad() {
		this.requestData();
	}
};
</script>

<style lang="scss" scoped>
	button {
		color: white !important;
		background-color: rgb(63,122,255) !important;
		-webkit-appearance: none !important;
	}
.container {
	height: calc(100vh - var(--status-bar-height) - 44px);
	padding: 1upx 0;
	.item-container {
		margin-top: 35upx;
		margin-bottom: 20upx;
		.date {
			text-align: center;
			font-size: 20upx;
			color: rgb(181, 181, 181);
			margin-bottom: 30upx;
		}
		.item {
			margin: 40upx;
			font-size: 28upx;
			box-shadow: 1px 1px 5px #ddd;
			padding: 20upx;
			.item-row {
				display: flex;
				align-items: center;
				margin: 20upx 0;
			}
			.item-title {
				width: 130upx;
				text-align-last: justify;
				flex-shrink: 0;
			}
			.item-detail {
				margin-left: 10upx;
				color: rgb(140, 140, 140);
				flex: 1;
				word-break: break-all;
			}
		}
	}
}

.gray {
	background-color: gray !important;
}

</style>
