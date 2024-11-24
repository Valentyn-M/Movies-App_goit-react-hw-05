import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import s from "./MovieDetailsPage.module.css"
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { fetchMovieByID } from "../../services/api";
import GoBack from "../../components/GoBack/GoBack";
import noImg from '../../img/no-img.jpg';
import { useMediaQuery } from "react-responsive";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";

const MovieDetailsPage = () => {

	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

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

		document.title = "Movie Details";

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
	function formatDate(dateString, fullDate = true) {
		const date = new Date(dateString);
		if (isNaN(date)) {
			throw new Error("Invalid date string provided");
		}
		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();
		if (fullDate) {
			return `${day}.${month}.${year}`;
		} else {
			return `${year}`;
		}
	}

	// Функція часу
	function formatTime(duration) {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		if (hours > 0 && minutes > 0) {
			return `${hours}h ${minutes}m`;
		} else if (hours > 0) {
			return `${hours}h`;
		} else {
			return `${minutes}m`;
		}
	}

	return (
		<>
			<GoBack to={goBackLink.current} />

			{/* До 768px */}
			{isMobile ? (
				/* Відображаємо Додаткову інфу про фільм тільки якщо у стані movie є щось */
				movie && (
					<div className={s.wrapMovie}>
						<div className={s.posterWrapper}>
							<div className={s.poster}>
								<div
									className={s.imageContent}
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.backdrop_path})`,
									}}
								>
									<div className={s.backgroundGradient}></div>
									<div className={s.image}>
										<img
											src={
												movie.poster_path
													? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
													: noImg
											}
											alt={movie.overview || 'No description available'}
											width="500"
											height="750"
											loading="lazy"
										/>
									</div>
								</div>
							</div>
						</div>
						<ul className={s.details}>
							<li className={s.detailsItem}>
								<h1 className={s.title}>
									{movie.title}{' '}
									<span className={s.titleYear}>
										({formatDate(movie.release_date, false)})
									</span>
								</h1>
								<div className={s.infoWrap}>
									<div className={s.info}>
										<div className={s.date}>
											<span>{formatDate(movie.release_date)}</span>{' '}
											<span>({movie.origin_country})</span>
										</div>
										<div className={s.duration}>{formatTime(movie.runtime)}</div>
									</div>
									<div className={s.scoreWrap}>
										<div className={s.score}>
											<div className={s.scoreContainer}>
												{Math.round(movie.vote_average * 10)}
												<sup>%</sup>
											</div>
										</div>
										<div className={s.scoreTitle}>
											User
											<br /> Score
										</div>
									</div>
								</div>
							</li>
							<li className={s.detailsItem}>
								<div className={s.genres}>
									{movie.genres.map((genre) => genre.name).join(', ')}
								</div>
								<div className={s.tagline}>{movie.tagline}</div>
							</li>
							<li className={s.detailsItem}>
								<div className={s.categoryName}>Overview</div>
								<div>{movie.overview}</div>
							</li>
						</ul>
					</div>
				)
			) : (
				/* Понад 768px */
				movie && (
					<div className={s.movieHeader}
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
						}}
					>
						<div className={s.movieBg}>
							<div className={s.movieWrap}>
								<div className={s.movieInner}>
									<div className={s.poster}>
										<div className={s.image}>
											<img
												src={
													movie.poster_path
														? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
														: noImg
												}
												alt={movie.overview || 'No description available'}
												width="500"
												height="750"
												loading="lazy"
											/>
										</div>
									</div>
									<ul className={s.details}>
										<li className={s.detailsItem}>
											<h1 className={s.title}>
												{movie.title}{' '}
												<span className={s.titleYear}>
													({formatDate(movie.release_date, false)})
												</span>
											</h1>
											<div className={s.infoWrap}>
												<div className={s.info}>
													<div className={s.date}>
														<span>{formatDate(movie.release_date)}</span>{' '}
														<span>({movie.origin_country})</span>
													</div>
													<div className={s.duration}>{formatTime(movie.runtime)}</div>
												</div>
												<div className={s.scoreWrap}>
													<div className={s.score}>
														<div className={s.scoreContainer}>
															{Math.round(movie.vote_average * 10)}
															<sup>%</sup>
														</div>
													</div>
													<div className={s.scoreTitle}>
														User
														<br /> Score
													</div>
												</div>
											</div>
										</li>
										<li className={s.detailsItem}>
											<div className={s.genres}>
												{movie.genres.map((genre) => genre.name).join(', ')}
											</div>
											<div className={s.tagline}>{movie.tagline}</div>
										</li>
										<li className={s.detailsItem}>
											<div className={s.categoryName}>Overview</div>
											<div>{movie.overview}</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				)
			)}

			{/* Відображаємо Додаткову інфу про фільм тільки якщо у стані movie є щось */}
			{movie && (
				<div>
					<ul className={s.listMoreInfo}>
						<li>
							{/* Зберігаємо goBackLink при переході на вкладені маршрути */}
							<Link to="cast" className={s.linkMoreInfo}><FaPeopleGroup /> Cast</Link>
						</li>
						<li>
							<Link to="reviews" className={s.linkMoreInfo}><MdRateReview /> Rewiews</Link>
						</li>
					</ul>
					<Suspense fallback={<div><Loader /></div>}>
						<Outlet />
					</Suspense>
				</div>
			)}

			{loading && <Loader />}
			{isError && <ErrorMessage />}

		</>
	)
}

export default MovieDetailsPage
