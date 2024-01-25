// import axios from 'axios'
// import { useEffect, useRef } from 'react'
import { Div } from '../../components'
import { AlertsList, Charts, CreateAlert } from './components'
import './Home.scss'
import { useState } from 'react'

const Home = () => {
	//* Déclarations:
	const [alerts, setAlerts] = useState([]),
		[showModal, setShowModal] = useState(false)

	return (
		<Div id={'home'}>
			<CreateAlert
				alerts={alerts}
				setAlerts={setAlerts}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
			<AlertsList
				alerts={alerts}
				setAlerts={setAlerts}
				setShowModal={setShowModal}
			/>
			{/* // ! J'ai tenté de faire des charts pour une paire d'assets selectionné,
			// ! Cependant la limitation du FreePlan CoinAPI m'en empêche. */}
			<Div isABox>Charts en cours de développement{/* <Charts /> */}</Div>
		</Div>
	)
}

export default Home
