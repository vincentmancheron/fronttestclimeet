import './Connect.scss'
import { Button, Div, Form, Img, Input } from '../../components'
import { ApiResponse } from '../../components'
import { useForm } from 'react-hook-form'
import { logoClimeet } from '../../assets/'
import { authenticateUser } from '../../services'

const Connect = ({ apiResponse }) => {
	// * Déclaration Hook Form:
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			username: 'mancheronv@gmail.com',
			password: 'testClimeet'
		}
	})

	return (
		<>
			<Div id={'connect'}>
				<Form onSubmit={handleSubmit(authenticateUser)}>
					<Img src={logoClimeet} alt={'Logo Climeet'} />
					<Input
						control={control}
						name={'username'}
						className={'connect__input'}
						label={'Email'}
						rules={{
							required: 'Vous devez indiquer votre email.'
						}}
						errors={errors}
					/>
					<Input
						control={control}
						name={'password'}
						type={'password'}
						className={'connect__input'}
						label={'Mot de passe'}
						rules={{
							required: 'Vous devez indiquer votre mot de passe.'
						}}
						errors={errors}
					/>
					<Button type={'submit'} label={'Se connecter'} />
				</Form>
			</Div>
			<ApiResponse apiResponse={apiResponse} />
		</>
	)
}

export default Connect
