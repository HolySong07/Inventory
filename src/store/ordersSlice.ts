import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/types/types";

interface OrdersState {
	items: Order[];
	loading: boolean;
	selectedOrderId: number | null;
	orderToDeleteId: number | null;
	isDeleteModalOpen: boolean;
}

const initialState: OrdersState = {
	items: [],
	loading: false,
	selectedOrderId: null,
	orderToDeleteId: null,
	isDeleteModalOpen: false
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrders: (state, action: PayloadAction<Order[]>) => {
			state.items = action.payload;
		},
		setSelectedOrder: (state, action: PayloadAction<number | null>) => {
			state.selectedOrderId = action.payload;
		},
		openDeleteModal: (state, action: PayloadAction<number>) => {
			state.orderToDeleteId = action.payload;
			state.isDeleteModalOpen = true;
		},
		closeDeleteModal: (state) => {
			state.isDeleteModalOpen = false;
			state.orderToDeleteId = null;
		}
	}
});

export const {
	setOrders,
	setSelectedOrder,
	openDeleteModal,
	closeDeleteModal
} = ordersSlice.actions;

export default ordersSlice.reducer;
