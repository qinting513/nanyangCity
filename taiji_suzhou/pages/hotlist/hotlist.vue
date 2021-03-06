<template>
	<view class="hotlist">
		<view class="list">
			<view class="search flex-row">
				<icon type="search" size="16" />
				<input type="text" placeholder="请输入事项名称" />
			</view>

			<view class="item" v-for="(item, i) in dataList" :key="i">
				<view class="">{{item.title}}</view>
				<view class='right-arrow'></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
						id: 0,
						title: '会计人员信息采集'
					},
					{
						id: 1,
						title: '住房公积金信息查询'
					},
					{
						id: 2,
						title: '身份证办理进度查询'
					},
					{
						id: 3,
						title: '河南旅游查询'
					},
					{
						id: 4,
						title: '新冠定点医疗机构'
					},
					{
						id: 5,
						title: '婚姻预约登记'
					},
					{
						id: 0,
						title: '会计人员信息采集'
					},
					{
						id: 1,
						title: '住房公积金信息查询'
					},
					{
						id: 2,
						title: '身份证办理进度查询'
					},
					{
						id: 3,
						title: '河南旅游查询'
					},
					{
						id: 4,
						title: '新冠定点医疗机构'
					},
					{
						id: 5,
						title: '婚姻预约登记'
					},
					{
						id: 0,
						title: '会计人员信息采集'
					},
					{
						id: 1,
						title: '住房公积金信息查询'
					},
					{
						id: 2,
						title: '身份证办理进度查询'
					},
					{
						id: 3,
						title: '河南旅游查询'
					},
					{
						id: 4,
						title: '新冠定点医疗机构'
					},
					{
						id: 5,
						title: '婚姻预约登记'
					},
					{
						id: 0,
						title: '会计人员信息采集'
					},
					{
						id: 1,
						title: '住房公积金信息查询'
					},
					{
						id: 2,
						title: '身份证办理进度查询'
					},
					{
						id: 3,
						title: '河南旅游查询'
					},
					{
						id: 4,
						title: '新冠定点医疗机构'
					},
					{
						id: 5,
						title: '婚姻预约登记'
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.hotlist {
		background-color: #F2F5F5;
		height: 100vh;

		.list {
			background-color: #FFFFFF;

			.search {
				margin: 20upx 30upx;
				border-radius: 50upx;
				// box-shadow: 0 0 10px #D2D2D2;
				background-color: #F1F1F1;
				border: 1upx solid #F1F1F1;
				padding: 20upx 30upx;
				font-size: 29upx;

				input {
					padding-left: 10upx;
				}
			}

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 0upx;
				margin: 0 30upx;
				border-bottom: 1px solid #F1F1F1;
				color: #222;
			}

			.item:last-child {
				border-bottom: none;
			}
		}
	}
</style>
