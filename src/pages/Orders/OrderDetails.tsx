import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedOrder } from "../../store/ordersSlice";
import s from "@/styles/Orders.module.css";
import OrderProductsList from "@/components/OrderProductsList";

const OrderDetails: React.FC = () => {
	const dispatch = useDispatch();

	const selectedOrderId = useSelector(
		(state: RootState) => state.orders.selectedOrderId
	);

	const order = useSelector((state: RootState) =>
		state.orders.items.find((o) => Number(o.id) === Number(selectedOrderId))
	);

	if (!order) return null;

	return (
		<div className='card shadow-sm border-0'>
			<button
				className={`${s.card__close} btn-close position-absolute bg-white shadow-sm p-2 rounded-circle`}
				style={{}}
				onClick={() => dispatch(setSelectedOrder(null))}
			></button>

			<div className='card-header bg-white border-0 p-4'>
				<h4 className='fw-bold m-0'>{order.title}</h4>
				<div
					className='text-success mt-2'
					style={{ cursor: "pointer", fontWeight: 500 }}
				>
					<span className='me-2'>+</span> Добавить продукт
				</div>
			</div>

			<div className='card_body p-0'>
				{order.products && order.products.length > 0 ? (
					<div className='list-group list-group-flush'>
						<div className={s.orderDetails__body}>
							<OrderProductsList products={order.products} />
						</div>
					</div>
				) : (
					<div className='p-5 text-center text-muted'>
						В этом приходе еще нет товаров.
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderDetails;
