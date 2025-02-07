<template>
	<view class="home-container">
		<view class="head" :style="{ paddingTop: searchBarTop + 'px', height: searchBarHeight + 'px' }">
			<view class="title">黄金屋</view>
		</view>
		<view class="content">
			<view class="add-bg"></view>
			<u-swiper previousMargin="30" nextMargin="30" :list="bannerList" :height="bannerHeight"
				:circular="true"></u-swiper>
			<view class="add-bg"></view>
			<view class="title">
				<u--text text="热卖书单" size="22"></u--text>
				<u--text align="right" text="更多" size="16" @click="goto('allGoodsList')"></u--text>
			</view>
			<view class="today">
				<u-row customStyle="margin-bottom: 10px;width: 100%;flex-flow: wrap;">
					<u-col span="6" v-for="(item,index) in goodsList" :key="index">
						<Goods :goodsInfo="item"></Goods>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanner,
		getlocation
	} from '@/api/home.js';
	import {Goods} from '@/components/goods/goods.vue'
	export default {
		data() {
			return {
				searchBarTop: 0,
				searchBarHeight: 0,
				bannerList: [],
				bannerHeight: 200,
				goodsList: []
			};
		},
		components:{Goods},
		onLaunch() {
		},
		onLoad() {
			this.getHeight();
			this.getBanner()
		},
		methods: {
			// 获取微信右上角胶囊高度
			getHeight() {
				let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
				this.searchBarTop = menuButtonInfo.top;
				this.searchBarHeight = menuButtonInfo.height;
				this.bannerHeight = (1080 * wx.getSystemInfoSync().windowWidth) / 1920;
			},
			async getBanner() {
				let res = await getBanner();
				// slides轮播图
				this.bannerList = res.slides.map(item => item.img_url)
				// goods 列表
				this.goodsList = res.goods.data
			},
			// 跳转详情页
			goto(page) {
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.home-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100vh;

		.head {
			// height CSS 属性指定了一个元素的高度。默认情况下，这个属性决定的是内容区（ content area）的高度，
			// 但是，如果将 box-sizing 设置为 border-box , 这个属性决定的将是边框区域（border area）的高度。
			// 全局设置了border-box，并且头部用了height，所以这边用content-box
			box-sizing: content-box !important;
			display: flex;
			justify-content: center;
			align-items: center;
			height: auto;
			background-color: lightyellow;
			// border-bottom: 1px solid rgb(239, 239, 241);
			padding: 10rpx 0;

			.title {
				color: #000;
				font-size: 36rpx;
			}
		}

		.content {
			flex: 1;
			background-color: rgb(247, 247, 250);
			overflow-y: auto;
			padding: 0 20rpx;
			.title {
				display: flex;
				justify-content: space-between;
			}
			::v-deep .u-swiper {
				background: lightyellow !important;
				margin: 0 -20rpx;
				// padding: 20rpx 0 30rpx;
			}

			.add-bg {
				height: 20rpx;
				background: lightyellow;
				margin: 0 -20rpx;
			}

			.today {
				display: flex;
				margin: 0 -10rpx;

				.pannel {
					flex: 1;
					margin: 10rpx;
					overflow: hidden;
					border-radius: 10px;
					background: #fff;
					padding-bottom: 10rpx;

					.goods-title {
						padding-left: 10rpx;
						margin-bottom: 20rpx;
					}

					.price-sales {
						padding-left: 20rpx;
						color: red;

						.sales {
							color: #909090;
							font-size: 20rpx;
							margin-left: 15rpx;
						}
					}
				}

				.weather {
					color: #fff;
					// padding: 15rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					position: relative;

					.w-icon {
						position: absolute;
						right: 5px;
						top: 5px;
						width: 50px;
					}
				}

				.sun {
					background: #51b1fd;
				}

				.rain {
					background: #004b86;
				}

				.blur {
					background: #10bd7e;
				}

				.snow {
					background: #82c7e4;
				}
			}

			.title {
				margin: 30rpx 0 20rpx 5rpx;
			}
		}
	}

	.pop {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.image-set {
			width: 90%;
			// height: auto;
		}
	}
</style>