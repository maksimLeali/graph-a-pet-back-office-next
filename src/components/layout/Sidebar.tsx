"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

import { auth } from "@/lib/auth";
import { useHasDonationsSidebarAccess } from "@/lib/donations/useHasDonationsSidebarAccess";
import { $color, $uw } from "@/theme";

const BASE_NAV = [
	{ href: "/dashboard", label: "Dashboard", icon: "◧" },
	{ href: "/pets", label: "Animali", icon: "◔" },
	{ href: "/users", label: "Utenti", icon: "◉" },
	{ href: "/shelters", label: "Rifugi", icon: "⌂" },
	{ href: "/statistics", label: "Statistiche", icon: "◫" },
	{ href: "/roles-permissions", label: "Ruoli e Permessi", icon: "◈" },
	{ href: "/translations", label: "Traduzioni", icon: "◭" },
	{ href: "/me", label: "Profilo", icon: "◍" },
];

const DONATIONS_ITEM = { href: "/donations", label: "Donazioni", icon: "♥" };

export const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	// permission-key-based (never a role name) — see useHasDonationsSidebarAccess
	const hasDonationsAccess = useHasDonationsSidebarAccess();

	const nav = hasDonationsAccess
		? [...BASE_NAV.slice(0, 4), DONATIONS_ITEM, ...BASE_NAV.slice(4)]
		: BASE_NAV;

	return (
		<Aside>
			<Brand>
				<BrandName>Graph-a-Pet</BrandName>
				<BrandSub>Back office</BrandSub>
			</Brand>

			<Nav>
				{nav.map(({ href, label, icon }) => {
					const active =
						pathname === href || pathname.startsWith(`${href}/`);
					return (
						<NavItem
							key={href}
							href={href}
							$active={active}
							aria-current={active ? "page" : undefined}
						>
							<NavIcon aria-hidden>{icon}</NavIcon>
							{label}
						</NavItem>
					);
				})}
			</Nav>

			<Foot>
				<LogoutButton
					type="button"
					onClick={() => {
						auth.logout();
						router.replace("/login");
					}}
				>
					<NavIcon aria-hidden>⏻</NavIcon>
					Esci
				</LogoutButton>
			</Foot>
		</Aside>
	);
};

export const SIDEBAR_WIDTH = $uw(16);

const Aside = styled.aside`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	display: flex;
	width: ${SIDEBAR_WIDTH};
	height: 100dvh;
	flex-shrink: 0;
	flex-direction: column;
	overflow-y: auto;
	border-right: 1px solid ${$color("border")};
	background: ${$color("background")};
`;

const Brand = styled.div`
	border-bottom: 1px solid ${$color("border")};
	padding: ${$uw(1.25)};
`;

const BrandName = styled.span`
	font-size: 1.7rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const BrandSub = styled.span`
	display: block;
	margin-top: ${$uw(0.2)};
	font-size: 1.1rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.15em;
	color: ${$color("primary")};
`;

const Nav = styled.nav`
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: ${$uw(0.25)};
	padding: ${$uw(0.75)};
`;

const NavItem = styled(Link)<{ $active: boolean }>`
	display: flex;
	align-items: center;
	gap: ${$uw(0.75)};
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.6)} ${$uw(0.8)};
	font-size: 1.4rem;
	font-weight: 500;
	transition: background 0.15s ease, color 0.15s ease;
	color: ${({ $active }) => ($active ? $color("primary") : $color("muted"))};
	background: ${({ $active }) => ($active ? $color("primary-soft") : "transparent")};
	&:hover {
		background: ${({ $active }) =>
			$active ? $color("primary-soft") : $color("surface")};
		color: ${({ $active }) => ($active ? $color("primary") : $color("text"))};
	}
`;

const NavIcon = styled.span`
	font-size: 1.6rem;
	line-height: 1;
`;

const Foot = styled.div`
	border-top: 1px solid ${$color("border")};
	padding: ${$uw(0.75)};
`;

const LogoutButton = styled.button`
	display: flex;
	width: 100%;
	cursor: pointer;
	align-items: center;
	gap: ${$uw(0.75)};
	border: none;
	background: transparent;
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.6)} ${$uw(0.8)};
	font-size: 1.4rem;
	font-weight: 500;
	color: ${$color("muted")};
	transition: background 0.15s ease, color 0.15s ease;
	&:hover {
		background: ${$color("surface")};
		color: ${$color("danger")};
	}
`;
