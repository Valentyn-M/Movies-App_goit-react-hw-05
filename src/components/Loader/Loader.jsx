import s from "./Loader.module.css"
import { DotLoader } from "react-spinners"

const Loader = () => {
	return (
		<div className={s.loader}>
			<DotLoader
				color="#10B3E1"
				size="100px"
				speedMultiplier="1.2"
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	)
}

export default Loader
