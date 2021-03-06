<template>
	<view class="home">
		<scroll-view class="scroll-view" scroll-y="true">
			<view class="header">
				<image class="bg-img" src="../../static/images/home/home_banner_bg.png" mode="scaleToFill"></image>
			</view>
			<view class="search flex-row">
				<icon type="search" size="16" />
				<input type="text" placeholder="请输入事项名称" />
			</view>
			<!-- 常办事项 -->
			<view class="common">
				<view class="flex-row items">
					<view v-for="(item, index) in items" :key="index" class="flex-column cell" @click="commonItemsClick(item)">
						<image :src="item.img" mode="scaleToFill" class="cell-img"></image>
						<view>{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="notice">
				<news-list></news-list>
			</view>
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
			this.login();
		},
		methods: {
			login() {
				loginHttp.login('renjingtaogr', 'Xbb319826').then(res => {
					console.log("login:", res);
					if (res['code'] == 200) {
						uni.showToast({
							title: '登录成功',
						});
						this.$store.commit('updateUserInfo', res.ReturnValue);
					} else {
						uni.showToast({
							title: '登录失败'
						});
					}
				});
			},
			commonItemsClick(item) {
				console.log("click item:", item.title);
				switch (item.title) {
					case '常办事项':
						{

						}
					case '个人办事':
						{
							uni.navigateTo({
								url: '../government_service/business_page?userType=1',
							});
							break;
						}
					case '法人办事':
						{
							uni.navigateTo({
								url: '../government_service/business_page?userType=2',
							});
							break;
						}
					case '常用证照':
						{

							break;
						}
					case '网上预约':
						{
							uni.navigateTo({
								url: '../appointment/appointment'
							})
							break;
						}
					case '进度查询':
						{

							break;
						}
					case '热门事项':
						{
							uni.navigateTo({
								url: '../address/add_address'
							})
							break;
						}
					case '网点导航':
						{
							uni.navigateTo({
								url: '../government_service/network_list',
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
