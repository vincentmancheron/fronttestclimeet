import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const SlideTransition = (props) => {
	return <Slide {...props} direction="up" />
}

const useSnack = ({ message, time, severity, version }) => {
	const [visible, setVisible] = React.useState(false)

	const handleOpen = React.useCallback(() => {
			setVisible(true)
		}, []),
		handleClose = React.useCallback(() => {
			setVisible(false)
		}, [])

	const renderSnack = (
		<Snackbar
			open={visible}
			onClose={handleClose}
			autoHideDuration={version === 1 ? time : null}
			TransitionComponent={SlideTransition}
			key={Slide.name}
			anchorOrigin={
				version !== 2
					? { vertical: 'bottom', horizontal: 'left' }
					: { vertical: 'top', horizontal: 'center' }
			}
			sx={version === 2 ? { marginTop: window.innerHeight * 0.01 } : null}
		>
			<Alert
				onClose={handleClose}
				severity={severity}
				className={version === 2 ? 'justify-align-center' : null}
				sx={
					version === 1
						? { width: '100%' }
						: {
								width: window.innerWidth * 0.8,
								height: window.innerHeight * 0.8,
								fontSize: '10em'
						  }
				}
			>
				{message}
			</Alert>
		</Snackbar>
	)

	return { handleOpen, handleClose, renderSnack }
}

useSnack.propsTypes = {
	message: PropTypes.string,
	time: PropTypes.number,
	severity: PropTypes.string
}

useSnack.defaultValue = {
	message: 'I love snacks!',
	time: 6000,
	severity: 'info'
}

export default useSnack
