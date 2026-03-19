import { Product } from "@/types/types";
import s from "@/styles/ProductItem.module.css";
import { FiTrash2 } from "react-icons/fi";

const ProductItem = ({ product }: { product: Product }) => {
	const {
		title,
		type,
		guarantee_start,
		guarantee_end,
		price,
		order_title,
		photo
	} = product;

	return (
		<div className='card mb-2 shadow-sm border-0'>
			<div className='block__element card-body d-flex align-items-center justify-content-between'>
				<div className={`d-flex align-items-center ${s.product}`}>
					<div
						className={`bg-success rounded-circle me-3 ${s.circle_list}`}
					></div>
					<img
						src={photo}
						alt={title}
						className={`me-3 ${s.photo}`}
					/>
					<div>
						<div className='fw-bold text-secondary'>{title}</div>
						<small className='text-muted'>
							{product.serialNumber}
						</small>
					</div>
				</div>
				<div className={s.type}>{type}</div>
				<div className={`small ${s.guarantee}`}>
					<div>
						<span className='text-muted'>с</span>{" "}
						{new Date(guarantee_start).toLocaleDateString()}
					</div>
					<div>
						<span className='text-muted'>по</span>{" "}
						{new Date(guarantee_end).toLocaleDateString()}
					</div>
				</div>
				<div className={s.money}>
					{price?.map((p, idx) => (
						<div
							key={idx}
							className={
								p.isDefault ? "fw-bold" : "text-muted small"
							}
						>
							{p.value} {p.symbol}
						</div>
					))}
				</div>
				<div
					className={`text-decoration-underline text-secondary ${s.coming}`}
				>
					{order_title}
				</div>
				<button className='btn text-muted'>
					<FiTrash2 className='trashIcon' />
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
