import { useEffect, useState } from "react";
import { fetchMoviesTrending } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const HomePage = () => {

	// Стан для збереження фільмів (Trending movies)
	const [movies, setMovies] = useState([]);
	// Стан для індикатора завантаження
	const [loading, setLoading] = useState(false);
	// Стан для зберігання помилки
	const [isError, setIsError] = useState(false);
	// Стан для зберігання поточної сторінки галереї
	const [page, setPage] = useState(1);
	// Стан для зберігання загальної кількості сторінок, що повертає бекенд
	const [totalPages, setTotalPages] = useState(0);

	// Ефект для запитів на бекенд
	useEffect(() => {
		// Оголошуємо асинхонну функцію для http-запитів на бекенд
		const getData = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				setLoading(true);
				// Виконуємо HTTP-запит (отриману відповідь одразу деструктуризуємо)
				const { results, total_pages } = await fetchMoviesTrending(page);
				// Записуємо дані в стан Trending movies
				// setMovies(prev => [...prev, ...results]);

				// Перевіряємо на унікальність перед додаванням
				setMovies((prev) => {
					const movieIds = prev.map((movie) => movie.id); // Список вже існуючих ID
					const newMovies = results.filter((movie) => !movieIds.includes(movie.id)); // Додаємо тільки ті, яких немає
					return [...prev, ...newMovies];
				});

				// Записуємо в стан totalPages дані про клькість cторінок, що надійшли з бекенду
				setTotalPages(total_pages);
			}
			catch (error) {
				// Якщо отримуємо помилку
				setIsError(true);
				console.error(error);
			}
			finally {
				// Прибираємо Loader
				setLoading(false);
			}
		}
		getData();
	}, [page]);

	// Функція для зміни стану поточної сторінки
	const changePage = () => {
		setPage(prev => prev + 1);
	}

	return (
		<>
			{/* Відображаємо список фільмів тільки якщо у стані movies є хоча б один елемент */}
			{movies.length > 0 && <MovieList movies={movies} />}
			{loading && <Loader />}
			{isError && <ErrorMessage />}
			{/* Показуємо кнопку якщо завантаження завершено i загальна кількість сторінок більше ніж поточна торінка */}
			{!loading && totalPages > page && <LoadMoreBtn onChangePage={changePage} />}
		</>
	)
}

export default HomePage
