import PropTypes from 'prop-types'

const Img = ({ id, className, src, alt, onClick, onLoad }) => {
	return (
		<img
			id={id}
			className={`img ${className ?? ''}`}
			src={src}
			alt={alt}
			onClick={onClick}
			onLoad={onLoad}
		/>
	)
}

Img.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired
}

export default Img
