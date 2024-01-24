import { Controller } from 'react-hook-form'
import { FormControl, FormHelperText } from '@mui/material'
import RSelect from 'react-select'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Select.scss'

const Select = ({
	control,
	id,
	name,
	data,
	className,
	classNamePrefix,
	placeholder,
	rules,
	errors,
	isMulti,
	isClearable,
	disabled,
	additionnalOnChange,
	styles
}) => {
	// // * Transformation des datas en options:
	// const [options, setOptions] = useState()
	// useEffect(() => {
	// 	let optionsToState = []
	// 	data.datas.forEach((iteration) => {
	// 		let { id, name } = iteration
	// 		optionsToState.push({
	// 			...iteration,
	// 			value: id,
	// 			label: name ?? ref ?? social_reason
	// 		})
	// 		setOptions(optionsToState)
	// 	})
	// }, [data])

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<FormControl className={className}>
					<RSelect
						inputId={id}
						options={data}
						name={name}
						className={className}
						classNamePrefix={'select ' + classNamePrefix}
						placeholder={placeholder}
						value={value}
						onChange={(value) => {
							onChange(value)
							if (additionnalOnChange) {
								additionnalOnChange(value)
							}
						}}
						isMulti={isMulti}
						isClearable={isClearable}
						isDisabled={disabled}
						menuPortalTarget={document.body}
						styles={{
							...styles,
							menuPortal: (base) => ({ ...base, zIndex: 9999 })
						}}
					/>
					{errors[name] && (
						<FormHelperText error={true}>
							{errors[name].message}
						</FormHelperText>
					)}
				</FormControl>
			)}
		/>
	)
}

Select.propTypes = {
	control: PropTypes.object,
	id: PropTypes.string,
	name: PropTypes.string,
	options: PropTypes.array,
	className: PropTypes.string,
	classNamePrefix: PropTypes.string,
	placeholder: PropTypes.string,
	rules: PropTypes.object,
	errors: PropTypes.object,
	isMulti: PropTypes.bool,
	disabled: PropTypes.bool,
	additionnalOnChange: PropTypes.func,
	styles: PropTypes.object
}

export default Select
