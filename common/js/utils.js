class Utils {
	constructor() {
		this.baseUrl = 'http://159.75.169.224:7300/pz'
	}
	//获取用户信息
	getUserInfo() {
		//调用uni的登录api
		uni.login({
			success: res => {
				console.log(res);
				this.request({
					url: "/auth/wxLogin",
					data: {
						code: res.code
					},
					sucess: res => {
						console.log(res, "hhhh");
					}
				})
			}
		})
	}
	
	//封装发送请求req
	request(option = {showLoading: false}) {
		//判断url是否存在
		if(!option.url) {
			return false;
		}
		if(option.showLoading) {
			this.showLoading()
		}
		uni.request({
			url: this.baseUrl + option.url,
			data: option.data ? option.data : {},
			header: option.header ? option.header : {},
			method: option.method ? option.method : 'GET',
			success: (response) => {
				uni.hideLoading()
				//后端返回的数据异常
				if(response.data.code != 10000) {
					//将失败的结果返回去
					if(option.fail && typeof(option.fail) == "function"){
						option.fail(response);
					}
				}else {
					//将成功的结果返回
					if(option.sucess && typeof(option.sucess) == "function"){
						option.sucess(response.data);
					}
				}
			},
			fail: () => {
				uni.hideLoading()
				console.log(response);
			}
		})
	}
	//创建加载的loading效果
	showLoading() {
		const isShowLoading = uni.getStorageSync("isShowLoading");
		if(isShowLoading) {
			uni.hideLoading();
			uni.setStorageSync("isShowLoading", false)
		}
		uni.showLoading({
			title: "加载中...",
			success() {
				uni.setStorageSync("isShowLoading", true)
			},
			fail() {
				uni.setStorageSync("isShowLoading", false)
			}
		})
	}
}

export default new Utils()