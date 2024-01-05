<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">center</view>
		</view>
		<view class="content">
			<u-button @click="openAuth()">模拟后端消息推送</u-button>
			<u-toast ref="uToast"></u-toast>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchBarTop:0,
			searchBarHeight:0,
			tmplIds:['rcZXYCCbrJBK0Z338-Zq_VhUPhAuj8wWC7I67CZ8wNY'],
			AppId: 'wx0d58ca03bfd79468',
			apst: '32df029374adad35a34eaa3c8521ac45',
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
