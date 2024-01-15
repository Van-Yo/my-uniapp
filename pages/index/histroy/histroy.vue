<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">历史上的今天</view>
			<u-icon name="arrow-left" color="#000" size="28" @click="goBehind"></u-icon>
		</view>
		<view class="content">
			<image class="image-bg" src="/static/home/histroy.jpg"/>
			<view class="outer">
				<view class="inner">
					<view v-for="(item,index) in dataList" :key="index" style="margin-bottom: 15rpx;">
						{{item}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getHistory} from '@/api/home.js'
	export default {
		data() {
			return {
				searchBarTop:0,
				searchBarHeight:0,
				dataList:[]
			};
		},
		onLoad(){
			this.getHeight(),
			this.getData()
		},
		methods:{
			// 获取微信右上角胶囊高度
			getHeight() {
				let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
				console.log({menuButtonInfo});
				this.searchBarTop = menuButtonInfo.top;
				this.searchBarHeight = menuButtonInfo.height;
			},
			goBehind(){
				uni.navigateBack({
					delta: 1
				});
			},
			async getData(){
				let res = await getHistory()
				console.log(res);
				this.dataList = res.result.map(item=>item.year+'年，'+item.title)
			}
		}
	}
</script>

<style lang="scss">
.home-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100vh;
	.head{
		// height CSS 属性指定了一个元素的高度。默认情况下，这个属性决定的是内容区（ content area）的高度，
		// 但是，如果将 box-sizing 设置为 border-box , 这个属性决定的将是边框区域（border area）的高度。
		// 全局设置了border-box，并且头部用了height，所以这边用content-box
		box-sizing:content-box !important;
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
		background-color: rgb(247, 247, 250);
		border-bottom:1px solid rgb(239, 239, 241);
		padding: 10rpx 0;
		position: relative;
		.title{
			color: #000;
			font-size: 36rpx;
		}
		::v-deep .u-icon{
			position: absolute;
			left: 30rpx;
		}
	}
	.content{
		flex:1;
		background-color: rgb(247, 247, 250);
		
		padding: 0 20rpx;
		position: relative;
		z-index: 0;
		overflow: hidden;
		.image-bg{
			position: absolute;
			    z-index: -1;
			    left: 0;
			    right: 0;
			    bottom: 0;
			    right: 0;
			    width: 100%;
			    height: 100%;
		}
		.outer{
			padding: 40rpx;
			padding-top: 65rpx;
			width: 100%;
			height: 100%;
			overflow-y: hidden;
			.inner{
				width: 100%;
				height: 100%;
				overflow-y: auto;
			}
		}
	}
}
</style>
