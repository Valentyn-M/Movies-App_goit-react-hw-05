import { MagnifyingGlass } from "react-loader-spinner"
import s from "./LoaderSearch.module.css"

const LoaderSearch = () => {
	return (
		<div className={s.loader}>
			<MagnifyingGlass
				visible={true}
				height="100"
				width="100"
				ariaLabel="magnifying-glass-loading"
				wrapperStyle={{}}
				wrapperClass="magnifying-glass-wrapper"
				glassColor="#10B3E1"
				color="#05253F"
			/>
		</div>
	)
}

export default LoaderSearch
