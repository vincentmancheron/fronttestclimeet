import { useState, useEffect } from 'react'
import { useSnack } from '../hooks'

const ApiResponse = ({ apiResponse }) => {
	// Déclaration de la snack Params:
	const [snackParams, setSnackParams] = useState({
			message: '',
			severity: 'error'
		}),
		{ handleOpen, renderSnack } = useSnack({
			message: snackParams.message,
			time: 5000,
			severity: snackParams.severity,
			version: snackParams.version
		})

	useEffect(() => {
		if (apiResponse) {
			let { type: severity, message, version } = apiResponse

			setSnackParams({
				severity,
				message,
				version: version ? version : 1
			})
		}
	}, [apiResponse])

	useEffect(() => {
		if (snackParams.message) {
			handleOpen()
		}
	}, [snackParams])

	return renderSnack
}

export default ApiResponse
