import { PlatformPermissions, ShelterPermissions } from "@/lib/permissions";
import type { PlatformPermissionKey, ShelterPermissionKey } from "@/lib/permissions";

/**
 * Metadata for donation-related navigation sections that do not have a page
 * yet. These are intentionally NOT wired into `Sidebar.tsx` (platform scope)
 * or the shelter detail tabs (shelter scope) — there is nothing to route to.
 *
 * Once a section's page/tab component exists, add it to the real navigation
 * (`Sidebar.tsx` NAV array, or the `Tabs` entries in
 * `app/(admin)/shelters/[id]/page.tsx`) gated by
 * `usePlatformAuthorization().can(item.requiredPermission)` or
 * `useShelterAuthorization(shelterId).can(item.requiredPermission)`
 * respectively, using the entry below for the label/permission pairing.
 */

export type PlatformDonationSection = {
	value: string;
	label: string;
	requiredPermission: PlatformPermissionKey;
};

export type ShelterDonationSection = {
	value: string;
	label: string;
	requiredPermission: ShelterPermissionKey;
};

/** Future top-level (Sidebar) sections — platform scope. */
export const FUTURE_PLATFORM_DONATION_SECTIONS: PlatformDonationSection[] = [
	{
		value: "donations",
		label: "Donations",
		requiredPermission: PlatformPermissions.DONATIONS_READ,
	},
	{
		value: "disputes",
		label: "Disputes",
		requiredPermission: PlatformPermissions.DISPUTES_READ,
	},
	{
		value: "connected-accounts",
		label: "Connected accounts",
		requiredPermission: PlatformPermissions.CONNECTED_ACCOUNTS_READ,
	},
	{
		value: "financial-ledger",
		label: "Financial ledger",
		requiredPermission: PlatformPermissions.FINANCIAL_LEDGER_READ,
	},
];

/** Future shelter-detail tab sections — shelter scope. */
export const FUTURE_SHELTER_DONATION_SECTIONS: ShelterDonationSection[] = [
	{
		value: "donations",
		label: "Donations",
		requiredPermission: ShelterPermissions.DONATIONS_READ,
	},
	{
		value: "funding-needs",
		label: "Funding needs",
		requiredPermission: ShelterPermissions.FUNDING_NEEDS_READ,
	},
	{
		value: "expenses",
		label: "Expenses",
		requiredPermission: ShelterPermissions.EXPENSES_READ,
	},
	{
		value: "financial-reports",
		label: "Financial reports",
		requiredPermission: ShelterPermissions.FINANCIAL_REPORTS_READ,
	},
];
