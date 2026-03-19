import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeDeleteModal } from "@/store/ordersSlice";
import { FiTrash2 } from "react-icons/fi";
import s from "@/styles/Modal.module.css";

const DeleteModal: React.FC = () => {
	const dispatch = useDispatch();

	const { isDeleteModalOpen, orderToDeleteId, items } = useSelector(
		(state: RootState) => state.orders
	);
	const order = items.find((o) => Number(o.id) === Number(orderToDeleteId));

	if (!isDeleteModalOpen || !order) return null;

	const handleDelete = () => {
		dispatch(closeDeleteModal());
	};

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			dispatch(closeDeleteModal());
		}
	};

	return ReactDOM.createPortal(
		<div className={s.modalOverlay} onClick={handleOverlayClick}>
			<div className={`${s.deleteModal} shadow-lg`}>
				<button
					className={`${s.deleteModal__closeBtn} shadow-sm`}
					onClick={() => dispatch(closeDeleteModal())}
				>
					✕
				</button>
				<div className='p-4'>
					<h5 className='fw-bold mb-4'>
						Вы уверены, что хотите удалить этот приход?
					</h5>
					<div className='d-flex align-items-center'>
						<span className={`${s.dot} text-success me-3`}>●</span>
						<img
							src={
								order.products?.[0]?.photo ||
								"https://placehold.co/100x100?text=No+Photo"
							}
							alt='preview'
							className={`${s.delete_img} me-3`}
						/>
						<div>
							<div className='text-decoration-underline small'>
								{order.title}
							</div>
						</div>
					</div>
				</div>
				<div className={s.deleteModal__footer}>
					<button
						className='btn btn-link text-white text-decoration-none fw-bold me-4'
						onClick={() => dispatch(closeDeleteModal())}
					>
						ОТМЕНИТЬ
					</button>
					<button
						className='btn-delete-confirm shadow-sm'
						onClick={handleDelete}
					>
						<span className='text-danger me-2'>
							<FiTrash2 className={s.trashIcon} />
						</span>
						УДАЛИТЬ
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default DeleteModal;
