<template>
	<view class="sliderTab">
		<!-- 自定义tab标签组件-->
		<!-- 标题列表-->
		<scroll-view scroll-x="true" class="scroll-view-x" wx:if="{{!ttype || ttype==2}}">
			<view class="scroll-view-item" wx:for="{{tList}}" wx:key="index">
				<view class="{{currentTab==index ? 'on' : ''}}" bindtap="_swichNav" data-current="{{index}}">{{ !tname ? item.name : item[tname].name }}</view>
			</view>
		</scroll-view>
		<!--内容列表-->
		<slot>
		</slot>
	</view>
</template>

<script>
	export default {
		name: "sliderTab",
		// 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段， type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
		props: {
			tList: {
				type: Array,
				value: []
			}, //标题列表
			currentTab: {
				type: Number,
				value: 0,
				observer: function(newVal, oldVal) {
					this.currentTab = newVal
				}
			},
			tname: {
				type: String,
				value: ''
			},
			ttype: {
				type: Number,
				value: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			_swichNav: function(e) {
				let data ={
					currentNum: e.currentTarget.dataset.current
				};
				this.$emit('changeCurrent', data);
			}
		},
	}
</script>

<style scoped>
	.scroll-view-x {
		background-color: #fff;
		white-space: nowrap;
		position: fixed;
		z-index: 10;
		top: 0
	}

	.scroll-view-x .scroll-view-item {
		display: inline-block;
		margin: 0 35rpx;
		line-height: 45px;
		cursor: pointer;
	}

	.on {
		border-bottom: 2px solid #4280e7;
		color: #4280e7;
	}
</style>
