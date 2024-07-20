<template>
	<view>
		<!-- navbar头部 -->
		<navbar :isHome="true"/>
		<!-- 添加小程序 -->
		<view :style="'margin-top:' + (navHeight + 30) +'rpx;'">
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell__hd">
					<image src="../../static/resource/images/ic_myapp.png" style="display: block;width: 40rpx;height: 40rpx;margin-right: 14rpx;"></image>
				</view>
				<view class="weui-cell__bd">
					<text style="color: #be9719;font-size: 26rpx;">点击右上角“添加到我的小程序”，方便下次找到！</text>
				</view>
				<view class="weui-cell__ft">
					<image src="../../static/resource/images/modal_closer.png" style="display: block;width: 30rpx;height: 30rpx"></image>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view v-if="slides && slides.length > 0" class="index-swiper">
			<swiper :autoplay="true" :circular="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(s, index) in slides" :key="index">
					<image :src="s.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 快捷入口 -->
		<view v-if="nav2s && nav2s.length > 0" class="nav2-list">
			<block v-for="(n, index) in nav2s" :key="index">
				<view class="nav2-item" @click="onNav2Tap($event, n)" :data-index="index">
					<view class="nav2-pic">
						<image :src="n.pic_image_url" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		<!-- 五个金刚区快捷入口 -->
		<view v-if="navs && navs.length > 0" class="nav-list">
			<block v-for="(n, index) in navs" :key="index">
				<view class="nav-item" @click="onNavTap($event, n)" :data-index="index">
					<view class="nav-pic">
						<image :src="n.pic_image_url" mode="widthFix"></image>
					</view>
					<view class="nav-text">
						<text :style="'color:' + (n.tcolor ? n.tcolor : '')">{{n.title}}</text>
					</view>
				</view>
			</block>
		</view>
		<!-- 医院列表 -->
		<view class="weui-cells hosp-list">
			<view 
				class="weui-cell hosp-item weui-cell_access"
				v-for="(h, index) in hospitals" :key="h.id"
				:data-index="h.id"
				@click="toHospital($event, h)"
			>
				<view class="weui-cell__hd">
					<image class="hosp-avatar" :src="h.avatar_url ? h.avatar_url : '../../static/resource/images/avatar.jpg'" mode="aspectFill"></image>
				</view>
				<view class="weui-cell-bd">
					<view>
						<text  class="hosp-name">{{ h.name }}</text>
					</view>
					<view class="hosp-line">
						<text  class="hosp-rank">{{ h.rank }}</text>
						<text  class="hosp-label">{{ h.label }}</text>
					</view>
					<view class="hosp-line">
						<text  class="hosp-intro">{{ h.intro }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import setNavSize from '../utils/hooks/topbar';
	import { onLoad } from '@dcloudio/uni-app';
	import { ref } from 'vue'
	
	//获取hooks
	const {navHeight} = setNavSize();
	
	const app = getApp();
	
	//轮播图
	const slides = ref([])
	//快捷入口2
	const nav2s = ref([])
	//快捷入口5个
	const navs = ref([])
	//医院列表
	const hospitals = ref([])
	onLoad(() => {
		// app.globalData.utils.getUserInfo()
		app.globalData.utils.request({
			url: '/app/init',
			sucess: res => {
				const { id } = res.data.area;
				//通过区域id去获取对应区域地区的页面数据
				app.globalData.utils.request({
					url: '/Index/index',
					data: {
						aid: id
					},
					sucess: ({ data }) => {
						console.log(data);
						slides.value= data.slides;
						nav2s.value = data.nav2s;
						navs.value = data.navs
						hospitals.value = data.hospitals
					}
				})
			}
		})
	})
	
	function onNav2Tap(event, nav2Item) {
		console.log(nav2Item);
		//判断是否为内部链接
		if(nav2Item.stype == 1) {
			uni.navigateTo({
				url: nav2Item.stype_link
			})
		}
	}
	const onNavTap = (event, navItem) => {
		console.log(navItem);
		//判断是否为内部链接
		if(navItem.stype == 1) {
			uni.navigateTo({
				url: navItem.stype_link
			})
		}
	}
	
	//跳转医院详情
	const toHospital = (event, navItem) => {
		uni.navigateTo({
			url: "/pages/hospital/index?hid=" + navItem.id
		})
	}
</script>
<style>
	page {
		background: white;
	}
	.index-swiper {
		padding: 20rpx 20rpx 0 20rpx;
	}
	.index-swiper swiper-item {
		height: 320rpx;
		border-radius: 10rpx;
	}
	.index-swiper swiper swiper-item image{
		height: 100%;
		width: 100%;
	}
	.nav2-list {
	    margin: 10rpx 20rpx 0 20rpx;
	}
	.nav2-list::after {
	    content: '';
	    display: block;
	    height: 0;
	    line-height: 0;
	    clear: both;
	    visibility: hidden;
	}
	.nav2-item {
	    float: left;
	    margin-top: 20rpx;
	    width: 50%;
	    text-align: center;
	    box-sizing: border-box;
	    padding: 0 5rpx;
	}
	.nav2-pic {
	    width: 100%;
	}
	.nav2-pic image {
	    display: block;
	    width: 100%;
	}
	.nav-list::after {
	    content: '';
	    display: block;
	    height: 0;
	    line-height: 0;
	    clear: both;
	    visibility: hidden;
	}
	.nav-item {
	    float: left;
	    margin-top: 20rpx;
	    width: 20%;
	    text-align: center;
	    padding: 10rpx 0;
	}
	.nav-pic image {
	    display: block;
	    margin: 0 auto;
	    width: 110rpx;
	    height: 110rpx;
	}
	.nav-text {
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
	}
	.hosp-list {
	    margin: 10rpx 0 0 0;
	    background: none;
	}
	.hosp-list::before {
	    display: none;
	}
	.hosp-list::after {
	    display: none;
	}
	
	.hosp-item {
	    -webkit-box-align: stretch;
	    -webkit-align-items: stretch;
	    align-items: stretch;
	    padding: 20rpx;
	    margin: 20rpx;
	    border-radius: 10rpx;
	    overflow: hidden;
	    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
	}
	.hosp-item::before {
	    display: none;
	}
	.hosp-item::after {
	    display: none;
	}
	.hosp-name {
	    font-weight: bold;
	    font-size: 34rpx;
	}
	.hosp-avatar {
	    display: block;
	    width: 200rpx;
	    height: 180rpx;
	    border-radius: 10rpx;
	    overflow: hidden;
	    margin-right: 20rpx;
	}
	.hosp-line {
	    margin-top: 5rpx;
	}
	.hosp-line text {
	    font-size: 26rpx;
	}
	.hosp-rank {
	    font-weight: bold;
	    color: #0bb585;
	    margin-right: 15rpx;
	}
	.hosp-label {
	    font-weight: bold;
	    color: #0ca7ae;
	    margin-right: 15rpx;
	}
	.hosp-intro {
	    color: #999999;
	}
</style>
