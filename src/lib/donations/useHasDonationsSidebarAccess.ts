"use client";

import { usePlatformAuthorization } from "@/lib/usePlatformAuthorization";
import { useMyRbacAssignments } from "@/lib/donations/useMyRbacAssignments";
import { RELEVANT_PLATFORM_DONATION_PERMISSIONS } from "@/lib/donations/relevantPermissions";

/**
 * Cheap sidebar-visibility check: real platform-permission check, plus a
 * "has any active shelter role at all" proxy for the shelter side (an exact
 * per-shelter permission check — see `useMyShelterDonationCandidates` — runs
 * inside the module itself, not on every page's Sidebar mount, since it
 * costs one network call per shelter the user belongs to).
 *
 * This can admit a user who turns out, once inside /donations, to have no
 * real donation permission on any shelter (e.g. a SHELTER_VOLUNTEER); they
 * then see the module's own "no donation access" empty state, which is
 * backend-permission-verified. No unauthorized action is ever exposed by
 * this approximation, only the sidebar link itself may show up once too
 * often. See the Donations module report for the missing bulk-permission
 * query that would remove this gap.
 */
export const useHasDonationsSidebarAccess = (): boolean => {
	const platformAuth = usePlatformAuthorization();
	const { assignments } = useMyRbacAssignments();

	const hasPlatformDonationPermission = RELEVANT_PLATFORM_DONATION_PERMISSIONS.some(
		(p) => platformAuth.can(p)
	);
	const hasAnyActiveShelterRole = assignments.some(
		(a) => a.scope_type === "SHELTER" && !!a.shelter_id && a.status === "ACTIVE"
	);

	return hasPlatformDonationPermission || hasAnyActiveShelterRole;
};
