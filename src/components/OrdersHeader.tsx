import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IoAdd } from "react-icons/io5";
import s from "@/styles/Orders.module.css";

export default function TopMenu() {
	const orders = useSelector((state: RootState) => state.orders.items);

	return (
		<div className='d-flex align-items-center mb-4'>
			<button className={`${s.circle_orders}  rounded-circle me-3`}>
				<IoAdd />
			</button>

			<h2 className='fw-bold m-0'>Приходы / {orders.length}</h2>
		</div>
	);
}
