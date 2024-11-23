import { SiThemoviedatabase } from "react-icons/si"
import s from "./Footer.module.css"

const Footer = () => {

	const currentYear = new Date().getFullYear();

	return (
		<div className={s.wrap}>
			<SiThemoviedatabase className={s.icon} />Movies | Built with React | {currentYear}
		</div>
	)
}

export default Footer
