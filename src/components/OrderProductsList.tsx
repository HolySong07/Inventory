import { FiTrash2 } from "react-icons/fi";
import s from "@/styles/Orders.module.css";
import { Product } from "@/types/types";

interface Props {
	products: Product[];
}

const OrderProductsList: React.FC<Props> = ({ products }) => {
	if (!products || products.length === 0) {
		return (
			<div className='p-5 text-center text-muted'>
				В этом ордере нет товаров.
			</div>
		);
	}

	return (
		<div className='list-group list-group-flush'>
			{products.map((prod) => (
				<div
					key={prod.id}
					className='list-group-item d-flex align-items-center py-3 px-4 border-top block__element'
				>
					<span
						className={`${s.orderProducts__dot} text-success me-3`}
					>
						●
					</span>
					<img
						src={prod.photo}
						alt={prod.title}
						className={`${s.orderProducts__img} me-3`}
					/>
					<div className='flex-grow-1'>
						<div
							className={`${s.orderProducts__title} text-decoration-underline`}
						>
							{prod.title}
						</div>
						<small className='text-muted text-uppercase'>
							{prod.serialNumber}
						</small>
					</div>
					<div
						className={`${s.orderProducts__status} text-success me-5`}
					>
						Свободен
					</div>
					<button className='btn text-muted p-0 border-0'>
						<FiTrash2 className='trashIcon' />
					</button>
				</div>
			))}
		</div>
	);
};

export default OrderProductsList;
