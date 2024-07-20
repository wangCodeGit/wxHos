<template>
	<view>
		<navbar title-text="" :isHeight="false" :isWhite="true" background="none" @navBarAttached="onNavBarAttached" />
		<view style="position: relative;">
			<image
				:src="hospital.avatar_url"
				mode="aspectFill"
				style="filter: blur(50rpx) brightness(0.8); display: block; width: 100%; height: 550rpx; overflow: hidden"
			></image>
			<view :style="'position:absolute;top:' + navBarHeight + 'rpx;padding-top:65rpx;overflow:hidden;width:100%;'">
				<view class="hospital-hd">
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
						<view class="weui-cell__hd">
							<image
								:src="hospital.avatar_url"
								mode="aspectFill"
								style="position: absolute; top: -65rpx; display: block; width: 150rpx; height: 135rpx; border-radius: 10rpx; overflow: hidden"
							></image>
						</view>
						<view class="weui-cell__bd" style="padding-left: 170rpx">
							<view style="position: absolute; top: -65rpx">
								<text style="font-size: 36rpx; color: #ffffff; font-weight: bold">{{ hospital.name }}</text>
							</view>
							<view>
								<text class="hosp-rank">{{ hospital.rank }}</text>
								<text class="hosp-label">{{ hospital.label }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">转发</text></view>
					</view>
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="toMap">
						<view class="weui-cell__hd">
							<image
								src="/static/resource/images/ic_address.png"
								mode="aspectFill"
								style="margin-right: 10rpx; display: block; width: 40rpx; height: 40rpx"
							></image>
						</view>
						<view class="weui-cell__bd">
							<view>
								<text style="font-size: 24rpx">{{ hospital.city }}{{ hospital.district }}{{ hospital.address }}</text>
							</view>
						</view>
						<view class="weui-cell__ft weui-cell__ft_in-access"><text class="f4">导航</text></view>
					</view>
				</view>
				<view class="hospital-bd">
					<view class="weui-cells serv-list">
						<view class="weui-cell serv-item">
							<view class="weui-cell__bd">
								<view style="padding-top: 10rpx"><text class="serv-name">在线预约您需要的服务</text></view>
							</view>
							<view class="weui-cell__ft"></view>
						</view>
						<view class="weui-cell serv-item" @tap="toService" :data-svid="item.id" v-for="(item, index) in services" :key="index">
							<block v-if="item.use_switch == 1">
								<view class="weui-cell__hd">
									<image class="serv-logo" :src="item.logo_image ? item.logo_image_url : '../../resource/images/avatar.jpg'" mode="aspectFill" />
								</view>
								
								<view class="weui-cell__bd">
									<view>
										<text class="serv-name">{{ item.name }}</text>
									</view>
									<view class="serv-line serv-intro">{{ item.intro }}</view>
									<view class="serv-line">
										<text class="serv-price">{{ item.price }}</text>
										<text class="serv-unit">元/次</text>
									</view>
								</view>
								
								<view class="weui-cell__ft">
									<button class="btn1m">预约</button>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<share :shareModal="clone_shareModal"></share>
	</view>

</template>

<script setup>
	import { ref } from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	
	const app = getApp()
	//分享功能是否打开
	const clone_shareModal = ref(false)
	
	//医院详情数据
	const hospital = ref({})
	onLoad((options) => {
		app.globalData.utils.request({
			url: '/Hospital/index',
			data: {
				hid: options.hid
			},
			sucess: res => {
				hospital.value = res.data.hospital
			}
		})
	})
	
	const navBarHeight =  ref('')
	const onNavBarAttached = (e) => {
		navBarHeight.value = e.detail.navBarHeight
	}
	
	const showShareModal = () => {
		clone_shareModal.value = true
	}
	
	//导航打开
	const toMap = () => {
		const point = bMapTransQQMap(hospital.value.lng, hospital.value.lat);
		const { qmap_key:key } = uni.getStorageSync('cfg');
		const referer = app.globalData.name
		const endPoint = JSON.stringify({
			name: hospital.value.name,
			latitude: point.lat,
			longitude: point.lng
		})
		uni.navigateTo({
			url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer +'&endPoint=' + endPoint + '&navigation=1'
		})
	}
	
	const bMapTransQQMap = (lng, lat) => {
		let x_pi = (3.1415926653589793 * 3000) / 180;
		let x = lng - 0.0065;
		let y = lat - 0.006;
		let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
		let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
		let lngs = z * Math.cos(theta);
		let lats = z * Math.sin(theta);
		return {
			lng: lngs,
			lat: lats
		}
	}
</script>

<style>
@import url('index.css');
</style>
