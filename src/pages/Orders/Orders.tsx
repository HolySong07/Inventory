import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import OrdersItem from "@/pages/Orders/OrdersItem";
import OrderDetails from "@/pages/Orders/OrderDetails";
import DeleteModal from "@/components/DeleteModal";
import OrdersHeader from "@/components/OrdersHeader";

const Orders: React.FC = () => {
	const orders = useSelector((state: RootState) => state.orders.items);

	const selectedOrderId = useSelector(
		(state: RootState) => state.orders.selectedOrderId
	);
	const isAnySelected = selectedOrderId !== null;

	return (
		<div className='container-fluid p-4 bg-light min-vh-100'>
			<OrdersHeader />
			<div className='row'>
				<div className={selectedOrderId ? "col-md-4" : "col-md-12"}>
					{orders.map((order) => (
						<OrdersItem
							key={order.id}
							order={order}
							isSelected={selectedOrderId === order.id}
							isAnySelected={isAnySelected}
						/>
					))}
				</div>

				{selectedOrderId && (
					<div className='col-md-8'>
						<OrderDetails />
					</div>
				)}
			</div>

			<DeleteModal />
		</div>
	);
};

export default Orders;
