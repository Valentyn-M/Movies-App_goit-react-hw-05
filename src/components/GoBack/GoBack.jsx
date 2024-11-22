import { Link } from "react-router-dom"
import s from "./GoBack.module.css"
import { IoArrowBack } from "react-icons/io5"

const GoBack = ({ to, text = "Go Back" }) => {
	return (
		<>
			<Link className={s.link} to={to}><IoArrowBack />{text}</Link>
		</>
	)
}

export default GoBack
