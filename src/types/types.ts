export interface Price {
	id?: number;
	product_id: number;
	value: number;
	symbol: string;
	isDefault: number;
}

export interface Product {
	id: number;
	serialNumber: number;
	isNew: number;
	photo: string;
	title: string;
	type: string;
	specification: string;
	guarantee_start: string;
	guarantee_end: string;
	order_title: string;
	order_id: number;
	date: string;
	price?: Price[];
}

export interface Order {
	id: number;
	title: string;
	date: string;
	description: string;
	products?: Product[];
}
