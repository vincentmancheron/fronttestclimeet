import { useState, useContext, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Div, Form, Input, Select } from '../../../components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Context } from '../../../Logger'

const CreateAlert = ({ alerts, setAlerts, showModal, setShowModal }) => {
	// * Déclarations:
	const { token } = useContext(Context),
		[currentRate, setCurrentRate] = useState(1),
		handleClose = () => setShowModal(false),
		{
			control,
			handleSubmit,
			setValue,
			getValues,
			formState: { errors }
		} = useForm({
			mode: 'onChange',
			reValidateMode: 'onChange',
			shouldFocusError: true
		}),
		// ? Ici j'ai voulu utiliser l'ApiCoin pour récupérer tout les assets possibles,
		// ? mais ma limite de requête du au Free PLAN m'empeche d'emmener
		// ? le process a termes en faisant ca => Valeurs en dures.
		options = [
			{ value: 'USD', label: 'US Dollar' },
			{ value: 'BTC', label: 'Bitcoin' },
			{ value: 'ETH', label: 'Ethereum' },
			{ value: 'EUR', label: 'Euro' },
			{ value: 'JPY', label: 'Yen' },
			{ value: 'CHF', label: 'Swiss Franc' },
			{ value: 'GBP', label: 'Pound Sterling' },
			{ value: 'RUB', label: 'Rusian Ruble' }
		],
		handlePairChange = () => {
			// On récupère le rate entre les deux assets pour l'afficher et parametrer les inputs:
			let { pair1, pair2 } = getValues()
			if (pair1 && pair2) {
				if (pair1 === pair2) {
					setCurrentRate(1)
				} else {
					axios
						.get(
							`https://rest.coinapi.io/v1/exchangerate/${pair1.value}/${pair2.value}`,
							{
								headers: {
									Authorization:
										process.env.REACT_APP_COINAPIIO_KEY
								}
							}
						)
						.then((res) => {
							let { rate } = res.data
							setCurrentRate(rate)
							setValue('min', rate * 0.95)
							setValue('max', rate * 1.05)
						})
				}
			}
		},
		// Sauvegarde en BDD:
		onSubmit = (data) => {
			// On vérifie qu'au moins un des deux inputs est remplie:
			let { min, max, pair1, pair2 } = data,
				{ value: value1, label: label1 } = pair1,
				{ value: value2, label: label2 } = pair2
			if (min || max) {
				let body = {
					min: parseFloat(min),
					max: parseFloat(max),
					deviseBase: label1,
					idBase: value1,
					deviseDiv: label2,
					idDiv: value2
				}

				// Gestion de l'update:
				if (typeof showModal !== 'object') {
					axios
						.post(
							process.env.REACT_APP_API_DOMAIN + `alerts`,
							JSON.stringify(body),
							{ headers: { Authorization: 'Bearer ' + token } }
						)
						.then((res) => {
							setAlerts([...alerts, res.data])
						})
				} else {
					axios
						.put(
							`${process.env.REACT_APP_API_DOMAIN}alerts/${showModal.id}`,
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
			let { deviseBase, idBase, deviseDiv, idDiv, min, max } = showModal
			setValue('pair1', { value: idBase, label: deviseBase })
			setValue('pair2', { value: idDiv, label: deviseDiv })
			setValue('min', min)
			setValue('max', max)
		}
	}, [showModal])

	return (
		<Div>
			<Button
				label={'Créer une alerte'}
				onClick={() => setShowModal(true)}
			/>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Créer une alerte</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Div className={'justify-around'}>
							<Select
								control={control}
								name={'pair1'}
								data={options}
								placeholder={'Pair n°1'}
								additionnalOnChange={handlePairChange}
							/>

							<Select
								control={control}
								name={'pair2'}
								data={options}
								placeholder={'Pair n°2'}
								additionnalOnChange={handlePairChange}
							/>
						</Div>

						<Div className={'justify-center my-4'}>
							CurrentRate: {currentRate}
						</Div>

						<Div className={'justify-around'}>
							<Input
								control={control}
								name={'min'}
								placeholder={'Minimum'}
							/>
							<Input
								control={control}
								name={'max'}
								placeholder={'Maximum'}
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
					<Button label={'Annuler'} onClick={handleClose} />
				</Modal.Footer>
			</Modal>
		</Div>
	)
}

export default CreateAlert
