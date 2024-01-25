import './Users.scss'
import { Div } from '../../components'
import { useState } from 'react'
import { CreateUser, UsersList } from './components'

const Users = () => {
	//* Déclarations:
	const [users, setUsers] = useState([]),
		[showModal, setShowModal] = useState(false)

	return (
		<Div id={'users'}>
			<CreateUser
				users={users}
				setUsers={setUsers}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
			<UsersList
				users={users}
				setUsers={setUsers}
				setShowModal={setShowModal}
			/>
		</Div>
	)
}

export default Users
