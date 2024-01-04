import ajax from '@/common/requset.js'

// 喵喵
export function getImg() {
	return ajax({
		url: 'https://api.thecatapi.com/v1/images/search?limit=21',
		method: 'get'
	})
}

// 狗子
export function getDog() {
	return ajax({
		url: 'https://dog.ceo/api/breeds/image/random/21',
		method: 'get'
	})
}