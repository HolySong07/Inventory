import axios from "axios";
import { store } from "@/store/store";
import { setProducts } from "@/store/productsSlice";

export const productsLoader = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_API_URL}/api/products`
		);
		store.dispatch(setProducts(res.data));
		return res.data;
	} catch (err) {
		console.error("Ошибка загрузки продуктов:", err);
		throw new Error("Не удалось загрузить продукты");
	}
};
