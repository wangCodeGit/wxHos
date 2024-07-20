<template>
	<view>
		<view class="op-cells" style="background-color: #ffffff; padding: 0 0 60rpx 0; overflow: hidden; text-align: center">
			<view style="margin-top: 40rpx">
				<view style="display: inline-block; width: 150rpx; height: 150rpx; border-radius: 200rpx; overflow: hidden">
					<block v-if="mine.avatar">
						<image :src="mine.avatar_url" style="width: 150rpx; height: 150rpx" />
					</block>
					<block v-else>
						<image src="/static/resource/images/avatar.jpg" style="width: 150rpx; height: 150rpx" />
					</block>
				</view>
			</view>
			<view style="padding-top: 20rpx">
				<text class="user-nickname">{{ mine.nickname ? mine.nickname : '用户' + mine._id }}</text>
			</view>
		</view>
		<view class="weui-cells op-cells" style="margin-top: 20rpx">
			<view class="weui-cell">
				<view class="weui-cell__bd">我的订单</view>
				<view class="weui-cell__ft"><text @tap="toOrders" style="font-size: 26rpx">全部</text></view>
			</view>
			<view class="weui-cell" style="padding: 0">
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="1">
						<view class="data-icon"><image src="/static/resource/images/od_10.png" mode="widthFix" /></view>
						<view class="data-txt">待支付</view>
						<text v-if="statistic.topays > 0" class="data-cell-hint data-cell-hint-red">{{ statistic.topays }}</text>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="2">
						<view class="data-icon"><image src="/static/resource/images/od_20.png" mode="widthFix" /></view>
						<view class="data-txt">待服务</view>
						<text v-if="statistic.todos > 0" class="data-cell-hint data-cell-hint-red">{{ statistic.todos }}</text>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="3">
						<view class="data-icon"><image src="/static/resource/images/od_30.png" mode="widthFix" /></view>
						<view class="data-txt">已完成</view>
					</view>
				</view>
				<view class="weui-cell__bd">
					<view class="data-cell" hover-class="weui-cell_active" @tap="toOrders" data-filt="4">
						<view class="data-icon"><image src="/static/resource/images/od_40.png" mode="widthFix" /></view>
						<view class="data-txt">已取消</view>
					</view>
				</view>
			</view>
		</view>
		<view class="weui-cells op-cells" style="margin-top: 20rpx">
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_clients.png" style="display: block; margin-right: 20rpx; width: 20px; height: 20px"></image>
				</view>
				<view class="weui-cell__bd">服务对象管理</view>
				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			</view>
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="showShareModal">
				<view class="weui-cell__hd">
					<image src="/static/resource/images/ic_share.png" style="display: block; margin-right: 20rpx; width: 20px; height: 20px"></image>
				</view>
				<view class="weui-cell__bd">分享转发</view>
				<view class="weui-cell__ft weui-cell__ft_in-access"></view>
			</view>
		</view>
		<share :shareModal="clone_shareModal"></share>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	
	const app = getApp()
	
	const mine = ref({})
	const statistic = ref({
		topay: 0,
		todos: 0
	})
	onLoad(() => {
		app.globalData.utils.request({
			url: '/User/index',
			header: {
				token: uni.getStorageSync('token')
			},
			sucess: res => {
				mine.value = res.data.mine
				statistic.value = res.data.statistic
			}
		})
	})
	
	const toOrders = (e) => {
		console.log(e.currentTarget.dataset.filt);
		if(e.currentTarget.dataset.filt) {
			app.globalData.orders_filt = e.currentTarget.dataset.filt
		}else {
			app.globalData.orders_filt = ''
		}
		uni.switchTab({
			url: '/pages/order/index',
		})
	}
</script>

<style>
@import url('index.css');
</style>
