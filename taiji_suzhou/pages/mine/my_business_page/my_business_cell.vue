<template>
	<view class="my_business_cell">
		<view class="date">{{item.CREATETIME || ""}}</view>
		<view class="content" @click="$emit('click', item)">
			<view class="item" v-for="(v,k,index) in itemInfo" :key="index">
				<view class="item-title">{{k}}:</view>
				<view class="item-detail">{{v}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'my_business_cell',
		props: {
			item: {}
		},
		data() {
			return {

			}
		},
		computed: {
			itemInfo() {
				return {
					'业务流水号': this.item.BSNUM,
					'办事事项': this.item.PNAME,
					'办理部门': this.item.DEPTNAME,
					'申请人': this.item.APPLICANT,
					'状态': this.item.CSTATUS
				}
			}
		}
	}
</script>

<style lang="scss">
	.my_business_cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		// height: 200px;
		margin: 50upx 30upx;

		.date {
			text-align: center;
			font-size: 28upx;
			color: rgb(181, 181, 181);
			margin-bottom: 16upx;
		}

		.content {
			background-color: #FFFFFF;
			border-radius: 10upx;
			font-size: 30upx;
			box-shadow: 1px 1px 5px #DDD;
			padding: 20upx;
			width: 100%;
			height: 100%;

			.item {
				display: flex;
				align-items: flex-start;
				margin-top: 10upx;
				padding: 10upx 0;
				color: #000000;

				.item-title {
					flex-shrink: 0;
					width: 160upx;
					text-align: right;
					margin-right: 20upx;
					color: #666;
				}
			}
		}
	}
</style>
