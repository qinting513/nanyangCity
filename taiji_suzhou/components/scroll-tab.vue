<template>
	<scroll-view :scroll-left="scrollLeft" scroll-x="true" class="tabs" ref="tabs">

		<view @click="change(index)" :ref="'tab' + index" v-for="(item,index) in list" :key="index" :class="['tab-normal',index==current?'tab-selected':'']">
			{{item.name}}
			<view :class="{'tab-indicator':index==current}"></view>
		</view>

	</scroll-view>
</template>

<script>
	export default {
		name: "ScrollTab",
		props: {
			list: {
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: 0
			}
		},
		mounted() {
			this.currentIndex = this.current;
			uni.createSelectorQuery().in(this).select(".tabs").fields({
				dataset: true,
				size: true,
			}, (res) => {
				this.tabsWidth = res.width;
			}).exec();

			uni.createSelectorQuery().in(this).selectAll(".tab-normal").fields({
				size: true
			}, (res) => {
				res.forEach((item,index)=>{
					this.childWidth += item.width;
				})
			}).exec()

		},
		watch: {
			current(newCurrent, oldIndex) {
				this.$nextTick(function() {
					// var child = uni.createSelectorQuery().select(".tab-selected");
					//根据tab数量分成几份
					var a = parseInt(this.childWidth / this.tabsWidth) + 1;
					//一份的移动距离.份数加一控制选中的tab左右两边都显示
					var moveDis = this.childWidth / (a+1);
					//选中tab的right
					var right = this.childWidth / this.list.length * newCurrent + 1;
					var p = parseInt(right / moveDis);

					this.scrollLeft = moveDis * p;
				})
			}
		},
		data() {
			return {
				tabsWidth: 0,
				childWidth: 0,
				scrollLeft: 0
			};
		},
		methods: {
			change(index) {
				this.$emit("change", index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		background-color: #fff;
		width: 100%;
		white-space: nowrap;

		.tab-normal {
			display: inline-block;
			font-size: 30upx;
			box-sizing: border-box;
			position: relative;
			width: 20%;
			color: #666666;
			padding: 15upx 15upx 0;
			white-space: nowrap;
			text-align: center;
		}

		.tab-selected {
			color: #00aaff;
			font-weight: bold;
		}

		.tab-indicator {
			margin: 10upx auto 5upx;
			background-color: #00aaff;
			width: 70upx;
			height: 5upx;
		}
	}
</style>
