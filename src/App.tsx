import {
	createBrowserRouter,
	RouterProvider,
	useLocation,
	useOutlet,
	Navigate
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createRef } from "react";
import NavigationMenu from "@/components/NavigationMenu";
import TopMenu from "@/components/TopMenu";
import Orders from "@/pages/Orders/Orders";
import Products from "@/pages/Products/Products";
import { ordersLoader } from "@/pages/Orders/Orders.loader";
import { productsLoader } from "@/pages/Products/Products.loader";
import ErrorPage from "@/pages/ErrorPage";
import "@/styles/custom.css";
import "@/styles/transitions.css";
import "@/styles/variables.css";

function RootLayout() {
	const location = useLocation();
	const currentOutlet = useOutlet();
	const nodeRef = createRef<HTMLDivElement>();

	return (
		<div className='d-flex flex-column vh-100'>
			<TopMenu />
			<div className='d-flex flex-grow-1'>
				<NavigationMenu />
				<main className='flex-grow-1 overflow-hidden position-relative'>
					<TransitionGroup className='h-100'>
						<CSSTransition
							key={location.pathname}
							nodeRef={nodeRef}
							timeout={300}
							classNames='fade'
							unmountOnExit
						>
							<div
								ref={nodeRef}
								className='page-wrapper h-100 p-3'
							>
								{currentOutlet}
							</div>
						</CSSTransition>
					</TransitionGroup>
				</main>
			</div>
		</div>
	);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Navigate to='/orders' replace />
			},
			{
				path: "orders",
				element: <Orders />,
				loader: ordersLoader
			},
			{
				path: "products",
				element: <Products />,
				loader: productsLoader
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
