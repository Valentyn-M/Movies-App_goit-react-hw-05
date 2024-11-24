import { IoArrowUpOutline } from "react-icons/io5";
import s from "./GoUp.module.css"
import { useEffect, useState } from "react";

const GoUp = () => {

	// Стан активності кнопки наверх
	const [isActive, setIsActive] = useState(false);

	// Ефект для відстеження прокручування сторінки
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 150) {
				setIsActive(true);
			} else {
				setIsActive(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Забираємо обробник при розмонтуванні компонента
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleClick = (evt) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		// Remove focus from the button
		evt.target.blur();
	};

	return (
		<button onClick={handleClick} type="button" className={`${s.goUp} ${isActive ? s.isActive : ""}`} aria-label="Back to Top">
			<IoArrowUpOutline className={s.icon} />
		</button>
	)
}

export default GoUp
