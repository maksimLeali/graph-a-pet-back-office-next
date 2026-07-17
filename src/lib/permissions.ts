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
	READ: "shelters.read",
	UPDATE: "shelters.update",

	// gate d'ingresso all'area operativa del back office (per rifugio);
	// non sostituisce le permission funzionali
	BACKOFFICE_ACCESS: "shelters.backoffice.access",

	MEMBERS_READ: "shelters.members.read",
	MEMBERS_INVITE: "shelters.members.invite",
	MEMBERS_REMOVE: "shelters.members.remove",

	ROLES_READ: "shelters.roles.read",
	ROLES_ASSIGN: "shelters.roles.assign",
	ROLES_MANAGE: "shelters.roles.manage",

	PEOPLE_READ: "shelters.people.read",
	PEOPLE_CREATE: "shelters.people.create",
	PEOPLE_UPDATE: "shelters.people.update",
	PEOPLE_ARCHIVE: "shelters.people.archive",

	PETS_READ: "shelters.pets.read",
	PETS_CREATE: "shelters.pets.create",
	PETS_REMOVE: "shelters.pets.remove",

	TASKS_READ: "shelters.tasks.read",
	TASKS_CREATE: "shelters.tasks.create",
	TASKS_UPDATE: "shelters.tasks.update",
	TASKS_EXECUTE: "shelters.tasks.execute",
	TASKS_DELETE: "shelters.tasks.delete",

	WALKS_READ: "shelters.walks.read",
	WALKS_CREATE: "shelters.walks.create",
	WALKS_CANCEL: "shelters.walks.cancel",
	WALKS_DELETE: "shelters.walks.delete",

	INVENTORY_READ: "shelters.inventory.read",
	INVENTORY_CONSUME: "shelters.inventory.consume",
	INVENTORY_RESTOCK: "shelters.inventory.restock",
	INVENTORY_ADJUST: "shelters.inventory.adjust",
	INVENTORY_MANAGE: "shelters.inventory.manage",

	BOXES_READ: "shelters.boxes.read",
	BOXES_MANAGE: "shelters.boxes.manage",
	BOXES_ASSIGN_PET: "shelters.boxes.assign_pet",
	BOXES_RELEASE_PET: "shelters.boxes.release_pet",

	MAP_READ: "shelters.map.read",
	MAP_UPDATE: "shelters.map.update",

	OWNERSHIP_TRANSFER: "shelters.ownership.transfer",

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
	PETS_UPDATE: "shelters.pets.update",
} as const;

export const PlatformPermissions = {
	BACKOFFICE_ACCESS: "platform.backoffice.access",
	USERS_READ: "platform.users.read",
	USERS_UPDATE: "platform.users.update",
	SHELTERS_READ: "platform.shelters.read",
	SHELTERS_VERIFY: "platform.shelters.verify",
	SHELTERS_MANAGE: "platform.shelters.manage",
	CLAIMS_REVIEW: "platform.claims.review",
	ROLES_MANAGE: "platform.roles.manage",
	AUDIT_READ: "platform.audit.read",

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
