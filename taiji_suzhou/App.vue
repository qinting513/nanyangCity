<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		// setTimeout(() => {
		// 	uni.setTabBarBadge({
		// 		index: 1,
		// 		text: '31'
		// 	});
		// 	uni.showTabBarRedDot({
		// 		index: 3
		// 	});
		// }, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
/* @import url("http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"); */
/* @import "static/css/weui.min.css"; */
@import "static/css/common.css";
@import "static/css/reset.css";


</style>
