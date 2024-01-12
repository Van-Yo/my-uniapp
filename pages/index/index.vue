<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">我爱我家</view>
		</view>
		<view class="content">
			<u-swiper  previousMargin="30"
                nextMargin="30" :list="bannerList" :height="bannerHeight" :circular="true"></u-swiper>
<!-- 			<u--text type="success" text="中国是一个拥有悠久历史和丰富文化的国家，而中国共产党一直致力于引领国家走向繁荣昌盛的道路。"></u--text>
			<u--text type="success" text="我国在过去几十年中取得了巨大的发展成就，从经济建设到科技创新，再到社会进步，都展现了中国共产党的领导和全体人民的努力。国家的稳定和繁荣是党的正确领导下的结果，同时也得益于广大人民群众的奋斗和支持。"></u--text>
			<u--text type="success" text="中国共产党一直以来注重人民的利益，致力于改善人民的生活水平，推动社会公正与和谐。在全球面临各种挑战的背景下，中国在国际事务中发挥着越来越重要的角色，为促进世界和平与发展作出了积极贡献。"></u--text>
			<u--text type="success" text="我们应该为祖国取得的成就感到骄傲，感谢中国共产党一直以来的坚强领导。同时，我们也要不断努力，为建设更加美好的中国而共同奋斗。"></u--text> -->
			<view class="title">
				<u--text text="今天" size="22" bold="true"></u--text>
			</view>
			<view class="today">
				<view class="pannel" @click="clickShowImg" :style="{height:pannelHeight+'px'}" id="pannel">
					<u--image :showLoading="true" width="100%"  mode="widthFix" radius="10" :src="oneDayEnglish.img"></u--image>
				</view>
				<view class="pannel weather" :class="weatherBg" @click="undateWeather" :style="{height:pannelHeight+'px'}">
					<view class="" style="margin-left: 10px;">
						<text>{{weatherCondition.city_name}}</text>
					</view>
					<view class="" style="display: flex;margin-left: 5px;">
						<!-- -->
						<text style="font-size: 40px;line-height: 34px;">{{weatherCondition.current_temperature}}</text>
						<view class="" style="display: flex;flex-direction: column;margin-left: 3px;">
							<text style="font-size: 30px;line-height: 24px;">°</text>
							<text style="line-height: 2px;">{{weatherCondition.current_condition}}</text>
						</view>
					</view>
					<view class="" style="margin-left: 10px;">
						<text>{{weatherCondition.low_temperature}}</text>/
						<text>{{weatherCondition.high_temperature}}</text>°C
					</view>
					<view class="w-icon">
						<u--image :showLoading="true" width="100%"  mode="widthFix" src="/static/home/rain.png" v-if="weatherCondition.current_condition.includes('雨')"></u--image>
						<u--image :showLoading="true" width="100%"  mode="widthFix" src="/static/home/sun.png" v-if="weatherCondition.current_condition.includes('晴')"></u--image>
						<u--image :showLoading="true" width="100%"  mode="widthFix" src="/static/home/blur.png" v-if="weatherCondition.current_condition.includes('阴')"></u--image>
						<u--image :showLoading="true" width="100%"  mode="widthFix" src="/static/home/snow.png" v-if="weatherCondition.current_condition.includes('雪')"></u--image>
					</view>
				</view>
				<view class="pannel" :style="{height:pannelHeight+'px'}">
					<u--image :showLoading="true" width="100%"  mode="widthFix"  radius="10" :src="oneDayEnglish.img"></u--image>
				</view>
			</view>
		</view>
		<u-overlay :show="showImg" @click="showImg = false">
			<view class="pop">
				<!-- <u--image :src="oneDayEnglish.img"  :showLoading="true"></u--image> -->
				<img :src="oneDayEnglish.img" alt="" class="image-set" mode="widthFix">
				<!-- <audio style="text-align: left" :src="oneDayEnglish.tts" :poster="oneDayEnglish.img" :name="oneDayEnglish.note" action="pause" controls></audio> -->
			</view>
		</u-overlay>
	</view>
</template>

<script>
import {getBanner,getOneDayEnglish,getweather,getlocation} from '@/api/home.js'
export default {
	data() {
		return {
			searchBarTop:0,
			searchBarHeight:0,
			bannerList: [],
			bannerHeight:200,
			oneDayEnglish:{},
			showImg:false,
			weatherCondition:{
				current_condition:''
			},
			pannelHeight:126,
			weatherBg:'sun'
		};
	},
	onLaunch(){
		// this.show = true
	},
	onLoad(){
		this.getHeight()
		this.getBanner()
		this.getOneDayEnglish()
		this.undateWeather()
	},
	methods: {
		// 获取微信右上角胶囊高度
		getHeight() {
			let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			console.log({menuButtonInfo});
			this.searchBarTop = menuButtonInfo.top;
			this.searchBarHeight = menuButtonInfo.height;
			console.log(wx.getSystemInfoSync().windowWidth);
			this.bannerHeight = 1080*wx.getSystemInfoSync().windowWidth/1920
			uni.createSelectorQuery().select('#pannel').boundingClientRect((res) => {
			  this.pannelHeight = res.width
			}).exec()
		},
		async getBanner(){
			let res = await getBanner()
			if(res.result.length){
				this.bannerList = res.result.map(item=>item.url)
			}
		},
		async getOneDayEnglish(){
			let res = await getOneDayEnglish()
			console.log(res.result);
			this.oneDayEnglish = res.result
		},
		clickShowImg(){
			this.showImg = true
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = this.oneDayEnglish.tts;
			innerAudioContext.onPlay(() => {
			  console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
			  console.log(res.errMsg);
			  console.log(res.errCode);
			});
		},
		async undateWeather(){
			wx.getFuzzyLocation({
			 type: 'wgs84',
			 success:async (res)=>{
				 console.log(res);
				   const latitude = res.latitude
				   const longitude = res.longitude
				   let res1 = await getlocation(longitude,latitude)
				   let city = res1.result.address_component.city
				   let res2 = await getweather(city)
				   console.log(res2);
				   this.weatherCondition = res2.result
				   if(this.weatherCondition.current_condition.includes('晴')){
					   this.weatherBg = 'sun'
				   }else if(this.weatherCondition.current_condition.includes('雨')){
					   this.weatherBg = 'rain'
				   }else if(this.weatherCondition.current_condition.includes('阴')){
					   this.weatherBg = 'blur'
				   }else if(this.weatherCondition.current_condition.includes('雪')){
					   this.weatherBg = 'snow'
				   }
			 }
			})
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
		.title{
			color: #000;
			font-size: 36rpx;
		}
	}
	.content{
		flex:1;
		background-color: rgb(247, 247, 250);
		overflow-y: auto;
		padding: 0 20rpx;
		.today{
			display: flex;
			margin: 0 -10rpx;
			.pannel{
				flex:1;
				margin:10rpx;
				overflow: hidden;
				border-radius: 10px;
			}
			.weather{
				color: #fff;
				// padding: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				position: relative;
				.w-icon{
					position: absolute;
					right: 5px;
					top: 5px;
					width:50px;
				}
			}
			.sun{
				background: #51B1FD;
			}
			.rain{
				background: #004B86;
			}
			.blur{
				background: #10BD7E;
			}
			.snow{
				background: #82C7E4;
			}
		}
		.title{
			margin: 30rpx 0 20rpx 5rpx;
		}
		
	}
	// ::v-deep .u-swiper{
	// 	height: auto !important;
	// }
	// ::v-deep .u-swiper__wrapper{
	// 	height: auto !important;
	// }
}
		.pop{
			width: 100%;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.image-set{
				width: 90%;
				// height: auto;
			}
		}
</style>
