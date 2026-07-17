"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

import { auth, SessionUser } from "@/lib/auth";
import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { SHELTER_SECTIONS } from "@/lib/navigation/shelterSections";
import { $color, $uw } from "@/theme";
import { ThemeToggle } from "./ThemeToggle";
import { ShelterSwitcher } from "./ShelterSwitcher";

const TITLES: [RegExp, string][] = [
	[/^\/platform\/dashboard/, "Dashboard"],
	[/^\/platform\/pets\/.+/, "Dettaglio animale"],
	[/^\/platform\/pets/, "Animali"],
	[/^\/platform\/users\/.+/, "Dettaglio utente"],
	[/^\/platform\/users/, "Utenti"],
	[/^\/platform\/shelters\/.+/, "Dettaglio rifugio"],
	[/^\/platform\/shelters/, "Rifugi"],
	[/^\/platform\/claims/, "Verifiche rifugi"],
	[/^\/platform\/statistics/, "Statistiche"],
	[/^\/platform\/translations/, "Traduzioni"],
	[/^\/platform\/me/, "Profilo"],
	[/^\/platform\/donations/, "Donazioni"],
	[/^\/platform\/roles-permissions/, "Ruoli e Permessi"],
];

const BACKLINKS: [RegExp, { href: string; label: string }][] = [
	[/^\/platform\/pets\/.+/, { href: "/platform/pets", label: "Animali" }],
	[/^\/platform\/users\/.+/, { href: "/platform/users", label: "Utenti" }],
	[
		/^\/platform\/shelters\/.+/,
		{ href: "/platform/shelters", label: "Rifugi" },
	],
];

export const Topbar: React.FC = () => {
	const pathname = usePathname();
	const { currentShelter } = useBackofficeAuth();
	const [user, setUser] = useState<SessionUser | null>(null);

	// cookie leggibile solo client-side: evita mismatch di hydration
	useEffect(() => {
		setUser(auth.getUser());
	}, []);

	const inShelterArea = pathname.startsWith("/shelters/");

	let title: string;
	let back: { href: string; label: string } | undefined;
	if (inShelterArea) {
		const section = pathname.split("/")[3] ?? "dashboard";
		const sectionLabel =
			SHELTER_SECTIONS.find((s) => s.section === section)?.label ??
			"Dashboard";
		// il rifugio corrente è sempre visibile accanto alla sezione: chi
		// gestisce più strutture deve sapere dove sta operando
		title = currentShelter
			? `${sectionLabel} · ${currentShelter.shelter.name}`
			: sectionLabel;
		back = undefined;
	} else {
		title = TITLES.find(([re]) => re.test(pathname))?.[1] ?? "";
		back = BACKLINKS.find(([re]) => re.test(pathname))?.[1];
	}

	return (
		<Header>
			<Left>
				{back && <BackLink href={back.href}>← {back.label}</BackLink>}
				<Title>{title}</Title>
			</Left>
			<Right>
				{inShelterArea && <ShelterSwitcher />}
				<ThemeToggle />
				{user && (
					<UserName>
						{user.first_name} {user.last_name}
					</UserName>
				)}
			</Right>
		</Header>
	);
};

const Header = styled.header`
	display: flex;
	height: ${$uw(4)};
	flex-shrink: 0;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${$color("border")};
	background: ${$color("background")};
	padding: 0 ${$uw(1.5)};
`;

const Left = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
	min-width: 0;
`;

const BackLink = styled(Link)`
	font-size: 1.3rem;
	color: ${$color("dim")};
	transition: color 0.15s ease;
	&:hover {
		color: ${$color("primary")};
	}
`;

const Title = styled.h1`
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 1.7rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const Right = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	gap: ${$uw(0.75)};
	font-size: 1.3rem;
`;

const UserName = styled.span`
	color: ${$color("muted")};
`;
