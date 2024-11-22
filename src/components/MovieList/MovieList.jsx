import { Link, useLocation } from "react-router-dom"

const MovieList = ({ movies }) => {

	// Хук useLocation - Повертає об'єкт розташування, що представляє поточний URL, щоразу коли ми переходимо новим маршрутом або оновлюємо частину поточного URL
	const location = useLocation();

	return (
		<ul>
			{movies.map((movie) => (
				<li key={movie.id}>
					{/* Посилання на MovieDetailsPage, передаємо дані  */}
					{/* Передача даних між компонентами через маршрути <Link> використовують властивість state */}
					<Link to={`/movies/${movie.id}`} state={{ data: movie, from: location }}>{movie.title}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default MovieList
