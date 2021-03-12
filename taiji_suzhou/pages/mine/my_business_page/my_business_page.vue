<template>
	<view class="business-page">
		<view class="topNav">
			<view @click="clickNav(item, index)" class="navItem" :class="navIndex == index ? 'check' : ''"
				v-for="(item, index) in topNav" :key="index">{{ item.name }}</view>
		</view>
		<view class="">
			<swiper :current="current" @change="swiperChange" class="swiper">
				<swiper-item>
					<view v-if="zancunjian.length == 0" class="no-data-view">
						<noDataView></noDataView>
					</view>
					<scroll-view v-else class="list" scroll-y="true">
						<view v-for="(item, index) in zancunjian" :key="index" class="item">
							<myBusinessCell @click="clickItem" :item="item"></myBusinessCell>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<view v-if="zaibanjian.length == 0" class="no-data-view">
						<noDataView></noDataView>
					</view>
					<scroll-view v-else class="list" scroll-y="true">
						<view v-for="(item, index) in zaibanjian" :key="index" class="item">
							<myBusinessCell :item="item"></myBusinessCell>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<view v-if="banjiejian.length == 0" class="no-data-view">
						<noDataView></noDataView>
					</view>
					<scroll-view v-else class="list" scroll-y="true">
						<view v-for="(item, index) in banjiejian" :key="index" class="item">
							<myBusinessCell :item="item"></myBusinessCell>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import myBusinessCell from './my_business_cell.vue';
	import Http from '../../../static/js/nanyang_http.js';
	import Util from '../../../static/js/util.js';
	import {
		mapState
	} from 'vuex';
	import noDataView from '../others/no_data.vue';
	export default {
		components: {
			myBusinessCell,
			noDataView
		},
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}

			if (this.isFromMine) { // 如果是从申报进入到我的办件页面，再返回的时候 不仅仅是返回到申报页面
				uni.navigateBack({
					delta: 2
				});
			} else {
				uni.navigateBack({})
			}
			return true;
		},
		data() {
			return {
				navIndex: 0,
				current: 0,
				topNav: [{
						name: '暂存件',
					},
					{
						name: '在办件',
					},
					{
						name: '办结件',
					}
				],
				zancunjian: [],
				zaibanjian: [],
				banjiejian: [],
				isFromMine: false,
			};
		},
		computed: mapState(['userInfo']),
		methods: {
			back() {

			},
			getZancunjian() {
				// console.log(this.userInfo)
				debugger
				this.getMyBusiness(0).then(
					res => {
						this.zancunjian = this.dealData(res);
						console.log(res);
					},
					err => {
						console.log(err);
					}
				);
			},
			getZaibanjian() {
				this.getMyBusiness(1).then(
					res => {
						this.zaibanjian = this.dealData(res);
						console.log(res);
					},
					err => {
						console.log(err);
					}
				);
			},
			getBanjiejian() {
				this.getMyBusiness(2).then(
					res => {
						this.banjiejian = this.dealData(res);
						console.log(res);
					},
					err => {
						console.log(err);
					}
				);
			},
			getMyBusiness(type) {
				let user = {
					accountStatus: 0,
					address: null,
					appId: "21b6038d3f2a4373b064ede05308547a",
					city: null,
					country: null,
					email: null,
					enterAuth: null,
					gender: 0,
					id: "1632f80c937041ce8f0893b4c174ab14",
					introduction: null,
					isAgent: 0,
					isEnterprise: 0,
					isUserAuth: 0,
					mztLoginInfo: null,
					name: null,
					nickname: "U2167728001",
					phone: "15160418562",
					photoUrl: null,
					province: null,
					residentCityCode: null,
					residentCountyCode: null,
					residentProvinceCode: null,
					telephone: null,
					userAccountId: "1632f80c937041ce8f0893b4c174ab14",
					userAuth: null,
					userGrade: 0,
					userToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpblRpbWUiOjE2MTU1MjYyNTI3OTYsInVzZXJJZCI6IjE2MzJmODBjOTM3MDQxY2U4ZjA4OTNiNGMxNzRhYjE0IiwiYWNjb3VudFVzZXJJZCI6IjE2MzJmODBjOTM3MDQxY2U4ZjA4OTNiNGMxNzRhYjE0In0.IkVpCDAsRV2VUpdq4xhMWKHzJmsE9zG_ti9tVJj0tjXNrVbZzdk6pro3_Rz8txM0haNFlDVChNyXSOK-3g0miOAgls6_OKj6erkuM2Qd4TwpZ2NaGuRtkrec8ScymxIDCx-1JUuF8LjYv2_baDw8fYI0amgqJOtRCn0IdceG1hBz8X76IkJ8RFnxMCphaurCBFwlvOL3L3-BZ13_nQU_CGGNh0c9i8Yb8Rzvtr6x3I4XnRKGQbfdYUBB--6uQ53ig8GuE6G8plsyiuDF_-sdDwOFXxbmuTUAo-0RfFg--YAzCfqKlSFbimFPsgzIJuvkES9a5VM5XIlkNK1Gd1YWLA",
					zipCode: null,
				}
				// this.userInfo = user;
				return Http.getMyBusiness(user.userToken, user.id, type);
			},
			dealData(res) {
				let data = res['ReturnValue'];
				return data ? data : [];
			},
			clickNav(item, index) {
				this.navIndex = index;
				this.current = index;
			},
			swiperChange(e) {
				this.current = e.detail.current;
				this.navIndex = this.current;
			},
			clickItem(item) {
				console.log(item);
				let url = '../../base_apply/base_apply_page';
				url += `?itemName=${item.PNAME}`;
				url += `&permId=${item.PERMID}`;
				url += `&bsnum=${item.BSNUM}`;
				uni.navigateTo({
					url: url
				});
			}
		},
		onShow() {
			// if (!this.userInfo) {
			// 	return;
			// }
			this.getZancunjian();
			this.getZaibanjian();
			this.getBanjiejian();
		},
		onLoad(options) {
			// let params = JSON.parse(Util.base64Decode( decodeURIComponent(options.params)));
			// console.log("参数：", params);
			// debugger
			
			if (options.isFromMine == 1) {
				this.isFromMine = true
			}
			if (options.pageIndex) {
				this.current = parseInt(options.pageIndex) || 0;
				this.navIndex = this.current;
			}
			console.log("我的办件参数:", this.current)
		}
	};
</script>

<style lang="scss">
	@import 'my_business_page.scss';
</style>
