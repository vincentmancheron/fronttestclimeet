import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import App from './App'
import { Connect } from './pages'
import { jwtDecode } from 'jwt-decode'
import { Loader } from './components'
import { checkBearer } from './services'

// * Déclaration du context:
export const Context = createContext({
	userInfos: {}
})

export const Logger = () => {
	// * Déclarations:
	const [isConnected, setConnexion] = useState(false),
		[userInfos, setUserInfos] = useState({}),
		[checked, setChecked] = useState(false),
		[apiResponse, setApiResponse] = useState()

	// * Content-Type Axios:
	axios.defaults.headers.common = {
		'Content-Type': 'application/json'
	}

	// * Check du Bearer:
	useEffect(() => {
		if (!checked) {
			let storedToken = localStorage.getItem(
				'REACT_TOKEN_AUTH_TEST_CLIMEET'
			)
			if (!storedToken) {
				setChecked(true)
			} else {
				// On ajoute le token de l'App:
				let token = JSON.parse(storedToken)
				axios.defaults.headers.common = {
					Authorization: 'bearer ' + token
				}

				// ! ainsi que la key CoinIo:
				// axios.defaults.headers.common['X-CoinAPI-Key'] =
				// 	process.env.REACT_APP_COINAPIIO_KEY

				checkBearer().then(() => {
					setConnexion(true)
					setUserInfos({ ...jwtDecode(token).user, token })
					setChecked(true)
				})
			}
		}
	}, [checked])

	// * Intercepteur Axios:
	axios.interceptors.response.use(
		(response) => {
			let { status_code, message, messageMustBeShown } = response.data
			if (messageMustBeShown) {
				setApiResponse({
					type: [200, 201].includes(status_code)
						? 'success'
						: 'warning',
					message
				})
			}
			return response
		},
		(error) => {
			if (process.env.ENVIRONMENT === 'DEV') {
				console.error(error)
			}

			if (error.response) {
				let { data, status } = error.response
				if (status !== 401) {
					console.log(error.response)
					let { message } = data
					setApiResponse({ type: 'error', message })
				} else {
					localStorage.clear()
					window.location.reload(false)
				}
			} else {
				setApiResponse({ type: 'error', message: 'Erreur !' })
			}

			throw error
		}
	)

	// * Rendus:
	if (!checked) {
		return <Loader />
	} else if (!isConnected) {
		return <Connect apiResponse={apiResponse} />
	} else {
		return (
			<Context.Provider value={userInfos}>
				<App
					apiResponse={apiResponse}
					setApiResponse={setApiResponse}
				/>
			</Context.Provider>
		)
	}
}
