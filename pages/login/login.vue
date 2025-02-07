<template>
  <view class="login-container">
    <view class="" style="width: 70%;">
		<u--form :model="loginForm"
				:rules="loginrules"
				ref="loginuForm">
			<view class="logo">
				<u-avatar src="/static/login/basicprofile.png" size="80"></u-avatar>
			</view>
			<view class="input">
				<u-form-item prop="email">
					<u--input  border="bottom" v-model="loginForm.email" clearable placeholder="请输入邮箱"></u--input>
				</u-form-item>
			</view>
			<view class="input">
				<u-form-item prop="password">
					<u--input  border="bottom" v-model="loginForm.password" clearable placeholder="请输入密码"></u--input>
				</u-form-item>
			</view>
			<u-button @click="login" type="primary">登录</u-button>
		</u--form>
    </view>
  </view>
</template>

<script>
import {login} from '@/api/login.js'
export default {
  data() {
    return {
		loginForm:{
			email: '',
			password: ''
		},
		loginrules:{
			email: {
				type: 'string',
				required: true,
				message: '请填写邮箱',
				trigger: ['blur', 'change']
			},
			password: {
				type: 'string',
				required: true,
				message: '请填写密码',
				trigger: ['blur', 'change']
			}
		}
    };
  },
  onLoad(){
	  const {type} = this.$Route.query
	  console.log(type)
	  if(type === 'noToken'){
		  uni.showToast({
		  	title: '请先登录',
		  	icon: 'none',
		  	duration: 1500
		  })
	  }
  },
  methods: {
    async login() {
	  this.$refs.loginuForm.validate().then(async res => {
			// 第一步：获取code是用户登录凭证
			// const code = await this.getWxCode()
			// console.log(code)
			
			// 第二步：调取后端给的绑定查询接口，查看该用户是否绑定或者其他逻辑
			
			// 第三步：如果没有绑定，则登录进行绑定
			try{
				let loginRes = await login(this.loginForm)
				uni.setStorageSync('token', loginRes.access_token)
				uni.showToast({
					title: '登录成功',
					icon: 'none',
					duration: 1000,
				})
				setTimeout(()=>{
					uni.switchTab({
						url: '/pages/index/index'
					})
				},1000)
			}catch(e){
				uni.$u.toast(e.data.message)
				// this.$refs.uToast.show({
				//           type: "error",
				//           icon: false,
				//           title: "失败主题",
				//           message: "一弦一柱思华年"
				//         });
			}
	  }).catch(errors => {
	  		// uni.$u.toast('校验失败')
	  })
    },
	// 获取code是用户登录凭证
	getWxCode(){
		return new Promise((resolve, reject) => {
			wx.login({
			  success: res => {
				//获取code
				resolve(res.code)
			  }
			})
		})
	}
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}

.logo {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  // width: 400rpx;
  // height: 400rpx;
  .pic{
	  width: 100%;
	  height: 100%;
  }
}

.input {
  width: 100%;
  margin-bottom: 15px;
  ::v-deep .u-input{
	  border-bottom: 1px solid #efefef;
  }
}

/* 根据需要添加样式 */
</style>
