import axios from 'axios'
const env = process.env.REACT_APP_API_DOMAIN,
	url = `${env}users/`

const authenticateUser = async (data) => {
	return axios.post(`${env}login_check`, JSON.stringify(data)).then((res) => {
		let { data, status } = res
		if (status === 200) {
			localStorage.setItem(
				'REACT_TOKEN_AUTH_TEST_CLIMEET',
				JSON.stringify(data.token)
			)
			window.location.reload(false)
		}
	})
}

const checkBearer = async () => {
	return axios.get(`${env}checkBearer`).then((res) => {
		return res.data
	})
}

export { authenticateUser, checkBearer }
