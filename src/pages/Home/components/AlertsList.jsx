import { Button, Div } from '../../../components'
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../../Logger'

const AlertsList = ({ alerts, setAlerts, setShowModal }) => {
	// * Déclarations:
	const { token } = useContext(Context),
		handleUpdate = (alert) => {
			setShowModal(alert)
		},
		handleDelete = (id) => {
			axios
				.delete(`${process.env.REACT_APP_API_DOMAIN}alerts/${id}`, {
					headers: { Authorization: `Bearer ${token}` }
				})
				.then((res) => {
					let alertsToState = alerts.filter(
						(alert) => alert.id !== id
					)
					setAlerts(alertsToState)
				})
		}

	// * Appel des alerts:
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_DOMAIN}alerts`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then((res) => {
				setAlerts(res.data)
			})
	}, [])

	return (
		<Div id={'home__alertsList'} isABox>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>Base</th>
						<th colSpan={2}>Div</th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
					<tr>
						<th>Id</th>
						<th>Devise</th>
						<th>Id</th>
						<th>Devise</th>
						<th>Min</th>
						<th>Max</th>
						<th>Modifier</th>
						<th>Supprimer</th>
					</tr>
				</thead>
				<tbody>
					{alerts.map((alert) => {
						console.log(alert)
						let {
							id,
							idBase,
							deviseBase,
							idDiv,
							deviseDiv,
							min,
							max
						} = alert
						return (
							<tr key={`alert-${id}`}>
								<td>{idBase}</td>
								<td>{deviseBase}</td>
								<td>{idDiv}</td>
								<td>{deviseDiv}</td>
								<td>{min.toFixed(2)}</td>
								<td>{max.toFixed(2)}</td>
								<td className={'home__tableButtons'}>
									<Button
										label={'M'}
										onClick={() => handleUpdate(alert)}
									/>
								</td>
								<td className={'home__tableButtons'}>
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

export default AlertsList
