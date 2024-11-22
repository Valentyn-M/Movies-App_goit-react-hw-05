import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import s from "./MovieDetailsPage.module.css"
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchMovieByID } from "../../services/api";
import GoBack from "../../components/GoBack/GoBack";

const MovieDetailsPage = () => {

	// У властивості location.state буде посилання на об'єкт location маршруту з якого відбулася навігація.
	// Додаємо перевірку на випадок, якщо location.state виявиться undefined. Це може статися, якщо користувач перейшов на сторінку безпосередньо
	const location = useLocation();
	// Отримуємо шлях, звідки прийшли
	// const goBackLink = location.state ?? '/movies'; 
	// Альтернативний (кращий варіант), бо не треба передавати state іншим вкладеним <Link>
	const goBackLink = useRef(location.state ?? '/movies'); // Якщо користувач перейде по посиланню, то в state буде пусто. Тому прописуємо запасний шлях '/movies'

	// Отримуємо ID фільму з параметра маршруту (з адресної строки: після /movies/)
	const { movieId } = useParams();

	// Стан для збереження фільму, отриманого від бекенда за його ID
	const [movie, setMovie] = useState(null);
	// Стан для індикатора завантаження
	const [loading, setLoading] = useState(false);
	// Стан для зберігання помилки
	const [isError, setIsError] = useState(false);

	// Отримання фільму від бекенду
	useEffect(() => {
		const getMovie = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				setLoading(true);
				// Отримання фільму по ID
				const data = await fetchMovieByID(movieId);
				// Записуємо дані в стан для збереження фільму
				setMovie(data);
			} catch (error) {
				// Якщо отримуємо помилку
				setIsError(true);
				console.error(error);
			} finally {
				// Прибираємо Loader
				setLoading(false);
			}
		};
		getMovie();
	}, [movieId]);

	// Функція для дати
	function formatDate(dateString) {
		const date = new Date(dateString);
		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();
		return `${day}.${month}.${year}`;
	}

	return (
		<div>
			<GoBack to={goBackLink.current} />

			{/* Відображаємо деталі фільму тільки якщо у стані movie є щось */}
			{movie && (
				<div className={s.wrap}>
					<div className={s.image}>
						<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.overview} width="500" height="750" loading="lazy" />
					</div>
					<ul className={s.details}>
						<li className={s.detailsItem}>
							<h1>{movie.title}</h1>
							<div>{movie.tagline}</div>
							<div>{formatDate(movie.release_date)}</div>
							<div>{movie.vote_average * 10}%</div>
						</li>
						<li className={s.detailsItem}>
							<div className={s.categoryName}>Overview</div>
							<div>{movie.overview}</div>
						</li>
						<li className={s.detailsItem}>
							<div className={s.categoryName}>Genre</div>
							{/* Перетворюємо масив об'єктів genres на масив рядків з назвами жанрів перед використанням .join(", ") */}
							<div>{movie.genres.map(genre => genre.name).join(", ") || "No genres available"}</div>
						</li>
					</ul>
				</div>
			)}

			{/* Відображаємо Додаткову інфу про фільм тільки якщо у стані movie є щось */}
			{movie && (
				<div>
					<h2>Additional Information</h2>
					<ul>
						<li>
							{/* Зберігаємо goBackLink при переході на вкладені маршрути */}
							<Link to="cast">Cast</Link>
						</li>
						<li>
							<Link to="reviews">Rewiews</Link>
						</li>
					</ul>
					<Suspense fallback={<div>Loading info...</div>}>
						{/* TODO Вставити лоадер */}
						<Outlet />
					</Suspense>
				</div>
			)}

			{loading && <Loader />}
			{isError && <ErrorMessage />}

		</div>
	)
}

export default MovieDetailsPage
