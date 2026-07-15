"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DonationsIndexPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/donations/overview");
	}, [router]);

	return null;
}
