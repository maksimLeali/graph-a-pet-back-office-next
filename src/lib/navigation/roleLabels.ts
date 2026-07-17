/**
 * Etichette informative per i role code RBAC (e i ruoli legacy sincronizzati).
 * SOLO display: mai usare per autorizzare — le decisioni passano dalle
 * permission effettive (canPlatform / canShelter).
 */
export type AccessLike = {
	accessMode: "MEMBERSHIP" | "PLATFORM_ADMIN";
	roles: string[];
	platformOverrideActive: boolean;
};

/**
 * Etichetta del canale d'accesso per switcher/selettore. Distingue sempre
 * membership da privilegio platform:
 * - PLATFORM_ADMIN (nessuna membership) → "Platform admin";
 * - membership + privilegi platform extra → "<ruoli> + platform";
 * - membership pura → ruoli.
 */
export const accessLabel = (access: AccessLike): string => {
	if (access.accessMode === "PLATFORM_ADMIN") return "Platform admin";
	const roles =
		access.roles.map((r) => ROLE_LABEL[r] ?? r).join(", ") || "Membro";
	return access.platformOverrideActive ? `${roles} + platform` : roles;
};

export const ROLE_LABEL: Record<string, string> = {
	SHELTER_ADMIN: "Amministratore",
	SHELTER_MANAGER: "Manager",
	SHELTER_STAFF: "Staff",
	SHELTER_VOLUNTEER: "Volontario",
	PLATFORM_ADMIN: "Platform admin",
	PLATFORM_FINANCE_OPERATOR: "Finance operator",
	PLATFORM_USER: "Utente",
	// legacy shelter_roles codes (sincronizzati dal backfill)
	OWNER: "Amministratore",
	MANAGER: "Manager",
	STAFF: "Staff",
	VOLUNTEER: "Volontario",
};
