<template>
	<view class="home">
		<scroll-view class="scroll-view" scroll-y="true">
			<view class="header">
				<image class="bg-img" src="../../static/images/home/home_banner_bg.png" mode="scaleToFill"></image>
			</view>
			<view class="search flex-row">
				<u-search height="40" :disabled="true" @click="gotoSearch"></u-search>
			</view>
			<!-- 常办事项 -->
			<view class="common">
				<view class="flex-row items">
					<view v-for="(item, index) in items" :key="index" class="flex-column cell"
						@click="commonItemsClick(item)">
						<image :src="item.img" mode="scaleToFill" class="cell-img"></image>
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="notice">
				<news-list></news-list>
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	import CommonItems from './common_items.js';
	import Api from '../../static/js/api.js';
	import Http from '../../static/js/http.js';
	import loginHttp from '../../static/js/login_regist.js'
	import Apply from '../../static/js/apply.js';
	import NewsList from '../government_service/news_list.vue';
	export default {
		name: "home",
		components: {
			NewsList,
		},
		data() {
			return {
				items: CommonItems.items,
			}
		},
		onLoad() {
			// this.login();
		},
		methods: {
			// login() {
			// 	loginHttp.login('renjingtaogr', 'Xbb319826').then(res => {
			// 		console.log("login:", res);
			// 		if (res['code'] == 200) {
			// 			uni.showToast({
			// 				title: '登录成功',
			// 			});
			// 			this.$store.commit('updateUserInfo', res.ReturnValue);
			// 		} else {
			// 			uni.showToast({
			// 				title: '登录失败'
			// 			});
			// 		}
			// 	});
			// },
			gotoSearch() {
				uni.navigateTo({
					url: '../hotlist/hotlist?type=search'
				})
			},
			commonItemsClick(item) {
				console.log("click item:", item.title);
				switch (item.title) {
					case '常办事项': {
						break;
					}
					case '个人办事': {
						uni.navigateTo({
							url: '../government_service/business_page?userType=1',
						});
						break;
					}
					case '法人办事': {
						uni.navigateTo({
							url: '../government_service/business_page?userType=2',
						});
						break;
					}
					case '部门办事': {
						uni.navigateTo({
							url: '../government_service/department_page'
						})
						break;
					}
					case '网上预约': {
						uni.navigateTo({
							url: '/pages/appointment/appointment'
						})
						break;
					}
					case '进度查询': {
						uni.navigateTo({
							url: '/pages/mine/schedule_query'
						})
						break;
					}
					case '热门事项': {
						uni.navigateTo({
							url: '../hotlist/hotlist'
						})
						break;
					}
					case '热门服务': {
						uni.navigateTo({
							url: '../hotservice/hotservice',
						});
						break;
					}
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../static/css/tabbar/home.scss";
</style>
