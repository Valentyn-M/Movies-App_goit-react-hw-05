import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar"
import { fetchMoviesBySearch } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import LoaderSearch from "../../components/LoaderSearch/LoaderSearch";

const MoviesPage = () => {

	// Вилучення параметрів - хук useSearchParams
	const [searchParams, setSearchParams] = useSearchParams();

	// Стан для зберігання фільмів за пошуковим запитом
	const [movies, setMovies] = useState([]);
	// Стан для індикатора завантаження
	const [loading, setLoading] = useState(false);
	// Стан для зберігання помилки
	const [isError, setIsError] = useState(false);
	// Стан для зберігання поточної сторінки галереї
	const [currentPage, setCurrentPage] = useState(1);
	// Стан для зберігання загальної кількості сторінок, що повертає бекенд
	const [totalPages, setTotalPages] = useState(0);

	// Еффект для HTTP-запитів на бекенд
	useEffect(() => {
		document.title = "Movie Search";
		// Оголошуємо асинхронну функцію та одразу викликаємо її після оголошення, тому що колбек-функція, яку ми передаємо useEffect, не може бути асинхронною
		const getData = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				{ searchParams.size && setLoading(true) };
				// Отримуємо значення параметрів рядка запиту
				const searchQuery = searchParams.get("query") ?? '';
				// Виконуємо HTTP-запит (отриману відповідь зберігаємо не в змінній, а одразу деструктуризуємо, отримуючи необхідні властивості об'єкта-відповіді)
				const { results, total_pages } = await fetchMoviesBySearch(searchQuery, currentPage);
				// Записуємо дані в стан (додаємо до попередніх даних, розсипаємо масив)
				// Запобігаємо дублюванням, відфільтрувавши фільми, які вже є в стані (це трапляється через StrictMode: У режимі розробки строгий режим React навмисно запускає useEffect двічі. Це означає, що getData викликається двічі, коли компонент вперше монтується.)
				setMovies(prev => {
					const newMovies = results.filter(movie => !prev.some(prevMovie => prevMovie.id === movie.id));
					return [...prev, ...newMovies];
				});
				// Записуємо в стан totalPages дані про клькість cторінок, що надійшли з бекенду
				setTotalPages(total_pages);
			} catch (error) {
				// Якщо отримуємо помилку
				setIsError(true);
				console.error(error.message);
			} finally {
				// Прибираємо Loader
				setLoading(false);
			}
		};
		getData();
		// Слідкуємо за зміною стану searchParams (тобто, при зміні пошукового запиту запускається знову useEffect)
		// Слідкуємо за зміною стану currentPage (тобто, при клыку по кнопці Load more запускається знову useEffect)
	}, [currentPage, searchParams]);

	// Функція для зміни стану пошукового запиту (при її запуску в компоненті SearchBar дані потрапляють у стан searchQuery)
	const handleSetQuery = (searchQuery) => {
		// Обнуляємо стан images
		setMovies([]);
		// Встановлюмо значення параметру запиту
		searchParams.set('query', searchQuery);
		setSearchParams(searchParams);
		// Обнуляємо стан page
		setCurrentPage(1);
	}

	// Функція для зміни стану поточної сторінки
	const changePage = () => {
		setCurrentPage(prev => prev + 1);
	}

	return (
		<>
			<SearchBar handleSetQuery={handleSetQuery} />
			{/* Відображаємо список фільмів тільки якщо у стані movies є хоча б один елемент */}
			{movies.length > 0 && <MovieList movies={movies} />}
			{loading && (
				currentPage > 1 ? <Loader /> : <LoaderSearch />
			)}

			{isError && <ErrorMessage />}
			{/* Показуємо кнопку якщо завантаження завершено i загальна кількість сторінок більше ніж поточна торінка */}
			{!loading && totalPages > currentPage && <LoadMoreBtn onChangePage={changePage} />}
		</>
	)
}

export default MoviesPage
