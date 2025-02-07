import ajax from '@/common/requset.js'

export function login(data) {
	return ajax({
		url: '/api/auth/login',
		method: 'post',
		data
	})
}
