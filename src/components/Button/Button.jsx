import PropTypes from 'prop-types'
import './Button.scss'
import { useState, forwardRef } from 'react'
import { Tooltip } from '@mui/material'

const Button = ({
	id,
	className,
	type,
	label,
	children,
	toggle,
	target,
	data,
	onClick,
	disabled,
	tooltip
}) => {
	const [borderColor, setBorderColor] = useState('#CED4DA'),
		PhysicalButton = forwardRef(function PhysicalButton(props, ref) {
			return (
				<button
					{...props}
					ref={ref}
					id={id ?? data}
					type={type ?? 'button'}
					disabled={disabled}
					className={`button justify-align-center ${className ?? ''}`}
					data-bs-toogle={toggle}
					data-bs-target={target}
					onClick={onClick}
					style={{
						...props.style,
						border: '1px solid ' + borderColor
					}}
					onMouseOver={() => {
						if (props.onMouseOver) {
							props.onMouseOver()
							setBorderColor('#B1C91D')
						}
					}}
					onMouseOut={() => setBorderColor('#CED4DA')}
				>
					{children ?? label}
				</button>
			)
		})

	// console.log(tooltip, !tooltip ? 1 : 2)

	return !tooltip ? (
		<PhysicalButton />
	) : (
		<Tooltip title={tooltip} followCursor>
			<PhysicalButton />
		</Tooltip>
	)
}

Button.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	toggle: PropTypes.string,
	target: PropTypes.string,
	data: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	tooltip: PropTypes.string
}

export default Button
