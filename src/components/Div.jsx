import PropTypes from 'prop-types'

const Div = ({ id, className, children, onClick, isABox }) => {
	return (
		<div
			id={id}
			className={`div ${className ?? ''} ${
				isABox && 'box p-2 border border-dark rounded bg-light shadow'
			}`}
			onClick={onClick}
			style={{ cursor: !onClick ? 'default' : 'pointer' }}
		>
			{children}
		</div>
	)
}

Div.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string
}

export default Div
