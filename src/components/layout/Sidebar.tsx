"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";

import { auth } from "@/lib/auth";
import { useHasDonationsSidebarAccess } from "@/lib/donations/useHasDonationsSidebarAccess";
import { useBackofficeAuth } from "@/contexts/BackofficeAuthContext";
import { SHELTER_SECTIONS } from "@/lib/navigation/shelterSections";
import { PlatformPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

/**
 * Sidebar a due modalità:
 * - /platform/*: sezioni platform, filtrate sulle permission platform;
 * - /shelters/:shelterId/*: sezioni del rifugio corrente, ognuna dichiara la
 *   permission richiesta e compare solo se autorizzata.
 * Mai decidere dai nomi dei ruoli: solo permission dal contesto.
 */

type PlatformNavItem = {
	href: string;
	label: string;
	icon: string;
	permission?: string;
};

const PLATFORM_NAV: PlatformNavItem[] = [
	{ href: "/platform/dashboard", label: "Dashboard", icon: "◧" },
	{ href: "/platform/pets", label: "Animali", icon: "◔" },
	{
		href: "/platform/users",
		label: "Utenti",
		icon: "◉",
		permission: PlatformPermissions.USERS_READ,
	},
	{
		href: "/platform/shelters",
		label: "Rifugi",
		icon: "⌂",
		permission: PlatformPermissions.SHELTERS_READ,
	},
	{
		href: "/platform/claims",
		label: "Verifiche",
		icon: "✓",
		permission: PlatformPermissions.CLAIMS_REVIEW,
	},
	{ href: "/platform/statistics", label: "Statistiche", icon: "◫" },
	{
		href: "/platform/roles-permissions",
		label: "Ruoli e Permessi",
		icon: "◈",
		permission: PlatformPermissions.ROLES_MANAGE,
	},
	{ href: "/platform/translations", label: "Traduzioni", icon: "◭" },
	{ href: "/platform/me", label: "Profilo", icon: "◍" },
];

const DONATIONS_ITEM: PlatformNavItem = {
	href: "/platform/donations",
	label: "Donazioni",
	icon: "♥",
};

export const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { canPlatform, canShelter, currentShelter, shelters } =
		useBackofficeAuth();
	// permission-key-based (never a role name) — see useHasDonationsSidebarAccess
	const hasDonationsAccess = useHasDonationsSidebarAccess();

	const inShelterArea = pathname.startsWith("/shelters/");

	let items: { href: string; label: string; icon: string }[];
	if (inShelterArea && currentShelter) {
		const base = `/shelters/${currentShelter.shelter.id}`;
		items = SHELTER_SECTIONS.filter((s) =>
			canShelter(s.permission)
		).map((s) => ({
			href: `${base}/${s.section}`,
			label: s.label,
			icon: s.icon,
		}));
	} else if (inShelterArea) {
		items = [];
	} else {
		// senza il gate d'area platform la nav platform non esiste: un
		// manager/owner di rifugio vede solo i propri rifugi (e il modulo
		// donazioni, che si auto-autorizza per scope shelter)
		const hasPlatformArea = canPlatform(
			PlatformPermissions.BACKOFFICE_ACCESS
		);
		const nav = hasPlatformArea
			? PLATFORM_NAV.filter(
					(i) => !i.permission || canPlatform(i.permission)
			  )
			: [];
		items = hasDonationsAccess
			? [...nav.slice(0, 4), DONATIONS_ITEM, ...nav.slice(4)]
			: nav;
	}

	const crossLinks: { href: string; label: string; icon: string }[] = [];
	if (
		inShelterArea &&
		canPlatform(PlatformPermissions.BACKOFFICE_ACCESS)
	) {
		crossLinks.push({
			href: "/platform/dashboard",
			label: "Area platform",
			icon: "⇱",
		});
	}
	if (!inShelterArea && shelters.length > 0) {
		crossLinks.push({
			href:
				shelters.length === 1
					? `/shelters/${shelters[0].shelter.id}/dashboard`
					: "/select-shelter",
			label: "Area rifugi",
			icon: "⌂",
		});
	}

	return (
		<Aside>
			<Brand>
				<BrandName>Graph-a-Pet</BrandName>
				<BrandSub>
					{inShelterArea ? "Back office rifugio" : "Back office"}
				</BrandSub>
			</Brand>

			<Nav>
				{items.map(({ href, label, icon }) => {
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
				{crossLinks.map(({ href, label, icon }) => (
					<NavItem key={href} href={href} $active={false}>
						<NavIcon aria-hidden>{icon}</NavIcon>
						{label}
					</NavItem>
				))}
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
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.25)};
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
