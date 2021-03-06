<template>
	<view class="news-list">
		<scroll-view class="list-container" scroll-y="true" :style="[heightStyle]">
			<view v-for="(item, index) in dataList" :key="index" class="flex-column cell">
				<view class="ellipsis title">{{item.TITLE}}</view>
				<view class="flex-row subtitle">
					<text>来源: {{item.ORIGIN || ""}}</text>
					<text>发布时间: {{item.RELEASE_DATE || ""}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Api from '../../static/js/api.js';
	import Http from '../../static/js/http.js';

	export default {
		name: "NewsList",
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
			console.log("新闻列表");
			this.loadData();
		},
		methods: {
			loadData(index) {
				if (this.dataList == null || this.dataList.length == 0) {
					Http.getNewsList().then(res => {
						console.log("getNewsList:", res);
						if (res.ReturnValue != null) {
							this.dataList = res.ReturnValue;
						}
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	.news-list {

		.list-container {
			background-color: #fff;

			.cell {
				align-items: flex-start;
				margin: 0 30upx;
				padding: 26upx 0;
				border-bottom: 1upx solid #F1F1F1;
				overflow: hidden;
			}

			.title {
				font-size: 32upx;
				color: #333;
				max-width: 92vw;
			}

			.subtitle {
				width: 92vw;
				justify-content: space-between;
				padding: 8upx 0;
				font-size: 26upx;
				color: #999999;
			}
		}
	}
</style>
