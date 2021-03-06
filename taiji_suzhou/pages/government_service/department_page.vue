<template>
	<view class="department">
		<scroll-view class="list-container" scroll-y="true" :style="[heightStyle]">
			<view v-for="(item, index) in dataList" :key="index" class="flex-row cell"
			@click="gotoDetail(item)">
				<view>
					{{item.SHORTNAME || ''}}({{item.PERMNUM || '0'}})
				</view>
				<view class="right-arrow"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Api from '../../static/js/api.js';
	import Http from '../../static/js/http.js';

	export default {
		name: "departmentPage",
		props: {
			heightStyle: {
				type: Object,
				value: {
					height: '600px'
				}
			},
		},
		data() {
			return {
				dataList: [],
			}
		},
		created() {
			this.loadData();
		},
		methods: {
			gotoDetail(item) {
				// 如果是组件则需要在其所在的页面调用uni.navigateTo才有用
				this.$emit('gotoDetail', {item: item, userType: '3'});
			},
			loadData(index) {
				if (this.dataList == null || this.dataList.length == 0) {
					Http.getDepartmentItems().then(res => {
				       console.log("getDepartmentItems:", res);
						this.dataList = res.ReturnValue;
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	.department {
		font-size: 29upx;
		font-family: 'PingFangSC-Regular';
		color: #666666;

		.list-container {
			background-color: #fff;

			.cell {
				padding: 30upx 30upx 30upx 0upx;
				margin-left: 30upx;
				border-bottom: 1upx solid #f1f1f1;
				justify-content: space-between;
			}
		}
	}
</style>
