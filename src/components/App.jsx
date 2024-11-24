import './App.css'
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import { lazy, Suspense } from 'react';
import GoUp from './GoUp/GoUp';
import { useMediaQuery } from 'react-responsive';

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {

	const isBigScreen = useMediaQuery({ query: '(min-width: 481px)' });

	return (
		<>
			<header>
				<Navigation />
			</header>

			<main className='main'>
				<Suspense>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/movies" element={<MoviesPage />} />
						<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
							<Route path="cast" element={<MovieCast />} />
							<Route path="reviews" element={<MovieReviews />} />
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense>
			</main>

			<footer>
				<Footer />
			</footer>

			{isBigScreen && <GoUp />}
		</>
	)
}

export default App
