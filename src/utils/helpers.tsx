import { Product } from "@/types/types";

export const MONTHS = [
	"Янв",
	"Фев",
	"Мар",
	"Апр",
	"Май",
	"Июн",
	"Июл",
	"Авг",
	"Сен",
	"Окт",
	"Ноя",
	"Дек"
];
export const WEEKDAYS = [
	"Воскресенье",
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота"
];

export const formatDateShort = (dateString: string | Date): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	return `${day} / ${month}`;
};

export const formatDateLong = (dateString: string | Date): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, "0");
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();
	return `${day} / ${month} / ${year}`;
};

export const formatFullDate = (date: Date) => {
	const dayName = WEEKDAYS[date.getDay()];
	const dayNum = String(date.getDate()).padStart(2, "0");
	const monthName = MONTHS[date.getMonth()];

	return (
		<div>
			<div className='me-2'>{dayName}</div>
			<div>
				{dayNum} {monthName}, {date.getFullYear()}
			</div>
		</div>
	);
};

export const calculateTotals = (products: Product[]) => {
	let totalUSD = 0;
	let totalUAH = 0;

	products?.forEach((product) => {
		product.price?.forEach((p: any) => {
			const value = parseFloat(p.value);
			if (p.symbol === "USD") totalUSD += value;
			else if (p.symbol === "UAH") totalUAH += value;
		});
	});

	return {
		totalUSD: totalUSD.toLocaleString("en-US", {
			maximumFractionDigits: 2
		}),
		totalUAH: totalUAH.toLocaleString("ru-RU", { maximumFractionDigits: 2 })
	};
};
