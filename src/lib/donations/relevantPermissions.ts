import { PlatformPermissions, ShelterPermissions } from "@/lib/permissions";
import type {
	PlatformPermissionKey,
	ShelterPermissionKey,
} from "@/lib/permissions";

/**
 * Permission keys that make the Donations module relevant to a user, at
 * each scope. Used to decide sidebar/module visibility. Holding ANY one of
 * these (shelter-scoped, for at least one shelter, or platform-scoped) is
 * enough to enter the module — each individual page/action still checks its
 * own specific permission.
 */
export const RELEVANT_SHELTER_DONATION_PERMISSIONS: ShelterPermissionKey[] = [
	ShelterPermissions.DONATIONS_READ,
	ShelterPermissions.DONATIONS_READ_DETAILS,
	ShelterPermissions.DONATIONS_SETTINGS_MANAGE,
	ShelterPermissions.FUNDING_NEEDS_READ,
	ShelterPermissions.FUNDING_LIMITS_READ,
	ShelterPermissions.EXPENSES_READ,
	ShelterPermissions.FINANCIAL_REPORTS_READ,
];

export const RELEVANT_PLATFORM_DONATION_PERMISSIONS: PlatformPermissionKey[] = [
	PlatformPermissions.DONATIONS_READ,
	PlatformPermissions.DONATIONS_READ_DETAILS,
	PlatformPermissions.DISPUTES_READ,
	PlatformPermissions.CONNECTED_ACCOUNTS_READ,
	PlatformPermissions.FINANCIAL_LEDGER_READ,
	PlatformPermissions.WEBHOOKS_READ,
];
