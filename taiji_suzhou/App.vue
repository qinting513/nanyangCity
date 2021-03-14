<script>
	import Http from './static/js/nanyang_http.js';
	export default {
		onLaunch: function(options) {
			console.log('App Launch options:', options);
			this.commitUser();
			// debugger
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			saveParams(options){
				if(options.page) {
					uni.setStorageSync('nparams', JSON.stringify(options));
				}
			},
			commitUser() {
				let user = uni.getStorageSync('nuser');
				console.log('commitUser user', user);
				// debugger
				if (null != user && undefined != user && '' != user) {
					this.$store.commit('updateUserInfo', JSON.parse(user));
					Http.registerUser(JSON.parse(user));
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
