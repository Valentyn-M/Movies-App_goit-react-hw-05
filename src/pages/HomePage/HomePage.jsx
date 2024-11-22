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
	const [currentPage, setCurrentPage] = useState(1);
	// Стан для зберігання загальної кількості сторінок, що повертає бекенд
	const [totalPages, setTotalPages] = useState(0);

	// Ефект для запитів на бекенд
	useEffect(() => {
		document.title = "Popular Movies";
		// Оголошуємо асинхонну функцію для http-запитів на бекенд
		const getData = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				setLoading(true);
				// Виконуємо HTTP-запит (отриману відповідь одразу деструктуризуємо)
				const { results, total_pages } = await fetchMoviesTrending(currentPage);
				// Записуємо дані в стан Trending movies
				// Запобігаємо дублюванням, відфільтрувавши фільми, які вже є в стані (це трапляється через StrictMode: У режимі розробки строгий режим React навмисно запускає useEffect двічі. Це означає, що getData викликається двічі, коли компонент вперше монтується.)
				setMovies(prev => {
					const newMovies = results.filter(movie => !prev.some(prevMovie => prevMovie.id === movie.id));
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
	}, [currentPage]);

	// Функція для зміни стану поточної сторінки
	const changePage = () => {
		setCurrentPage(prev => prev + 1);
	}

	return (
		<>
			{/* Відображаємо список фільмів тільки якщо у стані movies є хоча б один елемент */}
			{movies.length > 0 && <MovieList movies={movies} />}
			{loading && <Loader />}
			{isError && <ErrorMessage />}
			{/* Показуємо кнопку якщо завантаження завершено i загальна кількість сторінок більше ніж поточна торінка */}
			{!loading && totalPages > currentPage && <LoadMoreBtn onChangePage={changePage} />}
		</>
	)
}

export default HomePage
