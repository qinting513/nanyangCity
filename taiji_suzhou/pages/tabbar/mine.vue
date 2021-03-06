<template>
	<view class="mine">
		<view class="topView">
			<image class="topBackImg" src="../../static/images/mine/icon_my_info_bg.png" mode=""></image>
			<image class="setting" src="../../static/images/mine/icon_settings.png" mode=""></image>
			<view v-if="hasLogin" @click="clickUser" class="avatarView">
				<image :src="avatarImg" mode=""></image>
				<view class="user">
					<text style="font-size: 32upx;">{{userInfo.REALNAME}}</text>
					<text style="font-size: 20upx;">账号：{{userInfo.USERNAME}}</text>
				</view>
			</view>
			<view v-else @click="clickUser" class="avatarView">
				<image src="../../static/images/mine/icon_default_avatar.png" mode=""></image>
				<text>请先登录</text>
			</view>

			<view class="mainBtnView">
				<view @click="clickMain(index)" class="item" v-for="(item, index) in mainBtns" :key="index">
					<image :src="item.icon" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>

		<view class="listView">
			<view class="section" v-for="(section, index1) in items" :key="index1">
				<view class="title">
					<image src="../../static/images/mine/my_space_title.png" mode="aspectFit"></image>
					<text>{{ section.title }}</text>
				</view>
					<u-cell-group>
						<view v-for="(item, index2) in section.subs" :key="index2">
							<u-cell-item @click="click(index1, index2)"  :title="item.name" :thumb="item.icon"></u-cell-item>
						</view>
						
					</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
import Api from '../../static/js/api.js';
import Http from '../../static/js/http.js';
import {mapState} from 'vuex'

export default {
	name: 'mine',
	components: {
	},
	computed:{
		...mapState(['userInfo', 'hasLogin']),
		avatarImg(){
			return Api.downloadFileURL + this.userInfo.USER_IMG
		}
	},
	data() {
		return {
			mainBtns: [
				{
					name: '我的办件',
					icon: '../../static/images/mine/icon_mine_wodebanjian.png'
				},
				{
					name: '我的收藏',
					icon: '../../static/images/mine/icon_mine_wodeshoucang.png'
				},
				{
					name: '我的预约',
					icon: '../../static/images/mine/icon_mine_wodeyuyue.png'
				},
				{
					name: '我的足迹',
					icon: '../../static/images/mine/icon_mine_wodezuji.png'
				}
			],
			items: [
				{
					title: '个人信息',
					subs: [
						{
							icon: require('../../static/images/mine/icon_mine_wodedizhi.png'),
							name: '我的地址'
						},
						{
							icon: require('../../static/images/mine/icon_mine_wodekongjian.png'),
							name: '我的空间'
						},
						{
							icon: require('../../static/images/mine/icon_mine_wodexinxi.png'),
							name: '我的信息'
						}
					]
				},
				{
					title: '互动专区',
					subs: [
						{
							icon: require('../../static/images/mine/icon_mine_wodepingjia.png'),
							name: '我的评价'
						},
						{
							icon: require('../../static/images/mine/icon_mine_wodezixun.png'),
							name: '我的咨询'
						},
						{
							icon: require('../../static/images/mine/icon_mine_wodetoushu.png'),
							name: '我的投诉'
						}
					]
				}
			]
		};
	},
	onLoad() {},
	methods: {
		clickUser(){
			if( !this.$store.state.hasLogin) {
					uni.navigateTo({
						url:'../login/login'
					})
			} else {
				uni.showToast({
					title: '准备跳转到用户中心, 功能开发中',
					icon: 'none'
				})
			}
		},
		clickMain(index) {
			var url = '';
			switch (index) {
				case 0:
					url = '../mine/my_business_page/my_business_page';
					break;
				case 1:
					url = '../mine/my_collection_page/my_collection_page?type=1';
					break;
				case 2:
					url = '../mine/my_subscribe_page/my_subscribe_page';
					break;
				case 3:
					url = '../mine/my_collection_page/my_collection_page?type=2';
					break;
				default:
					break;
			}
			uni.navigateTo({
				url: url,
				// url: '',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		click(i1, i2) {
			switch (i1) {
				case 0:
					switch (i2) {
						case 0:
							break;
						default:
							break;
					}
					break;
				default:
					break;
			}
			console.log(i1, i2);
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/tabbar/mine.scss';
</style>
