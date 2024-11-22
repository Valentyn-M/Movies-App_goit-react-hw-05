import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

const Navigation = () => {
	return (
		<>
			<nav className={s.nav}>
				<NavLink to="/" className={buildLinkClass}>Popular Movies</NavLink>
				<NavLink to="/movies" className={buildLinkClass}>Movie Search</NavLink>
			</nav>
		</>
	)
}

export default Navigation
