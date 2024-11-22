import { useEffect } from "react"
import s from "./NotFoundPage.module.css"
import GoBack from "../../components/GoBack/GoBack";

const NotFoundPage = () => {

	useEffect(() => {
		document.title = "Movies | Page is not found";
	}, []);

	return (
		<div className={s.wrap}>
			<GoBack to="/" text="Go to Home" />
			<h1 className={s.title}>Ooops... Page is not found!</h1>
		</div>
	)
}

export default NotFoundPage
