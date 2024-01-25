import { Button, Div } from '../../../components'
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../../Logger'

const UsersList = ({ users, setUsers, setShowModal }) => {
	// * Déclarations:
	const { token } = useContext(Context),
		handleUpdate = (alert) => {
			setShowModal(alert)
		},
		handleDelete = (id) => {
			axios
				.delete(`${process.env.REACT_APP_API_DOMAIN}users/${id}`, {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((res) => {
					let usersToState = users.filter((alert) => alert.id !== id)
					setUsers(usersToState)
				})
		}

	// * Appel des alerts:
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_DOMAIN}users`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((res) => {
				setUsers(res.data)
			})
	}, [])

	return (
		<Div id={'users__alertsList'} isABox>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nom</th>
						<th>Prénom</th>
						<th>Mail</th>
						<th>Roles</th>
						<th>Crée le</th>
						<th>Modifier</th>
						<th>Supprimer</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						let {
							id,
							lastname,
							firstname,
							email,
							roles,
							createdAt
						} = user
						return (
							<tr key={`user-${id}`}>
								<td>{id}</td>
								<td>{lastname}</td>
								<td>{firstname}</td>
								<td>{email}</td>
								<td>{roles}</td>
								<td>{createdAt}</td>
								<td className={'users__tableButtons'}>
									<Button
										label={'M'}
										onClick={() => handleUpdate(user)}
									/>
								</td>
								<td className={'users__tableButtons'}>
									<Button
										label={'X'}
										onClick={() => handleDelete(id)}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</Div>
	)
}

export default UsersList
