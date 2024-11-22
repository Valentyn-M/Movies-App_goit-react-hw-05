import s from "./ErrorMessage.module.css"

const ErrorMessage = () => {
	return (
		<div className={s.wrap}>
			<h2 className={s.title}>Something went wrong...</h2>
			<p>Refresh the page and try again.</p>
		</div>
	)
}

export default ErrorMessage
