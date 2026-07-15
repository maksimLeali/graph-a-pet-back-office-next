"use client";

import styled from "styled-components";

import {
	DonationScopeProvider,
	useDonationScope,
} from "@/lib/donations/DonationScopeContext";
import { TestModeBanner } from "@/components/donations/TestModeBanner";
import { DonationNav, DonationNavEntry } from "@/components/donations/DonationNav";
import { ShelterPicker } from "@/components/donations/ShelterPicker";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { ShelterPermissions, PlatformPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

function DonationsShell({ children }: React.PropsWithChildren) {
	const {
		scope,
		setScope,
		hasShelterAccess,
		hasPlatformAccess,
		candidatesLoading,
		shelterAuth,
		platformAuth,
	} = useDonationScope();

	if (candidatesLoading || platformAuth.loading) {
		return <Spinner />;
	}

	if (!hasShelterAccess && !hasPlatformAccess) {
		return (
			<EmptyState
				title="Nessun accesso alle donazioni"
				description="Non hai nessun permesso relativo alle donazioni, né su un rifugio né a livello piattaforma."
			/>
		);
	}

	const shelterNav: DonationNavEntry[] = [
		{ href: "/donations/overview", label: "Panoramica", visible: true },
		{
			href: "/donations/transactions",
			label: "Transazioni",
			visible: shelterAuth.can(ShelterPermissions.DONATIONS_READ),
		},
		{
			href: "/donations/funding-needs",
			label: "Fabbisogni",
			visible: shelterAuth.can(ShelterPermissions.FUNDING_NEEDS_READ),
		},
		{
			href: "/donations/expenses",
			label: "Spese",
			visible: shelterAuth.can(ShelterPermissions.EXPENSES_READ),
		},
		{
			href: "/donations/reports",
			label: "Report",
			visible: shelterAuth.can(ShelterPermissions.FINANCIAL_REPORTS_READ),
		},
		{
			href: "/donations/settings",
			label: "Impostazioni",
			visible: shelterAuth.can(ShelterPermissions.DONATIONS_SETTINGS_MANAGE),
		},
	];

	const platformNav: DonationNavEntry[] = [
		{ href: "/donations/overview", label: "Panoramica", visible: true },
		{
			href: "/donations/transactions",
			label: "Transazioni",
			visible: platformAuth.can(PlatformPermissions.DONATIONS_READ),
		},
		{
			href: "/donations/disputes",
			label: "Dispute",
			visible: platformAuth.can(PlatformPermissions.DISPUTES_READ),
		},
		{
			href: "/donations/connected-accounts",
			label: "Conti collegati",
			visible: platformAuth.can(PlatformPermissions.CONNECTED_ACCOUNTS_READ),
		},
		{
			href: "/donations/ledger",
			label: "Registro",
			visible: platformAuth.can(PlatformPermissions.FINANCIAL_LEDGER_READ),
		},
		{
			href: "/donations/webhooks",
			label: "Webhook",
			visible: platformAuth.can(PlatformPermissions.WEBHOOKS_READ),
		},
	];

	return (
		<Page>
			<TestModeBanner />
			<HeaderRow>
				<Title>Donazioni</Title>
				{hasShelterAccess && hasPlatformAccess && (
					<ScopeSwitch>
						<Button
							type="button"
							variant={scope === "shelter" ? "primary" : "ghost"}
							onClick={() => setScope("shelter")}
						>
							Rifugio
						</Button>
						<Button
							type="button"
							variant={scope === "platform" ? "primary" : "ghost"}
							onClick={() => setScope("platform")}
						>
							Piattaforma
						</Button>
					</ScopeSwitch>
				)}
			</HeaderRow>

			{scope === "shelter" && hasShelterAccess && <ShelterPicker />}

			<DonationNav entries={scope === "platform" ? platformNav : shelterNav} />

			<Content>{children}</Content>
		</Page>
	);
}

export default function DonationsLayout({
	children,
}: Readonly<React.PropsWithChildren>) {
	return (
		<DonationScopeProvider>
			<DonationsShell>{children}</DonationsShell>
		</DonationScopeProvider>
	);
}

const Page = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.25)};
`;

const HeaderRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(0.75)};
`;

const Title = styled.h2`
	margin: 0;
	font-size: 2.2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const ScopeSwitch = styled.div`
	display: flex;
	gap: ${$uw(0.5)};
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;
