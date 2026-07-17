"use client";

import { use } from "react";
import styled from "styled-components";

import { Sidebar, SIDEBAR_WIDTH } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Spinner } from "@/components/ui/Spinner";
import { Forbidden } from "@/components/authz/Forbidden";
import { PlatformAdminBanner } from "@/components/authz/PlatformAdminBanner";
import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { $uw } from "@/theme";

/**
 * Area rifugio (/shelters/:shelterId/*). Il layout verifica che lo shelter
 * nella URL sia tra gli accessi autorizzati dal backend (membership ACTIVE +
 * shelters.backoffice.access): mai fidarsi della URL o di localStorage.
 * Ogni pagina ri-verifica poi la propria permission funzionale.
 *
 * `key={shelterId}` sul contenuto: il cambio rifugio è un cambio di tenant,
 * lo stato locale delle pagine (filtri, selezioni) viene azzerato.
 */
export default function ShelterAreaLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ shelterId: string }>;
}>) {
	const { shelterId } = use(params);
	const { loading, error, currentShelter, shelters } = useBackofficeAuth();

	let body: React.ReactNode;
	if (loading) {
		body = (
			<Center>
				<Spinner />
			</Center>
		);
	} else if (!currentShelter) {
		body = (
			<Forbidden
				message={
					error
						? `Impossibile verificare gli accessi: ${error}`
						: "Non hai accesso al back office di questo rifugio."
				}
				homeHref={shelters.length > 0 ? "/select-shelter" : "/"}
			/>
		);
	} else {
		body = children;
	}

	return (
		<Shell>
			<Sidebar />
			<Column>
				<Topbar />
				{/* indicatore persistente: accesso via privilegio platform */}
				<PlatformAdminBanner />
				<Main key={shelterId}>{body}</Main>
			</Column>
		</Shell>
	);
}

const Shell = styled.div`
	height: 100dvh;
	overflow: hidden;
`;

const Column = styled.div`
	display: flex;
	height: 100%;
	min-width: 0;
	margin-left: ${SIDEBAR_WIDTH};
	flex-direction: column;
`;

const Main = styled.main`
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	overflow-x: hidden;
	padding: ${$uw(1.5)};
`;

const Center = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
