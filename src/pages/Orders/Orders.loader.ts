import axios from "axios";
import { store } from "@/store/store";
import { setOrders } from "@/store/ordersSlice";

export const ordersLoader = async () => {
	try {
		const res = await axios.get("http://localhost:3000/api/orders");
		store.dispatch(setOrders(res.data));
		return res.data;
	} catch (err) {
		console.error("Ошибка загрузки заказов:", err);
		throw new Error("Не удалось загрузить заказы");
	}
};
