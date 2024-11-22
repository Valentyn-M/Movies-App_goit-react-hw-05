import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {

	// Отримуємо ID фільму з параметра маршруту
	const { movieId } = useParams();

	// Стан для збереження даних про акторський склад фільму, отриманого від бекенда за його ID
	const [movieCredits, setMovieCredits] = useState([]);
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
				// Отримання даних про акторський склад фільму по ID
				const cast = await fetchMovieCredits(movieId);
				// Записуємо дані в стан для збереження фільму
				setMovieCredits(cast);
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

	return (
		<div>

			{/* Відображаємо акторський склад фільму тільки якщо у стані movieCredits є хоча б один елемент */}
			{movieCredits.length > 0 ? (
				<ul>
					{movieCredits.map(actor => (
						<li key={actor.cast_id}>
							<img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name ?? actor.original_name} width="500" height="750" loading="lazy" />
							<div>{actor.name ?? actor.original_name}</div>
							<div>Character: <span>{actor.character}</span></div>
						</li>
					))
					}
				</ul>) : (
				<p>No information about the cast</p>
			)}

			{loading && <Loader />}
			{isError && <ErrorMessage />}

		</div>
	)
}

export default MovieCast
