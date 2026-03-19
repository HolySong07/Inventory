import axios from "axios";
import { store } from "@/store/store";
import { setProducts } from "@/store/productsSlice";

export const productsLoader = async () => {
	try {
		const res = await axios.get("http://localhost:3000/api/products");
		store.dispatch(setProducts(res.data));
		return res.data;
	} catch (err) {
		console.error("Ошибка загрузки продуктов:", err);
		throw new Error("Не удалось загрузить продукты");
	}
};
