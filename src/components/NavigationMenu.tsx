import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "@/styles/Navigation.module.css";

export default function NavigationMenu() {
	return (
		<nav className={`d-flex flex-column vh-100 p-3 ${s.nav}`}>
			<h5 className='mb-4'>Menu</h5>
			<NavLink to='/orders' className={s.nav__link}>
				Orders
			</NavLink>
			<NavLink to='/products' className={s.nav__link}>
				Products
			</NavLink>
		</nav>
	);
}
