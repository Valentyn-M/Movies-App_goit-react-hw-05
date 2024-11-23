import { MdDownloading } from "react-icons/md";
import s from "./LoadMoreBtn.module.css"

const LoadMoreBtn = ({ onChangePage }) => {

	const handleClick = (evt) => {
		onChangePage();
		// Remove focus from the button
		evt.target.blur();
	}

	return (
		<>
			<button className={s.btn} type="button" onClick={handleClick}>Show More Movies<MdDownloading /></button>
		</>
	)
}

export default LoadMoreBtn