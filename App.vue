<script>
	import utils from './common/js/utils.js'
	export default {
		onLaunch: function() {
			utils.request({
				url: '/app/init',
				sucess: (res) => {
					uni.setStorageSync('cfg', res.data.cfg)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			utils,
			orders_filt: ''
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'app.css';
	page{
		background: white ;
	}
</style>
