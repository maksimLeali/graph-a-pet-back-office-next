"use client";

import { useGetUserRbacRolesQuery } from "@/graphql/__generated__/rbac.generated";
import { auth } from "@/lib/auth";

/**
 * Raw RBAC role assignments of the current back-office user (reuses the
 * existing `getUserRbacRoles(user_id)` query against the logged-in user's
 * own id — same query already used by `usePlatformAuthorization` and the
 * user-detail RBAC tab). Low-level building block: consumers filter
 * `assignments` for whatever scope/status they need.
 */
export const useMyRbacAssignments = () => {
	const userId = auth.getUser()?.id;

	const { data, loading } = useGetUserRbacRolesQuery({
		skip: !userId,
		fetchPolicy: "network-only",
		variables: { user_id: userId as string },
	});

	return {
		assignments: data?.getUserRbacRoles?.assignments ?? [],
		loading,
	};
};
