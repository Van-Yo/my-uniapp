<template>
	<view class="pannel">
		<u--image :showLoading="true" width="100%" mode="widthFix" radius="10" :src="goodsInfo.cover_url"></u--image>
		<text class="goods-title">{{goodsInfo.title}}</text>
		<p class="price-sales">￥{{goodsInfo.price}}<text class="sales">已售{{goodsInfo.sales}}</text></p>
	</view>
</template>

<script>
	export default {
		name: "goods",
		props:{
			goodsInfo:{
				cover_url:'',
				title:'',
				price:'',
				sales:''
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
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
</style>