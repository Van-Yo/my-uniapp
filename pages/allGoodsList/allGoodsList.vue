<template>
	<view class="goods-container">
		<u-navbar title="全部书单" @leftClick="leftClick" :autoBack="true">
		</u-navbar>
		<view class="u-page">
			<u-sticky>
				<u-search v-model="loadDataParams.title" :showAction="false" @search="searchByTitle"></u-search>
			</u-sticky>
			<u-list @scrolltolower="scrolltolower">
				<u-row customStyle="margin-bottom: 10px;width: 100%;flex-flow: wrap;">
					<u-col span="6" v-for="(item,index) in goodsList" :key="index">
						<Goods :goodsInfo="item"></Goods>
					</u-col>
				</u-row>
			</u-list>
		</view>
		<u-loading-page :loading="loading" :loading-text="loadingText" bg-color="rgba(232,232,232,0.3)" color="#333"
			loading-mode="spinner"></u-loading-page>
	</view>
</template>

<script>
	import {
		Goods
	} from '@/components/goods/goods.vue';
	import {
		getGoods
	} from '@/api/home.js';
	export default {
		components: {
			Goods
		},
		data() {
			return {
				goodsList: [],
				loadDataParams: {
					page: 1,
					title: ''
				},
				loading: true,
				loadingText: ''
			};
		},
		onLoad() {
			this.loadmore();
		},
		methods: {
			// 返回上一页
			leftClick() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 上拉列表获取下一页数据
			scrolltolower() {
				this.loadDataParams.page++
				this.loadmore();
			},
			async loadmore() {
				let res = await this.getGoods(this.loadDataParams)
				this.goodsList = this.goodsList.concat(res)
			},
			async searchByTitle() {
				this.goodsList = []
				this.loadDataParams.page = 1
				let res = await this.getGoods(this.loadDataParams)
				this.goodsList = res
			},
			async getGoods(params) {
				this.loading = true
				let res = await getGoods(params);
				this.loading = false
				return res.goods.data
			}
		}
	}
</script>

<style lang="scss">
	.goods-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.u-page {
		background: #f7f7fa;
		padding: 10rpx;
		overflow: auto;
	}
</style>