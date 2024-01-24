import { Controller } from 'react-hook-form'
import { FormControl, FormHelperText, TextField } from '@mui/material'
import './Input.scss'
import PropTypes from 'prop-types'

const Input = ({
	id,
	control,
	name,
	className,
	type,
	label,
	rules,
	errors,
	setValue,
	additionnalOnChange,
	autoFocus,
	step
}) => {
	// * Gestion de la précision des input de type Float sur l'event onBlur:
	const handleBlur = (value) => {
		if (type === 'number' && value) {
			step = step ? step.toString() : '0'
			let decimalPart = value.split('.')[1],
				precision = step.split('.')[1]
			precision = precision ? precision.length : 0

			if (!decimalPart) {
				value += '.'
				decimalPart = ''
			}

			if (decimalPart.length < precision) {
				for (let i = decimalPart.length; i < precision; i++) {
					value += '0'
				}
			} else if (decimalPart.length > precision) {
				value = value = parseFloat(value).toFixed(precision)
			}

			setValue(name, value)
		}
	}

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<FormControl id={id} className={className}>
					<TextField
						type={type}
						onChange={(e) => {
							let { value } = e.target
							onChange(value)
							if (additionnalOnChange) {
								additionnalOnChange(value)
							}
						}}
						onBlur={(e) => handleBlur(e.target.value)}
						inputProps={{ className: 'input', step }}
						value={value ?? ''}
						variant={'outlined'}
						label={label}
						size={'small'}
						error={
							errors !== undefined && errors[name] !== undefined
						}
						autoFocus={autoFocus}
					/>
					{errors !== undefined && errors[name] !== undefined && (
						<FormHelperText error={true}>
							{errors[name].message}
						</FormHelperText>
					)}
				</FormControl>
			)}
		/>
	)
}

Input.propTypes = {
	control: PropTypes.object,
	name: PropTypes.string,
	className: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	rules: PropTypes.object,
	errors: PropTypes.object,
	additionnalOnChange: PropTypes.func
}

export default Input
