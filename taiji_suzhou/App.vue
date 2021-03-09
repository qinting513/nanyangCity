<script>
	export default {
		onLaunch: function(options) {
			console.log('App Launch options:', this.page, options);
			let user = uni.getStorageSync('nuser');
			if (null != user && undefined != user && '' != user) { 
				this.$store.commit('updateUserInfo', JSON.parse(user));
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
