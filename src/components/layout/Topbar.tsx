"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";

import { auth, SessionUser } from "@/lib/auth";
import { $color, $uw } from "@/theme";
import { ThemeToggle } from "./ThemeToggle";

const TITLES: [RegExp, string][] = [
	[/^\/dashboard/, "Dashboard"],
	[/^\/pets\/.+/, "Dettaglio animale"],
	[/^\/pets/, "Animali"],
	[/^\/users\/.+/, "Dettaglio utente"],
	[/^\/users/, "Utenti"],
	[/^\/shelters\/.+/, "Dettaglio rifugio"],
	[/^\/shelters/, "Rifugi"],
	[/^\/statistics/, "Statistiche"],
	[/^\/translations/, "Traduzioni"],
	[/^\/me/, "Profilo"],
];

const BACKLINKS: [RegExp, { href: string; label: string }][] = [
	[/^\/pets\/.+/, { href: "/pets", label: "Animali" }],
	[/^\/users\/.+/, { href: "/users", label: "Utenti" }],
	[/^\/shelters\/.+/, { href: "/shelters", label: "Rifugi" }],
];

export const Topbar: React.FC = () => {
	const pathname = usePathname();
	const [user, setUser] = useState<SessionUser | null>(null);

	// cookie leggibile solo client-side: evita mismatch di hydration
	useEffect(() => {
		setUser(auth.getUser());
	}, []);

	const title = TITLES.find(([re]) => re.test(pathname))?.[1] ?? "";
	const back = BACKLINKS.find(([re]) => re.test(pathname))?.[1];

	return (
		<Header>
			<Left>
				{back && <BackLink href={back.href}>← {back.label}</BackLink>}
				<Title>{title}</Title>
			</Left>
			<Right>
				<ThemeToggle />
				{user && (
					<>
						<UserName>
							{user.first_name} {user.last_name}
						</UserName>
						<RoleBadge>{user.role ?? "admin"}</RoleBadge>
					</>
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
	font-size: 1.7rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const Right = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
	font-size: 1.3rem;
`;

const UserName = styled.span`
	color: ${$color("muted")};
`;

const RoleBadge = styled.span`
	border-radius: 999px;
	background: ${$color("primary-soft")};
	padding: ${$uw(0.25)} ${$uw(0.6)};
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${$color("primary")};
`;
