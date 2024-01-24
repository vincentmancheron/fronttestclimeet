import './Loader.scss'
import { Div, Img } from '../../components'
import { logoC, logoClimeet } from '../../assets'

const Loader = () => {
	return (
		<Div id={'loader'}>
			<Div id={'loader--fullScreen'}>
				<Img src={logoClimeet} alt={'Climeet'} />
				<Img id={'loader__spinner'} src={logoC} alt={'Chargement..'} />
			</Div>
		</Div>
	)
}

export default Loader
