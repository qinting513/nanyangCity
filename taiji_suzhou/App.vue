<script>
	import Http from 'static/js/nanyang_normal_http.js'
	export default {
		onLaunch: function() {
			console.log('App Launch');
			let accessToken = uni.getStorageSync('nanyang__accessToken');
			if (null != accessToken && undefined != accessToken && '' != accessToken) {
				Http.getAppAuthUserInfo(accessToken);
			} else {
				Http.getUserInfo();
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
