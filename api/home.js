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
