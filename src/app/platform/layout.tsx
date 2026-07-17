"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

import { Sidebar, SIDEBAR_WIDTH } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { Spinner } from "@/components/ui/Spinner";
import { Forbidden } from "@/components/authz/Forbidden";
import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { PlatformPermissions } from "@/lib/permissions";
import { $uw } from "@/theme";

/**
 * Area platform (/platform/*): riservata a chi ha permission platform.
 * Un manager/admin di rifugio SENZA grant platform non entra qui: la sua
 * area è /shelters/:shelterId/*.
 *
 * Le sezioni con una permission platform dedicata la richiedono; le altre
 * (dashboard, statistiche, traduzioni, profilo, animali) restano dietro il
 * gate d'area platform.backoffice.access. Guard solo-UX: l'autorità è il
 * backend.
 */
const SECTION_PERMISSION: [RegExp, string][] = [
	[/^\/platform\/users/, PlatformPermissions.USERS_READ],
	[/^\/platform\/shelters/, PlatformPermissions.SHELTERS_READ],
	[/^\/platform\/claims/, PlatformPermissions.CLAIMS_REVIEW],
	[/^\/platform\/roles-permissions/, PlatformPermissions.ROLES_MANAGE],
];

export default function PlatformLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const pathname = usePathname();
	const { loading, canPlatform } = useBackofficeAuth();

	if (loading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	const sectionPerm = SECTION_PERMISSION.find(([re]) =>
		re.test(pathname)
	)?.[1];
	// /platform/donations è un modulo condiviso (scope shelter o platform):
	// si auto-autorizza via DonationScopeContext e non richiede il gate
	// d'area platform.backoffice.access. Il backend resta l'autorità.
	const isDonationsModule = pathname.startsWith("/platform/donations");
	const allowed = isDonationsModule
		? true
		: canPlatform(PlatformPermissions.BACKOFFICE_ACCESS) &&
		  (!sectionPerm || canPlatform(sectionPerm));

	return (
		<Shell>
			<Sidebar />
			<Column>
				<Topbar />
				<Main>
					{allowed ? (
						children
					) : (
						<Forbidden
							message="Quest'area richiede permission platform."
							homeHref="/"
						/>
					)}
				</Main>
			</Column>
		</Shell>
	);
}

// Sidebar è position:fixed (vedi Sidebar.tsx): Shell resta ancorato al viewport
// e non scrolla mai, solo Main scrolla il proprio contenuto.
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
	height: 100dvh;
	align-items: center;
	justify-content: center;
`;
