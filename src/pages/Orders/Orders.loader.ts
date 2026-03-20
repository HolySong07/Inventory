import axios from "axios";
import { store } from "@/store/store";
import { setOrders } from "@/store/ordersSlice";

export const ordersLoader = async () => {
	try {
		const res = await axios.get(
			`${import.meta.env.VITE_API_URL}/api/orders`
		);
		store.dispatch(setOrders(res.data));
		return res.data;
	} catch (err) {
		console.error("Ошибка загрузки заказов:", err);
		throw new Error("Не удалось загрузить заказы");
	}
};
