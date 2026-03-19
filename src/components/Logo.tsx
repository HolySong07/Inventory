import React from "react";
import { GoShieldCheck } from "react-icons/go";
import s from "@/styles/Logo.module.css";

const Logo: React.FC = () => {
	return (
		<div className={`${s.logo} d-flex align-items-center`}>
			<div className={s.logo__iconWrapper}>
				<GoShieldCheck className={s.logo__icon} />
			</div>
			<span className={s.logo__text}>Inventory</span>
		</div>
	);
};

export default Logo;
