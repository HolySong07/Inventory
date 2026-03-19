import { useEffect, useState } from "react";
import { formatFullDate } from "@/utils/helpers";
import { FaRegClock } from "react-icons/fa";
import Logo from "./Logo";
import s from "@/styles/Logo.module.css";

export default function TopMenu() {
	const [time, setTime] = useState(new Date());
	const [activeTabs, setActiveTabs] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080");
		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				if (data.activeTabs !== undefined)
					setActiveTabs(data.activeTabs);
			} catch (e) {
				console.error("Invalid WS message", e);
			}
		};
		return () => ws.close();
	}, []);

	const formattedTime = `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`;

	return (
		<div className='d-flex justify-content-between bg-white p-3 border-bottom shadow-sm'>
			<Logo />
			<div className='d-flex justify-content-between'>
				<div className='me-4 d-flex '>
					<span className='text-muted me-3'>
						{formatFullDate(time)}
					</span>
					<span className='fw-bold d-flex align-items-end'>
						<FaRegClock className={`me-2 mb-1 ${s.clock}`} />
						{formattedTime}
					</span>
				</div>
				<div className='d-flex align-items-end'>
					<span className='small text-muted me-2'>Вкладок:</span>
					<span className={`badge rounded-pill ${s.count} px-3`}>
						{activeTabs}
					</span>
				</div>
			</div>
		</div>
	);
}
