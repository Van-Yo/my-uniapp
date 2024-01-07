<template>
	<view class="home-container">
		<view class="head" :style="{paddingTop:searchBarTop + 'px',height:searchBarHeight + 'px'}">
			<view class="title">丰功伟绩</view>
		</view>
		<view class="content">
			<u-button @click="sendMsg()">模拟后端消息推送</u-button>
			<u-button @click="logout()">注销推出</u-button>
			<u--text type="success" text="中国共产党是中国人民的先锋队和领导核心，其成立至今已经走过了漫长的历程。在建党百年的光辉历程中，中国共产党铭记初心使命，勇于创新，为中国人民和中华民族取得了丰功伟绩。"></u--text>
			<u--text type="success" text="党的成立标志着中国历史的新纪元。在长期的革命斗争中，中国共产党带领人民取得了反帝反封建的胜利，实现了国家的独立和人民的解放，结束了中国长期的半殖民地半封建社会的命运，开启了中国发展的新纪元。"></u--text>
			<u--text type="success" text="改革开放以来，中国共产党带领全国人民迎来了巨大的经济发展和社会进步。中国经济持续增长，成为全球增长的重要引擎，人民生活水平显著提高，教育、医疗、社会保障等各项事业不断改善，脱贫攻坚取得历史性成就，为世界减贫事业作出了巨大贡献。"></u--text>
			<u--text type="success" text="党的领导力也在国际舞台上得到广泛认可。中国积极参与国际合作，提出“一带一路”倡议，推动构建人类命运共同体，为全球和平与发展作出了重要贡献。"></u--text>
			<u--text type="success" text="中国共产党百年奋斗历程充满艰辛和荣耀，其丰功伟绩激励着全国各族人民不忘初心、牢记使命，为实现中华民族伟大复兴的中国梦而努力奋斗。愿党和国家在新的历史征程中继续砥砺前行，为建设富强民主文明和谐美丽的社会主义现代化强国而不懈努力。"></u--text>
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
		};
	},
	onLoad(){
		this.getHeight()
	},
	methods: {
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
