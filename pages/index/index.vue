<template>
	<view class="home-container">
<!-- 		<div class="bg">
			<u--image src="/static/home/home-bg.jpg" width="100vw"></u--image>
		</div> -->
		<div class="content" :style="'padding-top:' + titleHeight + 'px'">
			<view class="title">gitHabi</view>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titleHeight:0
		};
	},
	onLaunch(){
		// this.show = true
	},
	onShow(){
		this.getHeight()
	},
	methods: {
		// 获取微信右上角胶囊高度
		getHeight() {
			console.log('111111111111111111');
			let res = wx.getMenuButtonBoundingClientRect();
			this.titleHeight = res.top;
		}
	}
};
</script>

<style lang="scss" scoped>
.home-container {
	width: 100%;
	box-sizing: border-box;
	.bg{
		width: 100vw;
		position: fixed;
		z-index: -1;
		border-radius: 50rpx;
		overflow: hidden;
	}
	.content{
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		.title{
			color: #000;
			font-size: 36rpx;
		}
	}
}

</style>
