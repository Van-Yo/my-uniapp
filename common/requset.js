import ajax from 'uni-ajax'
//配置文档：https://uniajax.ponjs.com/instance/create.html
const instance = ajax.create({
	// baseURL: 'http://218.94.141.148:40001/app/',
	timeout: 10000
})

// //请求拦截
// instance.interceptors.request.use(
// 	config => {
// 		const token = uni.getStorageSync('token')
// 		// console.log(token)
// 		// console.log(config)
// 		if (token) {
// 			config.header['MobileAuth'] = token
// 		}
// 		return config
// 	},
// 	error => {
// 		return Promise.reject(Error)
// 	}
// )

// //响应拦截
// instance.interceptors.response.use(
// 	response => {
// 		const { statusCode, data } = response
// 		if (statusCode === 200) {
// 			return data
// 		} else {
// 			uni.showToast({
// 				title: '请求出错了',
// 				icon: 'none',
// 				duration: 1500,
// 				position: 'top'
// 			})
// 		}
// 	},
// 	error => {
// 		return Promise.reject(error)
// 	}
// )

export default instance
