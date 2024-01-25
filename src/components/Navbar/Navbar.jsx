import { Div, Img } from '../../components'
import { useNavigate } from 'react-router-dom'
import { logoC, logoClimeet } from '../../assets'
import './Navbar.scss'
import { profile } from '../../assets'
import { Dropdown } from 'react-bootstrap'
import { useContext } from 'react'
import { Context } from '../../Logger'

const Navbar = () => {
	//* Déclarations:
	const navigate = useNavigate(),
		{ roles } = useContext(Context),
		disconnect = () => {
			localStorage.clear()
			// localStorage.removeItem('REACT_AUTH_TOKEN')
			window.location.reload(false)
		}

	return (
		<nav class="navbar navbar-dark bg-dark">
			<Img
				id={'navbar__backLogo'}
				src={logoC}
				alt={'Accueil'}
				onClick={() => navigate('/')}
			/>
			<a id={'navbar__mainLogo'} href="climeet.events" target="_blank">
				<Img
					src={logoClimeet}
					alt={'Accueil'}
					onClick={() => navigate('/')}
				/>
			</a>
			<Dropdown>
				<Dropdown.Toggle variant="light" id="dropdown-basic">
					<Img src={profile} alt={'Profil'} />
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{roles.includes('ROLE_ADMIN') && (
						<Dropdown.Item onClick={() => navigate('/users')}>
							Liste des utilisateurs
						</Dropdown.Item>
					)}
					<Dropdown.Item onClick={disconnect}>
						Déconnexion
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</nav>
	)
}

export default Navbar
