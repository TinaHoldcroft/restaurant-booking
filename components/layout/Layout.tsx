import Head from "next/head";
import type { PropsWithChildren } from "react";
import { Particles } from "../particles/Particles";

interface LayoutProps {
	title: string;
	className: string;
}

export const Layout = ({ title, children, className }: PropsWithChildren<LayoutProps>) => {
	return (
		<>
			<Head>
				<title>{`${title ?? "Home"} |  Restaurant Booking Page`}</title>
			</Head>
			<Particles />
			<main className={className}>{children}</main>
		</>
	);
};
