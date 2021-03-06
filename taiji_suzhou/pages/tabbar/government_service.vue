<template>
	<view class="government-service">
		<view class="slider-tab">
			<scroll-view scroll-x="true" class="scroll-view-x">
				<view class="scroll-view-item" v-for="(item, index) in navs" :key="index">
					<view :class="[currentNav == index ? 'on' : '']" @click="switchNav(index)">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="seperator"></view>
		<swiper :style="[heightStyle]" @change="changeSwiper" :autoplay="autoplay" :current="currentNav">
			<swiper-item>
				<business-page userType="1" :isComponent="true" @gotoDetail="gotoDetail"></business-page>
			</swiper-item>
			<swiper-item>
				<business-page userType="2" :isComponent="true" @gotoDetail="gotoDetail"></business-page>
			</swiper-item>
			<swiper-item>
				<department-page :heightStyle="heightStyle" @gotoDetail="gotoDetail"></department-page>
			</swiper-item>
			<swiper-item>
				<news-list :heightStyle="heightStyle"></news-list>
			</swiper-item>
			<swiper-item>
				<network-list :heightStyle="heightStyle" @gotoNetworkDetail="gotoNetworkDetail"></network-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Api from '../../static/js/api.js';
	import Http from '../../static/js/http.js';
	import BusinessPage from '../government_service/business_page.vue';
	import DepartmentPage from '../government_service/department_page.vue';
	import NetworkList from '../government_service/network_list.vue';
	import NewsList from '../government_service/news_list.vue';
	export default {
		name: "government",
		components: {
			BusinessPage,
			DepartmentPage,
			NetworkList,
			NewsList,
		},
		data() {
			return {
				autoplay: false,
				currentNav: 0,
				heightStyle: {
					// height: '600px'
				},
				navs: [{
						id: 0,
						name: "个人办事",
					},
					{
						id: 1,
						name: "法人办事",
					},
					{
						id: 2,
						name: "部门办事",
					},
					{
						id: 3,
						name: "新闻资讯",
					},
					{
						id: 4,
						name: "网点导航",
					},
				],
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: "政务服务"
			});
			// 获取屏幕高度 用来设置swiper的高度
			let that = this;
			uni.getSystemInfo({
				success(res) {
					that.heightStyle = {
						height: (res.windowHeight + 30) + 'px'
					};
				},
			});
		},
		methods: {
			switchNav(index) {
				if (index == this.currentNav) {
					return;
				}
				this.currentNav = index;
				console.log("nav:", this.currentNav);
			},
			changeSwiper(e) {
				this.currentNav = e.detail.current;
			},
			gotoNetworkDetail(item) {
				item = encodeURIComponent(JSON.stringify(item));
				console.log("network_detail:", item);
				uni.navigateTo({
					url: '../government_service/network_detail?item=' + item
				})
			},
			gotoDetail(data) {
				let url = `/pages/government_service/item_list?userType=${data.userType}`;
				if (data.userType === '3') {
					// 部门userType为3
					url += `&pictureCode=${data.item.DEPTID}&pictureName=${data.item.SHORTNAME}`;
				} else { // 个人、法人办事
					url += `&pictureCode=${data.item.PICTURECODE}&pictureName=${data.item.PICTURENAME}`;

				}
				console.log("item url:", url);
				uni.navigateTo({
					url: url
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	@import "../../static/css/tabbar/government_service.scss";
</style>
