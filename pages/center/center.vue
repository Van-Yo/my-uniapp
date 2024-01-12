<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">个人中心</view>
		</view>
		<view class="person-info">
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			  <image class="avatar" :src="avatarUrl"></image>
			</button> 
			<input type="nickname" v-model="nickname" class="weui-input" placeholder="请输入昵称" @blur="blur" @input="inputChange"/>
		</view>
		<view class="content">
			<!-- 只能开发版使用，因为https://api.weixin.qq.com无法添加到合法域名 -->
			<u-button @click="openAuth()">模拟后端消息推送</u-button>
			<u-button @click="logout()">注销推出</u-button>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
import {getApst,getAppid} from '../../api/home.js'
export default {
	data() {
		return {
			searchBarTop:0,
			searchBarHeight:0,
			tmplIds:['rcZXYCCbrJBK0Z338-Zq_VhUPhAuj8wWC7I67CZ8wNY'],
			AppId: '',
			apst: '',
			avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
			nickname:''
		};
	},
	onLoad(){
		this.getHeight()
		this.getUserInfo()
	},
	methods: {
		blur(e){
			uni.setStorageSync('nickname',e.detail.value)
		},
		inputChange(e){
			uni.setStorageSync('nickname',e.detail.value)
		},
		getUserInfo(){
			if(uni.getStorageSync('avatarUrl')){
				this.avatarUrl = uni.getStorageSync('avatarUrl')
			}
			if(uni.getStorageSync('nickname')){
				this.nickname = uni.getStorageSync('nickname')
			}
		},
		onChooseAvatar(e) {
		    const { avatarUrl } = e.detail
			console.log(avatarUrl);
			this.avatarUrl = avatarUrl
			uni.setStorageSync('avatarUrl',avatarUrl)
		},
		logout(){
			uni.clearStorageSync('token')
			uni.redirectTo({
				url: '/pages/login/login'
			})
		},
		async getApst(){
			let res = await getApst()
			this.apst = res.apst
		},
		async getAppid(){
			let res = await getAppid()
			this.AppId = res.appid
		},
		// 获取微信右上角胶囊高度
		getHeight() {
			let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
			console.log({menuButtonInfo});
			this.searchBarTop = menuButtonInfo.top;
			this.searchBarHeight = menuButtonInfo.height;
		},
		// 必须要有一个按钮或者点击事件来触发uni.requestSubscribeMessage，不能放在生命周期函数里面
		openAuth() {
		     uni.requestSubscribeMessage({
		         tmplIds: this.tmplIds,
		         success: (res) => {
		             this.sendMsg()
		         }
		     })
		 },
		getJsCode() {
		     return new Promise((resolve, reject) => {
		         uni.login({
		             success(res) {
		                 resolve(res.code)
		             },
		             fail: (err) => {
		                 reject(err)
		             }
		         })
		     })
		 },
		 getOpenId(js_code) {
		     return new Promise((resolve, reject) => {
		         uni.request({
		             url: `https://api.weixin.qq.com/sns/jscode2session`,
		             data: {
		                 appid: this.AppId,
		                 secret: this.apst,
		                 js_code: js_code,
		                 grant_type: 'authorization_code'
		             },
		             success: (res) => {
		                 resolve(res.data.openid)
		             },
		             fail(err) {
		                 reject(err)
		             }
		         })
		     })
		 },
		// 获取access_token
		 getAccessToken() {
		     return new Promise((resolve, reject) => {
		         uni.request({
		             url: 'https://api.weixin.qq.com/cgi-bin/token',
		             data: {
		                 appid: this.AppId,
		                 secret: this.apst,
		                 grant_type: 'client_credential'
		             },
		             success: (res) => {
						console.log('access_token',res.data.access_token);
		                resolve(res.data.access_token)
		             },
		             fail: (err) => {
		                 reject(err)
		             }
		         })
		     })
		 },
		async sendMsg(){
		     const js_code = await this.getJsCode(); // => js_code:  0f1Dc7100yXgJQ1X16400ZX4Jw2Dc71L
		     const openid = await this.getOpenId(js_code); // => openid:  owHoB4wFGk6CmPF1uZ5Mwq5quj8A
			await this.getApst()
			await this.getAppid()
		     const access_token = await this.getAccessToken();
		     uni.request({
		         url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' +
		         access_token,
		         method: 'POST',
		         data: {
		             touser: openid,
		             template_id: this.tmplIds[0], // 第一个模板id
		             page: "pages/index/index",    // 点击消息卡片跳转地址
		             data: {
						thing6:{
							value:'第2023116期'
						},
		                 date5: {
		                     value: '2023-9-18 18:18:44'
		                 },
		                 thing9: {
		                     value: '双色球'
		                 },
		                 thing22: {
		                     value: '未中奖'
		                 }
		             }
		         },
		         success: (res) => {
		            console.log(res);
					this.$refs.uToast.show({
						type: 'success',
						title: '',
						message: "已推送消息",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
					})
		         },
				fail: (err) => {
					console.log(err);
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						title: '',
						message: "推送消息失败",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
					})
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
	}
	.person-info{
		display: flex;
		justify-content: flex-start;
		padding: 40rpx;
		.avatar-wrapper{
			width: 120rpx;
			height: 120rpx;
			padding: 0;
			overflow: hidden;
			margin: 0;
			margin-right: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
}

</style>
