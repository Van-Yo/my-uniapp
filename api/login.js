import ajax from '@/common/requset.js'

export function login(data) {
	return ajax({
		url: '/login',
		method: 'post',
		data
	})
}
