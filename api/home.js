import ajax from '@/common/requset.js'

export function getApst() {
	return ajax({
		url: '/getApst',
		method: 'get'
	})
}

export function getAppid() {
	return ajax({
		url: '/getAppid',
		method: 'get'
	})
}

// 获取banner
export function getBanner() {
	return ajax({
		url: '/api/index',
		method: 'get'
	})
}

// 商品列表
export function getGoods(params) {
	return ajax({
		url: '/api/goods',
		method: 'get',
		params
	})
}


// 每日一句
export function getOneDayEnglish() {
	return ajax({
		// url: 'https://api.oioweb.cn/api/common/OneDayEnglish',
		url: 'https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json',
		method: 'get'
	})
}

// 获取天气
export function getweather(city) {
	return ajax({
		// url: 'https://api.oioweb.cn/api/weather/weather?city_name='+city,
		url:'https://aider.meizu.com/app/weather/listWeather?cityIds='+city,
		method: 'get'
	})
}

// 经纬度查询
export function getlocation(lng,lat) {
	return ajax({
		url: 'https://api.oioweb.cn/api/ip/geocoder?lng='+lng+'&lat='+lat,
		method: 'get',
	})
}

// 历史上的今天
export function getHistory() {
	return ajax({
		url: 'https://api.oioweb.cn/api/common/history',
		method: 'get'
	})
}