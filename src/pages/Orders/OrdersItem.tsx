import React from "react";
import { useDispatch } from "react-redux";
import { Order } from "../../types/types";
import { setSelectedOrder, openDeleteModal } from "../../store/ordersSlice";
import {
	formatDateShort,
	formatDateLong,
	calculateTotals
} from "@/utils/helpers";
import { HiOutlineListBullet } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import s from "@/styles/Orders.module.css";

interface OrdersItemProps {
	order: Order;
	isSelected: boolean;
	isAnySelected: boolean;
}

const OrdersItem: React.FC<OrdersItemProps> = ({
	order,
	isSelected,
	isAnySelected
}) => {
	const dispatch = useDispatch();
	const { totalUSD, totalUAH } = calculateTotals(order.products || []);

	const handleSelect = () => {
		dispatch(setSelectedOrder(isSelected ? null : order.id));
	};

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(openDeleteModal(order.id));
	};

	return (
		<div
			className={`${s.orderСard} card mb-3 shadow-sm block__element  border-0 position-relative ${isSelected ? "selected-border" : ""}`}
			onClick={handleSelect}
			style={{ cursor: "pointer", borderRadius: "8px" }}
		>
			<div
				className={`card-body d-flex ${isAnySelected ? "justify-content-start items-selected" : "justify-content-between"} align-items-center`}
			>
				{!isAnySelected && (
					<div
						className={`${s.orderСard__title} fw-medium text-secondary text-decoration-underline`}
					>
						{order.title}
					</div>
				)}
				<div className='d-flex align-items-center'>
					<div className='border rounded-circle p-2 me-4 d-flex align-items-center justify-content-center'>
						<HiOutlineListBullet className='list-icon' />
					</div>
					<div>
						<h5 className='m-0'>{order.products?.length || 0}</h5>
						<small className='text-muted'>Продукта</small>
					</div>
				</div>
				<div className='text-center date'>
					<div className='text-muted small'>
						{formatDateShort(order.date)}
					</div>
					<div className={s.long_date}>
						{formatDateLong(order.date)}
					</div>
				</div>
				{!isAnySelected && (
					<div className='text-end min-w-10'>
						<div className='text-muted small'>{totalUSD} $</div>
						<div className='fw-bold'>{totalUAH} UAH</div>
					</div>
				)}
				{!isAnySelected && (
					<button
						className='btn text-muted p-0 border-0'
						onClick={handleDeleteClick}
					>
						<FiTrash2 className='trashIcon' />
					</button>
				)}
				{isSelected && <div className='active-arrow shadow-sm'>❯</div>}
			</div>
		</div>
	);
};

export default OrdersItem;
