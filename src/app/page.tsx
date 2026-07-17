"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { Spinner } from "@/components/ui/Spinner";

/**
 * Routing post-login basato sugli accessi verificati dal backend:
 * platform → /platform/dashboard; un solo rifugio → la sua dashboard;
 * più rifugi → ultimo valido o /select-shelter; nessun accesso → /403.
 */
export default function Home() {
	const router = useRouter();
	const { loading, authenticated, homeRoute } = useBackofficeAuth();

	useEffect(() => {
		if (!authenticated) {
			router.replace("/login");
			return;
		}
		if (!loading) router.replace(homeRoute());
	}, [authenticated, loading, homeRoute, router]);

	return (
		<Center>
			<Spinner />
		</Center>
	);
}

const Center = styled.main`
	display: flex;
	min-height: 100dvh;
	align-items: center;
	justify-content: center;
`;
