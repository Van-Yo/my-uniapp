import { RouterMount, createRouter } from 'uni-simple-router';
 
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
let appOnLaunch = 0
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	const token = uni.getStorageSync('token')
	appOnLaunch++
	//权限控制登录
	if(token){
		//第一次进系统
		if(appOnLaunch===1){
			uni.showToast({
				title:"欢迎回来",
				icon:"none",
				position:"top"
			})
		}
		if(to.path==="/pages/login/login"){
			next({ path: '/pages/index/index',NAVTYPE:'replace' })
		}else{
			next()
		}
	}else{
		if (to.path === '/pages/login/login') {
			next()
		} else {
			uni.showToast({
				title: '登录过期',
				icon: 'none',
				duration: 1500,
				complete: () => {
					next({ path: '/pages/login/login',NAVTYPE:'replace' })
				}
			})
		}
	}
	
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	// console.log('跳转结束')
})
 
export {
	router,
	RouterMount
}