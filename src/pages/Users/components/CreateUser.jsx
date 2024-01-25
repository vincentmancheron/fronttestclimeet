import { useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Div, Form, Input, Select } from '../../../components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Context } from '../../../Logger'

const CreateAlert = ({ users, setUsers, showModal, setShowModal }) => {
	// * Déclarations:
	const { token } = useContext(Context),
		handleClose = () => setShowModal(false),
		{
			control,
			handleSubmit,
			setValue,
			formState: { errors }
		} = useForm({
			mode: 'onChange',
			reValidateMode: 'onChange',
			shouldFocusError: true
		}),
		// Sauvegarde en BDD:
		onSubmit = (data) => {
			// On vérifie qu'au moins un des deux inputs est remplie:
			let { lastname, firstname, email, roles } = data
			if (lastname && firstname && email) {
				let body = { ...data, roles: roles.value }
				// Gestion de l'update:
				if (typeof showModal !== 'object') {
					axios
						.post(
							process.env.REACT_APP_API_DOMAIN + `users`,
							JSON.stringify(body),
							{ headers: { Authorization: 'Bearer ' + token } }
						)
						.then((res) => {
							setUsers([...users, res.data])
						})
				} else {
					axios
						.put(
							`${process.env.REACT_APP_API_DOMAIN}users/${showModal.id}`,
							JSON.stringify(body),
							{ headers: { Authorization: 'Bearer ' + token } }
						)
						.then((res) => {
							// ! On doit ici gérer la mise a jour de la liste front:
							window.location.reload()
						})
				}
			}
		}

	// * Gestion de l'update avant soumission:
	useEffect(() => {
		if (typeof showModal === 'object') {
			let { lastname, firstname, email, roles } = showModal
			setValue('lastname', lastname)
			setValue('firstname', firstname)
			setValue('email', email)
			setValue('roles', roles)
		}
	}, [showModal])

	return (
		<Div>
			<Button
				label={'Créer un utilisateur'}
				onClick={() => setShowModal(true)}
			/>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Créer un utilisateur</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Div className={'justify-around'}>
							<Input
								control={control}
								name={'lastname'}
								label={'Nom de Famille'}
							/>
							<Input
								control={control}
								name={'firstname'}
								label={'Prénom'}
							/>
						</Div>
						<Div className={'justify-around my-3'}>
							<Input
								control={control}
								name={'email'}
								label={'Email'}
							/>
							<Input
								control={control}
								type={'password'}
								name={'password'}
								label={'Mot de passe'}
							/>
						</Div>

						<Div className={'justify-around'}>
							<Select
								control={control}
								name={'roles'}
								data={[
									{
										value: ['ROLE_USER'],
										label: 'Utilisateur'
									},
									{
										value: ['ROLE_ADMIN'],
										label: 'Administrateur'
									}
								]}
								placeholder={'Rôle'}
							/>
							<Button
								type={'submit'}
								label={
									typeof showModal !== 'object'
										? 'Créer'
										: 'Modifier'
								}
							/>
						</Div>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button label={'Fermer'} onClick={handleClose} />
				</Modal.Footer>
			</Modal>
		</Div>
	)
}

export default CreateAlert
