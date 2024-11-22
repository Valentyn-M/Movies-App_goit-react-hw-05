import axios from "axios";

// const API_READ_ACCESS_TOKEN_TMDB = import.meta.env.VITE_API_READ_ACCESS_TOKEN_TMDB;
const API_READ_ACCESS_TOKEN_TMDB = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDFlMzMyOGQyZDFhOGI0NTQ4NmY3ZDhjMzY0OWY5NiIsIm5iZiI6MTczMjE5OTAyOS43Mzc0ODkyLCJzdWIiOiI2NzNmM2Y2YTYyNWJjMzM4ZGMzOGIxMTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.18BgbyU7Y4nlHMjaFClJGM1-RMk6VW61qYPlAhlJkgk';
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
	headers: {
		Authorization: `Bearer ${API_READ_ACCESS_TOKEN_TMDB}`
	}
};

// Список найпопулярніших фільмів на сьогодні для створення колекції на головній сторінці
export const fetchMoviesTrending = async (page) => {
	const urlTrending = `${BASE_URL}/discover/movie?include_adult=true&include_video=true&language=en-US&&sort_by=popularity.desc&page=${page}`;
	const response = await axios.get(urlTrending, options);
	return response.data;
}

// Отримання жанрів (з розшифровкою від бекенда)
export const fetchGenres = async () => {
	const urlGenres = `${BASE_URL}/genre/movie/list?language=en`;
	const response = await axios.get(urlGenres, options);
	return response.data.genres;
};

// Запит повної інформації про фільм для сторінки кінофільму за ID
export const fetchMovieByID = async (movieId) => {
	const urlMovieId = `${BASE_URL}/movie/${movieId}?language=en-US`;
	const response = await axios.get(urlMovieId, options);
	return response.data;
};

// Запит інформації про акторський склад для сторінки кінофільму.
export const fetchMovieCredits = async (movieId) => {
	const urlMovieCredits = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
	const response = await axios.get(urlMovieCredits, options);
	return response.data.cast;
};

// Запит оглядів для сторінки кінофільму
export const fetchMovieReviews = async (movieId) => {
	const urlMovieReviews = `${BASE_URL}/movie/${movieId}/reviews?language=en-US`;
	const response = await axios.get(urlMovieReviews, options);
	// console.log(response.data);
	return response.data;
};

// Пошук фільму за ключовим словом на сторінці фільмів
export const fetchMoviesBySearch = async (query, page) => {
	const urlSearch = `${BASE_URL}/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`;
	const response = await axios.get(urlSearch, options);
	return response.data;
}