import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

const Navigation = () => {
	return (
		<>
			<p>Logo</p>
			<nav>
				<NavLink to="/" className={buildLinkClass}>Home</NavLink>
				<NavLink to="/movies" className={buildLinkClass}>Movies</NavLink>
			</nav>
		</>
	)
}

export default Navigation
