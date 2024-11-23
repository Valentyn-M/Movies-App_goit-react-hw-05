import { SiThemoviedatabase } from "react-icons/si"
import s from "./Footer.module.css"

const Footer = () => {
	return (
		<div className={s.wrap}>
			<SiThemoviedatabase className={s.icon} />Movies | Built with React | 2024
		</div>
	)
}

export default Footer
