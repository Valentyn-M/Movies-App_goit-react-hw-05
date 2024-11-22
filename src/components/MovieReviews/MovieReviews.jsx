import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {

	// Отримуємо ID фільму з параметра маршруту
	const { movieId } = useParams();

	// Стан для збереження даних про відгуки фільму, отриманого від бекенда за його ID
	const [movieReviews, setMovieReviews] = useState([]);
	// Стан для індикатора завантаження
	const [loading, setLoading] = useState(false);
	// Стан для зберігання помилки
	const [isError, setIsError] = useState(false);

	// Отримання фільму від бекенду
	useEffect(() => {
		const getData = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				setLoading(true);
				// Отримання даних про відгуки фільму по ID
				// TODO Зробити розбиття по сторінкам (по 10) після здачі
				const { results } = await fetchMovieReviews(movieId);
				// Записуємо дані в стан для збереження фільму
				setMovieReviews(results);
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
		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();
		const hours = String(date.getUTCHours()).padStart(2, '0');
		const minutes = String(date.getUTCMinutes()).padStart(2, '0');
		return `${day}.${month}.${year} ${hours}:${minutes}`;
	}

	return (
		<div>

			{/* Якщо у стані movieCredits начого немає, то Показуємо текст, що відгуків немає */}
			{movieReviews.length > 0 ? (
				<ul>
					{movieReviews.map(review => (
						<li key={review.id}>
							<div>
								<div>Author: <span>{review.author ?? "Unknown"}</span></div>
								<div>{formatDate(review.updated_at ?? review.created_at)}</div>
							</div>
							<div>{review.content}</div>
						</li>
					))
					}
				</ul>) : (
				<p>We do not have any reviews</p>
			)}


			{loading && <Loader />}
			{isError && <ErrorMessage />}

		</div >

	)
}

export default MovieReviews
