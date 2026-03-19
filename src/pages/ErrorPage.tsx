import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	console.error(error);

	return (
		<div className='d-flex flex-column align-items-center justify-content-center vh-100 text-center'>
			<h1 className='display-1 fw-bold text-danger'>Oops!</h1>
			<p className='lead'>
				{isRouteErrorResponse(error)
					? `Ошибка ${error.status}: ${error.statusText}`
					: "Произошла ошибка"}
			</p>
			<button
				className='btn btn-success'
				onClick={() => window.location.reload()}
			>
				Попробовать снова
			</button>
		</div>
	);
};

export default ErrorPage;
