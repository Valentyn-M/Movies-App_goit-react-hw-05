import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import s from "./MovieCast.module.css"
import noImg from '../../img/no-img_185.jpg';

const MovieCast = () => {

	// Отримуємо ID фільму з параметра маршруту
	const { movieId } = useParams();

	// Стан для збереження даних про акторський склад фільму, отриманого від бекенда за його ID
	const [movieCredits, setMovieCredits] = useState([]);
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
				// Отримання даних про акторський склад фільму по ID
				const cast = await fetchMovieCredits(movieId);
				// Записуємо дані в стан для збереження фільму
				setMovieCredits(cast);
				// Перевіряємо, чи є дані, і на основі цього встановлюємо isData
				setIsNoData(cast.length === 0);
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
		<div className={s.cast}>

			{/* Відображаємо акторський склад фільму тільки якщо у стані movieCredits є хоча б один елемент */}
			{movieCredits.length > 0 ? (
				<ul className={s.list}>
					{movieCredits.map(actor => (
						<li key={actor.cast_id} className={s.item}>
							<img src={actor.profile_path ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}` : noImg} alt={actor.name ?? actor.original_name} width="185" height="277" loading="lazy" />
							<div className={s.actorWrap}>
								<div className={s.actorName}>{actor.name ?? actor.original_name}</div>
								<div className={s.actorCharacter}>{actor.character}</div>
							</div>
						</li>
					))
					}
				</ul>
			) : (
				// Якщо немає інформації про акторський склад, то рендерний блок
				isNoData && (
					<div className={s.noData}>
						<p className={s.noDataContent}>We don&apos;t have any reviews for this movie.</p>
					</div>
				)
			)}


			{loading && <Loader />}
			{isError && <ErrorMessage />}

		</div>
	)
}

export default MovieCast
