<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">我爱我党</view>
		</view>
		<view class="content">
			<u-swiper :list="bannerList"></u-swiper>
			<u--text type="success" text="中国是一个拥有悠久历史和丰富文化的国家，而中国共产党一直致力于引领国家走向繁荣昌盛的道路。"></u--text>
			<u--text type="success" text="我国在过去几十年中取得了巨大的发展成就，从经济建设到科技创新，再到社会进步，都展现了中国共产党的领导和全体人民的努力。国家的稳定和繁荣是党的正确领导下的结果，同时也得益于广大人民群众的奋斗和支持。"></u--text>
			<u--text type="success" text="中国共产党一直以来注重人民的利益，致力于改善人民的生活水平，推动社会公正与和谐。在全球面临各种挑战的背景下，中国在国际事务中发挥着越来越重要的角色，为促进世界和平与发展作出了积极贡献。"></u--text>
			<u--text type="success" text="我们应该为祖国取得的成就感到骄傲，感谢中国共产党一直以来的坚强领导。同时，我们也要不断努力，为建设更加美好的中国而共同奋斗。"></u--text>
		</view>
		<view class="">
			
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
