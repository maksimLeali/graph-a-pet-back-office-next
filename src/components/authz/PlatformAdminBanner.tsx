"use client";

import styled from "styled-components";

import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { $color, $uw } from "@/theme";

/**
 * Indicatore persistente: il rifugio corrente è aperto tramite privilegio
 * platform (accessMode = PLATFORM_ADMIN), senza membership. Nessun ruolo o
 * membership viene creato; le operazioni sensibili sono registrate in audit
 * dal backend.
 */
export const PlatformAdminBanner: React.FC = () => {
	const { currentShelter } = useBackofficeAuth();
	if (currentShelter?.accessMode !== "PLATFORM_ADMIN") return null;
	return (
		<Banner role="status">
			<Tag>Platform admin</Tag>
			<span>
				Stai operando su <b>{currentShelter.shelter.name}</b> con
				privilegi platform, senza membership: le operazioni sensibili
				vengono registrate nell&apos;audit.
			</span>
		</Banner>
	);
};

const Banner = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	gap: ${$uw(0.6)};
	border-bottom: 1px solid ${$color("border")};
	background: ${$color("surface")};
	padding: ${$uw(0.5)} ${$uw(1.5)};
	font-size: 1.3rem;
	color: ${$color("text")};
`;

const Tag = styled.span`
	flex-shrink: 0;
	border-radius: 999px;
	background: ${$color("warning")};
	padding: ${$uw(0.15)} ${$uw(0.6)};
	font-size: 1.05rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: #1c1c1c;
`;
