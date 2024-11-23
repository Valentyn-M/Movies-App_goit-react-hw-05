import { Link, useLocation } from "react-router-dom"
import s from "./MovieList.module.css"
import noImg from '../../img/no-img.jpg';

const MovieList = ({ movies }) => {

	// Хук useLocation - Повертає об'єкт розташування, що представляє поточний URL, щоразу коли ми переходимо новим маршрутом або оновлюємо частину поточного URL
	const location = useLocation();

	// Функція для дати
	function formatDate(dateString) {
		const date = new Date(dateString);
		const monthNames = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		const month = monthNames[date.getUTCMonth()]
		const year = date.getUTCFullYear();
		return `${year}, ${month}`;
	}


	return (
		<ul className={s.list}>
			{movies.map((movie) => (
				<li key={movie.id} className={s.item}>
					{/* Посилання на MovieDetailsPage, передаємо дані  */}
					{/* Передача даних між компонентами через маршрути <Link> використовують властивість state */}
					<Link to={`/movies/${movie.id}`} state={location} className={s.link}>
						<div className={s.image}>
							<img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noImg} alt={movie.overview || "No description available"} width="500" height="750" loading="lazy" />
						</div>
						<div className={s.content}>
							<div className={s.raiting}><div className={s.raitingWrap}>{Math.round(movie.vote_average * 10)}<sup>%</sup></div></div>
							<div className={s.title}>{movie.title}</div>
							<div className={s.date}>{formatDate(movie.release_date)}</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}

export default MovieList
