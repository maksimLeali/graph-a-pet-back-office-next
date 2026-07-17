"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { PlatformPermissions } from "@/lib/permissions";
import { Spinner } from "@/components/ui/Spinner";
import { ROLE_LABEL } from "@/lib/navigation/roleLabels";
import { $color, $uw } from "@/theme";

/** Scelta del rifugio quando l'utente ne gestisce più di uno. */
export default function SelectShelterPage() {
	const router = useRouter();
	const { loading, shelters, platformPermissions } = useBackofficeAuth();

	// nessuna scelta da fare: vai dove si può
	useEffect(() => {
		if (loading) return;
		if (shelters.length === 1) {
			router.replace(`/shelters/${shelters[0].shelter.id}/dashboard`);
		} else if (shelters.length === 0) {
			// l'area platform richiede il gate esplicito, non basta una
			// qualsiasi permission platform (PLATFORM_USER le ha sempre)
			router.replace(
				platformPermissions.has(PlatformPermissions.BACKOFFICE_ACCESS)
					? "/platform/dashboard"
					: "/403"
			);
		}
	}, [loading, shelters, platformPermissions, router]);

	if (loading || shelters.length <= 1) {
		return (
			<Screen>
				<Spinner />
			</Screen>
		);
	}

	return (
		<Screen>
			<Card>
				<Title>Scegli il rifugio</Title>
				<Sub>Gestisci più strutture: seleziona quella su cui lavorare.</Sub>
				<List>
					{shelters.map((s) => (
						<Row
							key={s.shelter.id}
							type="button"
							onClick={() =>
								router.push(`/shelters/${s.shelter.id}/dashboard`)
							}
						>
							<span>
								<Name>{s.shelter.name}</Name>
								{s.shelter.city && <City>{s.shelter.city}</City>}
							</span>
							{/* informativo, mai autorizzativo */}
							<Role>
								{s.roles.map((r) => ROLE_LABEL[r] ?? r).join(", ")}
							</Role>
						</Row>
					))}
				</List>
			</Card>
		</Screen>
	);
}

const Screen = styled.main`
	display: flex;
	min-height: 100dvh;
	align-items: center;
	justify-content: center;
	padding: ${$uw(1.5)};
`;

const Card = styled.div`
	width: 100%;
	max-width: ${$uw(28)};
	border: 1px solid ${$color("border")};
	background: ${$color("card")};
	border-radius: ${$uw(1)};
	padding: ${$uw(2)};
`;

const Title = styled.h1`
	margin: 0;
	font-size: 2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const Sub = styled.p`
	margin: ${$uw(0.25)} 0 ${$uw(1.25)};
	font-size: 1.4rem;
	color: ${$color("muted")};
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.5)};
`;

const Row = styled.button`
	display: flex;
	width: 100%;
	cursor: pointer;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(1)};
	border: 1px solid ${$color("border")};
	background: ${$color("background")};
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.75)} ${$uw(1)};
	text-align: left;
	transition: border-color 0.15s ease, background 0.15s ease;
	&:hover {
		border-color: ${$color("primary")};
		background: ${$color("primary-soft")};
	}
`;

const Name = styled.span`
	display: block;
	font-size: 1.5rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const City = styled.span`
	display: block;
	font-size: 1.2rem;
	color: ${$color("muted")};
`;

const Role = styled.span`
	flex-shrink: 0;
	font-size: 1.2rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("primary")};
`;
