<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
			<view class="od-jd od-jd-0">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="pub-box">
			<view class="pub-box-bd">
				<view class="weui-cell weui-cell_input">
					<view class="weui-cell__hd">
						<image class="serv-icon"
							:src="service.icon_image ? service.icon_image_url : '../../static/resource/images/avatar.jpg'"
							mode=""></image>
					</view>
					<view class="weui-cell__bd">
						<text class="serv-name">{{service.name}}</text>
					</view>
					<view class="weui-cell__ft">
						<view class="f5 ic_info" @click="handleTap">
							{{service.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="service.stype == 10 || service.stype == 15 || service.stype == 20">
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择要就诊的医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择就诊时间"></dtPicker>
							</view>
						</view>
					</view>
					<view class="weui-cell weui-cell_input" @click="onClientChange">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<input type="text" class="weui-inpupt" placeholder-class="vp-placeholder"
									style="text-align: right;" disabled="true" placeholder="请选择就诊人"
									:value="client.name" />
							</view>
						</view>
					</view>
					<block v-if="service.stype == 15">
						<!-- 接送陪诊 -->
						<view class="weui-cell weui-cell_input">
							<view class="weui-cell__hd">接送地址</view>
							<view class="weui-cell__bd">
								<input class="weui-input" name="receiveAddress" style="text-align: right"
									placeholder-class="vp-placeholder" placeholder="请填写就诊人所在地址"
									v-model="order.receiveAddress" />
							</view>
						</view>
					</block>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>

				</view>
			</view>

			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="service.stype == 30 || service.stype == 40">
			<!-- 送取结果,代跑取药 -->
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<picker @change="onHospitalChange" :value="hospital_index" :range="hospitals"
									range-key="name">
									<input type="text" :disabled="true" placeholder="请选择就诊所在医院"
										:value="hospitals[hospital_index].name" placeholder-class="vp-placeholder" />
								</picker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onAddressChange">
						<view class="weui-cell__hd">
							<view class="weui-label">收件信息</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<input class="weui-input" :disabled="true" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请选择收件信息" :value="
																order.address.userName
																	? order.address.userName + '(' + order.address.cityName + order.address.countyName + order.address.detailInfo + ')'
																	: ''
															" />
							<!-- {{order.address?(order.address.userName+'('+order.address.telNumber+')'):''}} -->
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>

			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="如有其他服务要求请在此填写.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="service.stype == 110">
			<!-- 上门服务 -->
			<view class="pub-box">
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">
							<view class="weui-label">服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<view>
								<dtPicker @dtPickerChanged="onStartTimeChanged" :timestamp="order.starttime"
									placeholder="请选择期望服务时间"></dtPicker>
							</view>
						</view>
					</view>

					<view class="weui-cell weui-cell_input" @click="onClientChange">
						<view class="weui-cell__hd">服务对象</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft weui-cell__ft_in-access">
							<input class="weui-input" :disabled="true" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请选择服务对象" :value="client.name" />
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">服务地址</view>
						<view class="weui-cell__bd">
							<input class="weui-input" name="receiveAddress" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写服务所在地址"
								v-model="order.receiveAddress" />
						</view>
					</view>
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__hd">联系电话</view>
						<view class="weui-cell__bd">
							<input class="weui-input" type="number" name="tel" style="text-align: right"
								placeholder-class="vp-placeholder" placeholder="请填写您的联系电话" v-model="order.tel" />
						</view>
					</view>
				</view>
			</view>

			<view class="pub-box">
				<view class="pub-box-tt">服务需求</view>
				<view class="pub-box-bd">
					<view class="weui-cell weui-cell_input">
						<view class="weui-cell__bd">
							<textarea name="demand" auto-height placeholder="请简单描述您要就诊的科室.."
								placeholder-class="vp-placeholder" style="min-height: 150rpx" v-model="order.demand" />
						</view>
					</view>
				</view>
			</view>
		</block>

		<view style="height: 300rpx"></view>
		<!-- 悬浮提交按钮 -->
		<view class="vp-foot">
			<view style="background: #ffffff; padding: 20rpx">
				<view class="xieyi" style="text-align: center">
					<text :class="'is_xieyi ' + (is_xieyi ? 'is_xieyi_on' : '')" @click="onXieyiChange">我已阅读并同意</text>
					<navigator :url="cfg.page_xy">《用户协议》</navigator>
					<text>和</text>
					<navigator :url="cfg.page_fw">《服务协议》</navigator>
				</view>
				<view>
					<button :class="'btnp ' + (is_xieyi ? '' : 'btnp-disabled')" @click="submit">
						确认下单
						<block v-if="order.price > 0">（支付{{ order.price }}元）</block>
					</button>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="popup-content">
				<view class="group">
					<input class="uni-input" type="tel" v-model="validMobile.phone" placeholder="手机号" />
				</view>
				<view class="group">
					<input class="uni-input" v-model="validMobile.validCode" placeholder="验证码" />
					<text class="valid-text" @click="countdownChange">{{countdown.validText}}</text>
				</view>
			</view>
			<view class="btns">
				<view class="cancal" @click="cancal">取消</view>
				<view class="ok" @click="ok">确定</view>
			</view>
		</uni-popup>

		<!-- 支付二维码弹窗 -->
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image @click="payment" src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx" mode=""></image>
				<view class="text-center">
					微信支付
				</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx;"></canvas>
				<view class="text-center">
					请用本人微信扫一扫
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		reactive,
		ref,
		toRaw
	} from 'vue'
	import UQRCode from 'uqrcodejs';

	const app = getApp();
	onLoad((option) => {
		main_load(option)
	})

	//手机验证码弹窗
	const popup = ref()
	//支付二维码弹窗
	const qrcodePopup = ref()
	//页面服务详情数据
	const service = ref({})
	//医院数据源
	const hospitals = ref([])
	//医院数据源---普通类型
	let hospitalsData = []
	//选中的医院索引
	const hospital_index = ref(0)
	//订单数据
	const order = reactive({
		price: '',
		starttime: '',
		receiveAddress: '',
		tel: '',
		demand: '',
		address: {
			userName: '',
			cityName: '',
			countyName: '',
			detailInfo: ''
		}
	})
	//选中的就诊人
	const client = reactive({
		name: ''
	});
	//是否同意协议
	const is_xieyi = ref(false)
	const cfg = reactive({
		page_xy: '',
		page_fw: ''
	})
	//手机验证
	const validMobile = reactive({
		phone: '',
		validCode: ''
	})
	const countdown = reactive({
		validText: '获取验证码',
		time: 60
	})
	const main_load = (option) => {
		app.globalData.utils.request({
			url: '/Service/order',
			data: {
				svid: option.svid
			},
			sucess: (res) => {
				service.value = res.data.service
				hospitals.value = res.data.hospitals
				hospitalsData = toRaw(hospitals.value);
				//默认选中
				if (option.hid > 0) {
					for (let i = 0; i < hospitalsData.length; i++) {
						if (hospitalsData[i].id == option.hid) {
							hospital_index.value = i;
							order.price = hospitalsData[i].service_price
							break;
						}
					}
				}
			}
		})
	}

	//点击服务弹出提醒
	const handleTap = () => {

	}

	//改变医院的数据
	const onHospitalChange = (e) => {
		const value = parseInt(e.detail.value)
		hospital_index.value = value;
		order.price = hospitalsData[value].service_price
	}

	//修改日期后的回调函数
	const onStartTimeChanged = (e) => {
		order.starttime = e.detail.value
	}

	//点击就诊人
	const onClientChange = (e) => {
		uni.navigateTo({
			url: '/pages/clients/index?act=select',
		})
	}

	//创建监听全局的自定义事件
	uni.$on('clientChange', (data) => {
		client.name = data.name
		client.id = data.user_id
		client.sex = data.sex
		client.age = data.age
		client.mobile = data.mobile
	})

	//收件信息-地址
	const onAddressChange = () => {
		uni.chooseAddress({
			success: (res) => {
				order.address.userName = res.userName;
				order.address.cityName = res.cityName
				order.address.countyName = res.countyName
				order.address.detailInfo = res.detailInfo
			},
			fail: (res) => {
				console.log(res);
			}
		})
	}

	//同意协议
	const onXieyiChange = () => {
		is_xieyi.value = !is_xieyi.value;
	}

	//订单数据--普通类型
	let orderData = {};
	//下单
	const submit = () => {
		if (!is_xieyi.value) {
			return uni.showToast({
				title: '请先阅读并同意用户协议和服务协议',
				icon: 'none',
				duration: 1000
			})
		}
		orderData = toRaw(order);
		const serviceData = toRaw(service.value)
		const hospitalData = toRaw(hospitals.value)
		const clientData = toRaw(client)
		orderData.service_code = serviceData.code
		orderData.service_id = serviceData.id
		orderData.service_name = serviceData.name
		orderData.service_stype = serviceData.stype
		//医院选择校验
		if (serviceData.stype < 100) {
			if (hospital_index.value == 0) {
				return uni.showToast({
					title: "请选择医院",
					icon: 'none',
					duration: 1000
				})
			}

			orderData.hospital_id = hospitalData[hospital_index.value].id
			orderData.hospital_name = hospitalData[hospital_index.value].name
		}

		if (!orderData.starttime) {
			return uni.showToast({
				title: "请选择服务时间",
				icon: 'none',
				duration: 1000
			})
		}

		if (serviceData.stype == 10 || serviceData.stype == 15 || serviceData.stype == 20) {
			console.log(clientData);
			//就诊人校验
			if (!clientData.id) {
				return uni.showToast({
					title: '请选择就诊人',
					icon: 'none',
					duration: 1000
				})
			}
			orderData.client = {};
			orderData.client.age = clientData.age
			orderData.client.mobile = clientData.mobile
			orderData.client.name = clientData.name
			orderData.client.sex = clientData.sex

			//接送地址验证
			if (serviceData.stype == 15) {
				if (!orderData.receiveAddress) {
					return uni.showToast({
						title: '请选择就诊人接送地址',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}

		if (serviceData.stype == 30 || serviceData.stype == 40) {
			if (!orderData.address.userName) {
				return uni.showToast({
					title: '请选择收件信息',
					icon: 'none',
					duration: 1000
				})
			}
		}
		//判断联系电话
		if (!orderData.tel) {
			return uni.showToast({
				title: '请填写联系电话',
				icon: 'none',
				duration: 1000
			})
		}
		console.log(orderData, "88888888888888888888888888888");
		//判断用户是否登录，未登录就弹出手机验证码框登录，已登录就直接创建下单
		if (!uni.getStorageSync('token')) {
			popup.value.open('center')
		} else {
			createOrder();
		}
	}

	//确认
	const ok = () => {
		// 校验手机号和验证码
		if (!validMobile.phone || !validMobile.validCode) {
			return uni.showToast({
				title: '请检查填写数据',
				icon: 'none',
				duration: 1000
			})
		}

		//验证短信
		app.globalData.utils.request({
			url: '/user/authentication',
			method: 'POST',
			data: {
				tel: validMobile.phone,
				code: validMobile.validCode
			},
			sucess: (res) => {
				//将token存入缓存
				uni.setStorageSync('token', res.data.token)
				//调用下单
				createOrder();
			},
			fail: (res) => {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			}
		})
	}
	//quxiao-关闭弹窗
	const cancal = () => {
		popup.value.close()
	}
	let flag = false;
	const countdownChange = () => {
		if (!validMobile.phone) {
			return uni.showToast({
				title: '请输入手机号',
				icon: 'none',
				duration: 1000
			})
		}
		console.log(flag);
		if (flag) return
		const time = setInterval(() => {
			if (countdown.time <= 0) {
				countdown.validText = '获取验证码'
				countdown.time = 60
				flag = false
				clearInterval(time)
			} else {
				countdown.time--
				countdown.validText = `剩余${countdown.time}s`
			}
		}, 1000)
		flag = true

		//发生验证码
		app.globalData.utils.request({
			url: '/get/code',
			method: "POST",
			data: {
				tel: validMobile.phone
			},
			sucess: (res) => {
				uni.showToast({
					title: '验证码发送成功，请尽快验证',
					icon: 'none',
					duration: 1000
				})
			},
			fail: (res) => {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 1000
				})
			}
		})
	}

	//下单逻辑
	const createOrder = () => {
		//调用下单的接口
		app.globalData.utils.request({
			url: '/pay/createOrder',
			method: 'POST',
			header: {
				token: uni.getStorageSync('token')
			},
			data: orderData,
			sucess: res => {
				qrcodePopup.value.open('center')
				// 获取uQRCode实例
				const qr = new UQRCode();
				// 设置二维码内容
				qr.data = res.wx_code;
				// 设置二维码大小，必须与canvas设置的宽高一致
				qr.size = 150;
				// 调用制作二维码方法
				qr.make();
				// 获取canvas上下文
				var canvasContext = uni.createCanvasContext('qrcode'); // 如果是组件，this必须传入
				// 设置uQRCode实例的canvas上下文
				qr.canvasContext = canvasContext;
				// 调用绘制方法将二维码图案绘制到canvas上
				qr.drawCanvas();
			},
			fail: res => {

			}
		})
	}
	
	//跳转到订单列表
	const payment = () => {
		uni.switchTab({//跳转到tabBar标签  要用switchTab
			url: '/pages/order/index'
		})
	}
</script>

<style>
	@import url('index.css');
</style>