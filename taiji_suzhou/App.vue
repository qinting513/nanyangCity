<script>
	import Http from './static/js/nanyang_http.js';
	import store from './store/index.js'
	export default {
		onLaunch: function(options) {
			// console.log("window:", window);
			let user = uni.getStorageSync('nuser');
			if (null != user && undefined != user && '' != user) {
				user = JSON.parse(user);
				this.$store.commit('updateUserInfo', user);
			}
			this.registerAddressFunc();
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			registerAddressFunc() {
				let u = navigator.userAgent;
				let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				// console.log("store:", store);
				store.commit('updateIsAndriod', isAndroid);
				store.commit('updateIsIOS', isIOS);

				if (isAndroid) {
					// alert('是否是Android：'+ this.isAndroid);
					window.getAppAddress = function(data) {
						// 南威返回的数据
						// data = {
						// 	province: '北京市',
						// 	city: '北京市',
						// 	county: '西城区',
						// 	createTime: '12333333',
						// 	detailAddress: '背景老胡同',
						// 	type: 101,
						// 	userId: 'bajsnasdkjncaksd',
						// 	userName: '覃',
						// 	phone:'13058058350'
						// }
						uni.showToast({
							icon: 'none',
							title: JSON.stringify(data)
						});
						if (data != null && data != '') {
							let address = JSON.stringify(data);
							uni.setStorageSync('defaultAddress', address);
							store.commit('updateDefaultAddress', JSON.parse(address));
						}
					}
				} else if (isIOS) {
					// alert('是否是iOS：' + isIOS);
				}
			},
			saveParams(options) {
				if (options.page) {
					uni.setStorageSync('nparams', JSON.stringify(options));
				}
			},
		}
	};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	@import "static/css/common.css";
	@import "static/css/reset.css";

	page {
		background-color: #f2f5f5;
	}
</style>
