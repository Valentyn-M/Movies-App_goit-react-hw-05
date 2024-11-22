import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar"
import { fetchMoviesBySearch } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {

	// Вилучення параметрів - хук useSearchParams
	const [searchParams, setSearchParams] = useSearchParams();
	// Отримуємо значення параметрів рядка запиту
	const query = searchParams.get("query") ?? '';

	// Стан для зберігання фільмів за пошуковим запитом
	const [movies, setMovies] = useState([]);
	// Стан для індикатора завантаження
	const [loading, setLoading] = useState(false);
	// Стан для зберігання помилки
	const [isError, setIsError] = useState(false);
	// Стан для зберігання пошукового запиту
	const [searchQuery, setSearchQuery] = useState(query);
	// Стан для зберігання поточної сторінки галереї
	const [page, setPage] = useState(1);
	// Стан для зберігання загальної кількості сторінок, що повертає бекенд
	const [totalPages, setTotalPages] = useState(0);

	// Еффект для HTTP-запитів на бекенд
	useEffect(() => {
		// При завантаженнi стронiнки не запускаємо useEffect, тобто перевіряємо searchQuery (там пусто)
		if (!searchQuery) return;
		// Оголошуємо асинхронну функцію та одразу викликаємо її після оголошення, тому що колбек-функція, яку ми передаємо useEffect, не може бути асинхронною
		const getData = async () => {
			try {
				// Встановлюємо початкові значення перед запитом
				setIsError(false);
				setLoading(true);
				// Виконуємо HTTP-запит (отриману відповідь зберігаємо не в змінній, а одразу деструктуризуємо, отримуючи необхідні властивості об'єкта-відповіді)
				const { results, total_pages } = await fetchMoviesBySearch(searchQuery, page);
				// Записуємо дані в стан (додаємо до попередніх даних, розсипаємо масив)
				// setMovies(prev => [...prev, ...results]);

				// Перевіряємо на унікальність перед додаванням
				setMovies((prev) => {
					const movieIds = prev.map((movie) => movie.id); // Список вже існуючих ID
					const newMovies = results.filter((movie) => !movieIds.includes(movie.id)); // Додаємо тільки ті, яких немає
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
		// Слідкуємо за зміною стану query (тобто, при зміні пошукового запиту запускається знову useEffect)
		// Слідкуємо за зміною стану page (тобто, при клыку по кнопці Load more запускається знову useEffect)
	}, [searchQuery, page]);

	// Функція для зміни стану пошукового запиту (при її запуску в компоненті SearchBar дані потрапляють у стан searchQuery)
	const changeQuery = (searchQuery) => {
		// Обнуляємо стан images
		setMovies([]);
		// Змінюємо стан searchQuery
		setSearchQuery(searchQuery);
		// Обнуляємо стан page
		setPage(1);
		// Встановлюмо значення параметру запиту
		setSearchParams({ query: searchQuery });
	}

	// Функція для зміни стану поточної сторінки
	const changePage = () => {
		setPage(prev => prev + 1);
	}

	return (
		<>
			<SearchBar onChangeQuery={changeQuery} />
			{/* Відображаємо список фільмів тільки якщо у стані movies є хоча б один елемент */}
			{movies.length > 0 && <MovieList movies={movies} />}
			{loading && <Loader />}
			{isError && <ErrorMessage />}
			{/* Показуємо кнопку якщо завантаження завершено i загальна кількість сторінок більше ніж поточна торінка */}
			{!loading && totalPages > page && <LoadMoreBtn onChangePage={changePage} />}
		</>
	)
}

export default MoviesPage
