import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Navigation from './Navigation/Navigation';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import { Suspense } from 'react';
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';

function App() {

	return (
		<>
			<header>
				<Navigation />
			</header>

			<main>
				<Suspense>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/movies" element={<MoviesPage />} />
						<Route path="/movies/:id" element={<MovieDetailsPage />}>
							<Route path="cast" element={<MovieCast />} />
							<Route path="reviews" element={<MovieReviews />} />
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</main>
		</>
	)
}

export default App
