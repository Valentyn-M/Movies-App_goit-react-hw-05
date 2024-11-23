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
				<NavLink to="/" className={buildLinkClass}><BiSolidMoviePlay />Popular Movies</NavLink>
				<NavLink to="/movies" className={buildLinkClass}><CgSearch className={s.icon} />Movie Search</NavLink>
			</nav>
		</>
	)
}

export default Navigation
