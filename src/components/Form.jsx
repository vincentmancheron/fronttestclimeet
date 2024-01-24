const Form = ({ children, id, className, onSubmit, encType }) => {
	return (
		<form
			id={id}
			className={className}
			onSubmit={onSubmit}
			encType={encType}
		>
			{children}
		</form>
	)
}

export default Form
