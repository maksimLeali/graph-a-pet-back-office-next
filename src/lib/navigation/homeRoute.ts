import { sectionPermission } from "./shelterSections";

/**
 * Decisioni di routing pure (testabili) del back office multi-rifugio.
 * Gli input arrivano SEMPRE da backofficeAccessContext (backend), mai da
 * URL/localStorage non validati: lastShelterId viene usato solo se presente
 * tra gli accessi.
 */

export type ShelterAccessLike = {
	shelter: { id: string };
	permissions: string[];
};

export const computeHomeRoute = (
	hasPlatformAccess: boolean,
	shelters: ShelterAccessLike[],
	lastShelterId: string | null
): string => {
	if (hasPlatformAccess) return "/platform/dashboard";
	if (shelters.length === 0) return "/403";
	if (shelters.length === 1)
		return `/shelters/${shelters[0].shelter.id}/dashboard`;
	if (lastShelterId && shelters.some((s) => s.shelter.id === lastShelterId))
		return `/shelters/${lastShelterId}/dashboard`;
	return "/select-shelter";
};

/**
 * Route di destinazione quando si cambia rifugio: mantiene la sezione
 * corrente se il nuovo rifugio ne ha la permission, altrimenti dashboard.
 */
export const computeSwitchRoute = (
	target: ShelterAccessLike,
	currentSection: string | null
): string => {
	const required = currentSection
		? sectionPermission(currentSection)
		: undefined;
	const keep =
		currentSection && required && target.permissions.includes(required);
	return `/shelters/${target.shelter.id}/${keep ? currentSection : "dashboard"}`;
};
