<template>
	<view>
	    <view style="width: 100%; border-bottom: 0 none; position: fixed; z-index: 2">
	        <view style="background: #ffffff; position: relative">
	            <view class="h-tab vp-flex">
	                <view :class="'h-tab-item vp-flex_1 ' + (filt == '' ? 'on' : '')" data-filt=""
	                    @tap="onFilterChange">全部</view>
	                <view :class="'h-tab-item vp-flex_1 ' + (filt == 1 ? 'on' : '')" data-filt="1"
	                    @tap="onFilterChange">待支付</view>
	                <view :class="'h-tab-item vp-flex_1 ' + (filt == 2 ? 'on' : '')" data-filt="2"
	                    @tap="onFilterChange">待服务</view>
	                <view :class="'h-tab-item vp-flex_1 ' + (filt == 3 ? 'on' : '')" data-filt="3"
	                    @tap="onFilterChange">已完成</view>
	                <view :class="'h-tab-item vp-flex_1 ' + (filt == 4 ? 'on' : '')" data-filt="4"
	                    @tap="onFilterChange">已取消</view>
	            </view>
	        </view>
	    </view>
	    <view style="height: 100rpx"></view>
	    <block v-if="list != null">
	        <view v-if="list != null && list.length == 0" style="padding: 40rpx 40rpx 40rpx 40rpx; text-align: center">
	            <image src="/static/resource/images/empty.png" mode="widthFix" style="width: 200rpx" />
	            <view class="f5">没有相关内容~</view>
	        </view>
	        <view v-else class="od-list">
	            <block v-for="(item, index) in list" :key="index">
	                <view class="od-item" @tap="toOrder" :data-id="item.out_trade_no">
	                    <view class="weui-cell weui-cell_access">
	                        <view class="weui-cell__hd">
	                            <view>
	                                <image :src="item.service_logo_image_url" mode="widthFix" class="od-logo"
	                                    style="width: 100rpx; height: 100rpx; margin-right: 20rpx" />
	                            </view>
	                        </view>
	                        <view class="weui-cell__bd">
	                            <view>
	                                <text style="font-weight: bold">{{ item.service_name }}</text>
	                            </view>
	                            <view class="od-info">
	                                <block v-if="item.service_stype <= 20">
	                                    <view>
	                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
	                                    </view>
	                                    <view>
	                                        预约时间：
	                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
	                                    </view>
	                                    <view>
	                                        就诊人员：
	                                        <text>{{ item.client_name }}</text>
	                                    </view>
	                                </block>
	                                <block v-if="item.service_stype > 20 && item.service_stype < 100">
	                                    <view>
	                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
	                                    </view>
	                                    <view>
	                                        处理时间：
	                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
	                                    </view>
	                                </block>
	                                <block v-if="item.service_stype > 100">
	                                    <view>
	                                        服务时间：
	                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
	                                    </view>
	                                    <view>
	                                        服务对象：
	                                        <text>{{ item.client_name }}</text>
	                                    </view>
	                                    <!-- <view>服务地址：<text>{{item.address.address}}</text> </view> -->
	                                </block>
	                            </view>
	                        </view>
	                        <view class="weui-cell__ft">
	                            <!-- 待付款 -->
	                            <block v-if="item.trade_state == '待支付'">
	                                <view style="color: #ffa200"><text>待支付</text></view>
	                                <view style="color: #ffa200">
	                                    <counter style="font-size: 24rpx" :second="item._exp_time"
	                                        @counterOver="onCounterOver" />
	                                </view>
	                            </block>
	                            <!-- 进行中 -->
	                            <block v-if="item.trade_state == '待服务'">
	                                <view style="color: #1da6fd"><text>待服务</text></view>
	                            </block>
	                            <!-- 已完成 -->
	                            <block v-if="item.trade_state == '已完成'">
	                                <view style="color: #21c521"><text>已完成</text></view>
	                            </block>
	                            <!-- 已取消 -->
	                            <block v-if="item.trade_state == '已取消'">
	                                <view style="color: #999999"><text>已取消</text></view>
	                            </block>
	                        </view>
	                    </view>
	                </view>
	            </block>
	        </view>
	    </block>
	</view>

</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	import {
		reactive,
		ref,
		toRaw
	} from 'vue'
	
	const app = getApp()
	//记录点击订单状态栏当前tap
	const filt = ref('')
	//订单list
	const list = ref([])
	
	onShow(() => {
		filt.value = app.globalData.orders_filt
		loadList();
	})
	
	//订单状态栏点击
	const onFilterChange = (e) => {
		const {filt:curFilt} = e.currentTarget.dataset//解构赋值，并且取别名curFilt
		if(filt.value == curFilt) return 
		
		filt.value = curFilt
		loadList();
	}
	
	//根据状态查询订单列表
	const loadList = () => {
		//调用订单列表
		app.globalData.utils.request({
			url: '/order/list',
			method: 'GET',
			header: {
				token: uni.getStorageSync('token')
			},
			data: {
				state: filt.value
			},
			sucess: res => {
				console.log(res);
				list.value = res.data
			},
			// fail: res => {
			// 	uni.showToast({
			// 		title: res.msg,
			// 		icon: 'none'
			// 	})
			// }
		})
	}
	
	//点击订单item跳转到订单详情页
	const toOrder = (e) => {
		const orderid = e.currentTarget.dataset.id
		uni.navigateTo({
			url:'/pages/order/orderDetail?oid='+orderid
		})
	}
	
	//倒计时结束后的回调
	const onCounterOver = () => {
		loadList();
	}
</script>

<style>
@import url('index.css');
</style>
