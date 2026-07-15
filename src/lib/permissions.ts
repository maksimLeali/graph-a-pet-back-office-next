/**
 * Centralized RBAC permission key constants for the donation domains.
 *
 * These strings must match `domain/authorization/catalog.py` on the backend
 * exactly (`ShelterPermissions` / `PlatformPermissions`). The backend is the
 * authorization source of truth — this file only prevents typos at call
 * sites; it grants nothing by itself. Use with `can()` from
 * `useShelterAuthorization` (shelter scope) or `usePlatformAuthorization`
 * (platform scope).
 */

export const ShelterPermissions = {
	DONATIONS_READ: "shelters.donations.read",
	DONATIONS_READ_DETAILS: "shelters.donations.read_details",
	DONATIONS_SETTINGS_MANAGE: "shelters.donations.settings.manage",
	DONATIONS_ENABLE: "shelters.donations.enable",
	DONATIONS_DISABLE: "shelters.donations.disable",

	FUNDING_NEEDS_READ: "shelters.funding_needs.read",
	FUNDING_NEEDS_CREATE: "shelters.funding_needs.create",
	FUNDING_NEEDS_UPDATE: "shelters.funding_needs.update",
	FUNDING_NEEDS_CLOSE: "shelters.funding_needs.close",

	FUNDING_LIMITS_READ: "shelters.funding_limits.read",
	FUNDING_LIMITS_MANAGE: "shelters.funding_limits.manage",
	FUNDING_LIMITS_OVERRIDE: "shelters.funding_limits.override",

	EXPENSES_READ: "shelters.expenses.read",
	EXPENSES_CREATE: "shelters.expenses.create",
	EXPENSES_UPDATE: "shelters.expenses.update",
	EXPENSES_SUBMIT: "shelters.expenses.submit",
	EXPENSES_APPROVE: "shelters.expenses.approve",

	FINANCIAL_REPORTS_READ: "shelters.financial_reports.read",
	FINANCIAL_REPORTS_EXPORT: "shelters.financial_reports.export",

	PUBLIC_PROFILE_MANAGE: "shelters.public_profile.manage",
	PETS_PUBLISH: "shelters.pets.publish",
} as const;

export const PlatformPermissions = {
	DONATIONS_READ: "platform.donations.read",
	DONATIONS_READ_DETAILS: "platform.donations.read_details",
	DONATIONS_REFUND: "platform.donations.refund",
	DONATIONS_PARTIAL_REFUND: "platform.donations.partial_refund",
	DONATIONS_SUSPEND: "platform.donations.suspend",

	DISPUTES_READ: "platform.disputes.read",
	DISPUTES_MANAGE: "platform.disputes.manage",

	CONNECTED_ACCOUNTS_READ: "platform.connected_accounts.read",
	CONNECTED_ACCOUNTS_MANAGE: "platform.connected_accounts.manage",

	FINANCIAL_LEDGER_READ: "platform.financial_ledger.read",
	FINANCIAL_LEDGER_RECONCILE: "platform.financial_ledger.reconcile",

	WEBHOOKS_READ: "platform.webhooks.read",
	WEBHOOKS_RETRY: "platform.webhooks.retry",
} as const;

export type ShelterPermissionKey =
	(typeof ShelterPermissions)[keyof typeof ShelterPermissions];
export type PlatformPermissionKey =
	(typeof PlatformPermissions)[keyof typeof PlatformPermissions];
