<template>
	<view class="department">
		<scroll-view class="list-container" scroll-y="true" :style="[heightStyle]">
			<view v-for="(item, index) in dataList" :key="index" class="flex-row cell"
			@click="gotoDetail(item)">
				<view>
					{{item.SHORTNAME || ''}}({{item.CNUM || '0'}})
				</view>
				<view class="right-arrow"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Http from '../../static/js/nanyang_http.js';
	export default {
		name: "departmentPage",
		props: {
			heightStyle: {
				type: Object,
				value: {
					height: '600px'
				}
			},
			//  是组件还是页面
			isComponent: {
				type: Boolean,
				value: false
			}
		},
		data() {
			return {
				dataList: [],
			}
		},
		created(options) {
			this.loadData();
		},
		methods: {
			gotoDetail(item) {
				if (this.isComponent) {
					// 如果是组件则需要在其所在的页面调用uni.navigateTo才有用
					this.$emit('gotoDetail', {item: item, userType: '3'});
				} else {
					let url = `/pages/government_service/item_list?userType=3`;
						url += `&pictureCode=${item.DEPTID}&pictureName=${item.SHORTNAME}`;
					console.log("item url:", url);
					uni.navigateTo({
						url: url
					})
				}
			},
			loadData() {
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
