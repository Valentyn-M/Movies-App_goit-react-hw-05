import { Field, Form, Formik } from "formik"
import s from "./SearchBar.module.css"
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ handleSetQuery }) => {

	const initialValues = {
		query: "",
	}

	const formRef = useRef();
	// Стан для активації класу
	const [isActive, setIsActive] = useState(false);

	const handleSubmit = (values) => {
		// Якщо текстове поле порожнє
		if (values.query === "") {
			// Бібліотека React Hot Toast
			toast.error("You must enter text to search for images")
			return;
		}

		handleSetQuery(values.query);
	}

	// Активацiя форми
	const handleFocus = () => {
		setIsActive(true);
	};

	const handleBlur = () => {
		setIsActive(false);
	};

	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form className={`${s.form} ${isActive ? s.isActive : ""}`} ref={formRef}>
					<Field className={s.input}
						name="query"
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search for a movie"
						onFocus={handleFocus}
						onBlur={handleBlur}
					>
					</Field>
					<button className={s.btn} type="submit" aria-label="Search">Search</button>
				</Form>
			</Formik>
			<Toaster position="top-right" />
		</div>
	)
}

export default SearchBar
