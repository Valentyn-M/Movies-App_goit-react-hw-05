import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"
import clsx from "clsx";
import { CgSearch } from "react-icons/cg";
import { BiSolidMoviePlay } from "react-icons/bi";

const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

const Navigation = () => {
	return (
		<>
			<nav className={s.nav}>
				{/* Атрибут end каже react-router-dom, що активний клас повинен застосовуватись тільки для точного збігу маршруту. Без end маршрут /movies вважається активним навіть за переходу на дочірній маршрут, наприклад, /movies/414906 */}
				<NavLink to="/" end className={buildLinkClass}><BiSolidMoviePlay className={s.icon} />Popular Movies</NavLink>
				<NavLink to="/movies" end className={buildLinkClass}><CgSearch className={s.icon} />Movie Search</NavLink>
			</nav>
		</>
	)
}

export default Navigation
