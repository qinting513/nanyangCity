<script>
	import Http from './static/js/nanyang_http.js';
	export default {
		onLaunch: function(options) {
			console.log('App Launch options:', this.page, options);
			let user = uni.getStorageSync('nuser');
			// debugger
			if (null != user && undefined != user && '' != user) {
				this.$store.commit('updateUserInfo', JSON.parse(user));
				Http.registerUser(JSON.parse(user));
				// if (user && user.userAuth) { // 检测用户是否注册过
				// 	Http.checkUserByPid('1', user.userAuth.cardId).then((res) => {
				// 		debugger
				// 		console.log("检查用户信息", res);
				// 		if (res.ReturnValue && res.ReturnValue.ISEXIST == 0) {
				// 			Http.registerUser(user);
				// 		}
				// 	}).catch(err => {
				// 		console.log("检查用户信息")
				// 	})
				// }
				// if (user && user.enterAuth) { // 检测用户是否注册过
				// 	Http.checkUserByPid('2', user.enterAuth.corporationCardId).then((res) => {
				// 		console.log("检查用户信息", res);
				// 		if (res.ReturnValue && res.ReturnValue.ISEXIST == 0) {
				// 			Http.registerUser(user);
				// 		}
				// 	}).catch(err => {
				// 		console.log("检查用户信息")
				// 	})
				// }
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
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
