import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./MovieReviews.module.css"
import { BiSolidUser } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";

const MovieReviews = () => {

	// Отримуємо ID фільму з параметра маршруту
	const { movieId } = useParams();

	// Стан для збереження даних про відгуки фільму, отриманого від бекенда за його ID
	const [movieReviews, setMovieReviews] = useState([]);
	// Стан для індикатора завантаження
	const [loading, setLoading] = useState(false);
	// Стан для зберігання помилки
	const [isError, setIsError] = useState(false);
	// Стан для показу повiдомлення про вiдсутнiсть даних
	const [isNoData, setIsNoData] = useState(false);

	// Отримання фільму від бекенду
	useEffect(() => {
		const getData = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				setLoading(true);
				// Отримання даних про відгуки фільму по ID
				const { results } = await fetchMovieReviews(movieId);
				// Записуємо дані в стан для збереження фільму
				setMovieReviews(results);
				// Перевіряємо, чи є дані, і на основі цього встановлюємо isData
				setIsNoData(results.length === 0);
			} catch (error) {
				// Якщо отримуємо помилку
				setIsError(true);
				console.error(error);
			} finally {
				// Прибираємо Loader
				setLoading(false);
			}
		};
		getData();
	}, [movieId]);

	// Функція для дати
	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = { month: "long", day: "numeric", year: "numeric" };
		return date.toLocaleDateString("en-US", options);
	}

	return (
		<div className={s.reviews}>

			{/* Якщо у стані movieCredits начого немає, то Показуємо текст, що відгуків немає */}
			{movieReviews.length > 0 ? (
				<ul className={s.list}>
					{movieReviews.map(review => (
						<li key={review.id} className={s.item}>
							<div className={s.reviewHeader}>
								<div className={s.reviewAvatar}>
									{review.author_details.avatar_path ? <img src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`} alt={review.author_details.avatar_path ?? review.author} width="185" height="112" loading="lazy" /> : <BiSolidUser />}
								</div>
								<div className={s.reviewInfo}>
									<div className={s.reviewAuthor}>{review.author}</div>
									<div className={s.reviewInfoDetails}>
										<div className={s.reviewAuthorRaiting}><GoStarFill /><span className={s.raitingValue}>{review.author_details.rating * 10}<sup>%</sup></span></div>
										<div className={s.reviewWritten}>Written by <span className={s.author}>{review.author}</span> on {formatDate(review.updated_at ?? review.created_at)}</div>
									</div>
								</div>
							</div>
							<div className={s.reviewContent}>{review.content}</div>
						</li>
					))
					}
				</ul>
			) : (
				// Якщо вiдгукiв нема, то рендеримо блок
				isNoData && (
					<div className={s.noData}>
						<p className={s.noDataContent}>We don&apos;t have any reviews for this movie.</p>
					</div>
				)
			)}

			{loading && <Loader />}
			{isError && <ErrorMessage />}

		</div >

	)
}

export default MovieReviews
