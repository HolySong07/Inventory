import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductItem from "@/pages/Products/ProductItem";

const Products: React.FC = () => {
	const products = useSelector((state: RootState) => state.products.items);
	const [selectedType, setSelectedType] = useState("Все");

	const types = useMemo(
		() => ["Все", ...new Set(products.map((p) => p.type))],
		[products]
	);

	const filteredProducts = products.filter((p) =>
		selectedType === "Все" ? true : p.type === selectedType
	);

	return (
		<div className='container-fluid p-4 container-fluid p-4 bg-light min-vh-100'>
			<div className='d-flex align-items-center mb-4'>
				<h1 className='h4 me-4'>
					Продукты / {filteredProducts.length}
				</h1>
				<div className='d-flex align-items-center'>
					<label className='me-2'>Тип:</label>
					<select
						className='form-select form-select-sm w-auto'
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						{types.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className='product-list'>
				{filteredProducts.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Products;
