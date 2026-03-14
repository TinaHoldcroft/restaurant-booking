import cn from "classnames";
import type { ReactNode } from "react";

import styles from "./Button.module.scss";

interface ButtonProps {
	type?: "button" | "submit" | "reset";
	style: "primary" | "secondary";
	children: ReactNode;
	href?: string;
	onClick?: () => void;
	className?: string;
	target?: string;
	rel?: string;
}

export const Button = ({ className, type = "button", children, href, style, onClick, target, rel }: ButtonProps) =>
	href ? (
		<a
			href={href}
			target={target}
			rel={rel}
			className={cn(styles.button, className, {
				[styles["button--primary"]]: style === "primary",
				[styles["button--secondary"]]: style === "secondary",
				[styles["button--link"]]: href,
			})}
		>
			{children}
		</a>
	) : (
		<button
			type={type}
			className={cn(styles.button, className, {
				[styles["button--primary"]]: style === "primary",
				[styles["button--secondary"]]: style === "secondary",
			})}
			onClick={onClick}
		>
			{children}
		</button>
	);
