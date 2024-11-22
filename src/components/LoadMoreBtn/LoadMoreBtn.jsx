import s from "./LoadMoreBtn.module.css"

const LoadMoreBtn = ({ onChangePage }) => {

	const handleClick = (evt) => {
		onChangePage();
		// Remove focus from the button
		evt.target.blur();
	}

	return (
		<>
			<button className={s.btn} type="button" onClick={handleClick}>Show More Movies</button>
		</>
	)
}

export default LoadMoreBtn