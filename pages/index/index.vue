<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">gitHabi</view>
		</view>
		<view class="content">
			<u-swiper :list="bannerList"></u-swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchBarTop:0,
			searchBarHeight:0,
			bannerList: [
			    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
			    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
			    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
			]
		};
	},
	onLaunch(){
		// this.show = true
	},
	onLoad(){
		this.getHeight()
	},
	methods: {
		// 获取微信右上角胶囊高度
		getHeight() {
			let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			console.log({menuButtonInfo});
			this.searchBarTop = menuButtonInfo.top;
			this.searchBarHeight = menuButtonInfo.height;
		}
	}
};
</script>

<style lang="scss" scoped>
.home-container {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: 100vh;
	.head{
		display: flex;
		justify-content: center;
		align-items: center;
		height: auto;
		background-color: rgb(247, 247, 250);
		border-bottom:1px solid rgb(239, 239, 241);
		padding: 10rpx 0;
		.title{
			color: #000;
			font-size: 36rpx;
		}
	}
	.content{
		flex:1;
		background-color: rgb(247, 247, 250);
		overflow-y: auto;
	}
}

</style>
