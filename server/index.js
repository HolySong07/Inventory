// server/server.js
import express from "express";
import { createServer } from "http";

import mysql from "mysql2/promise";
import cors from "cors";
import { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = createServer(app);

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

app.get("/api/orders", async (req, res) => {
	try {
		const [orders] = await pool.query("SELECT * FROM orders");
		const [products] = await pool.query("SELECT * FROM products");
		const [prices] = await pool.query("SELECT * FROM prices");

		const result = orders.map((order) => {
			const orderProducts = products
				.filter((p) => p.order_id === order.id)
				.map((prod) => {
					const productPrices = prices.filter(
						(pr) => pr.product_id === prod.id
					);
					return { ...prod, price: productPrices };
				});

			return {
				...order,
				products: orderProducts
			};
		});

		res.json(result);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Ошибка сервера" });
	}
});

let activeTabs = 0;

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
	activeTabs++;
	broadcastActiveTabs();

	ws.on("close", () => {
		activeTabs--;
		broadcastActiveTabs();
	});
});

function broadcastActiveTabs() {
	const data = JSON.stringify({ activeTabs });
	wss.clients.forEach((client) => {
		if (client.readyState === 1) client.send(data);
	});
}

app.get("/api/products", async (req, res) => {
	try {
		const [products] = await pool.query("SELECT * FROM products");
		const [orders] = await pool.query("SELECT * FROM orders");
		const [prices] = await pool.query("SELECT * FROM prices");

		const result = products.map((prod) => {
			const productPrices = prices.filter(
				(pr) => pr.product_id === prod.id
			);

			const parentOrder = orders.find((o) => o.id === prod.order_id);

			return {
				...prod,
				price: productPrices,
				order_title: parentOrder ? parentOrder.title : "Без прихода"
			};
		});

		res.json(result);
	} catch (err) {
		console.error("Ошибка в /api/products:", err);
		res.status(500).json({
			error: "Ошибка сервера при получении продуктов"
		});
	}
});

httpServer.listen(process.env.PORT, () =>
	console.log(`server running on port ${process.env.PORT}`)
);
