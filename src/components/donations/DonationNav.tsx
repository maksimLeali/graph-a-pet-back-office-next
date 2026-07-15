"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

export type DonationNavEntry = {
	href: string;
	label: string;
	/** permission-gated visibility; hidden (not disabled) when false */
	visible: boolean;
};

/**
 * Secondary, route-driven navigation for the /donations module. Mirrors the
 * active-link idiom used by the main Sidebar, but horizontal and filtered
 * per-item by an explicit permission check computed by the caller.
 */
export const DonationNav: React.FC<{ entries: DonationNavEntry[] }> = ({
	entries,
}) => {
	const pathname = usePathname();
	const visibleEntries = entries.filter((e) => e.visible);

	return (
		<Nav aria-label="Donations">
			{visibleEntries.map(({ href, label }) => {
				const active = pathname === href;
				return (
					<NavLink
						key={href}
						href={href}
						$active={active}
						aria-current={active ? "page" : undefined}
					>
						{label}
					</NavLink>
				);
			})}
		</Nav>
	);
};

const Nav = styled.nav`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.5)};
	border-bottom: 1px solid ${$color("border")};
	padding-bottom: ${$uw(0.75)};
`;

const NavLink = styled(Link)<{ $active: boolean }>`
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.5)} ${$uw(0.9)};
	font-size: 1.3rem;
	font-weight: 600;
	transition: background 0.15s ease, color 0.15s ease;
	color: ${({ $active }) => ($active ? $color("primary") : $color("muted"))};
	background: ${({ $active }) =>
		$active ? $color("primary-soft") : "transparent"};
	&:hover {
		color: ${$color("text")};
	}
`;
