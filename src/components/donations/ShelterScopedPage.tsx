"use client";

import { useDonationScope } from "@/lib/donations/DonationScopeContext";
import { EmptyState } from "@/components/ui/EmptyState";
import type { ShelterPermissionKey } from "@/lib/permissions";

/**
 * Shared shell for shelter-scope-only donation pages (funding needs, pet
 * limits, expenses, reports, settings): resolves shelter selection and the
 * page's specific permission, then explains exactly which backend operation
 * is still missing. No fake data, no invented mutations.
 */
export const ShelterScopedPage: React.FC<{
	requiredPermission: ShelterPermissionKey;
	title: string;
	missingBackendDescription: string;
}> = ({ requiredPermission, title, missingBackendDescription }) => {
	const { shelterId, shelterAuth, shelterCandidates, candidatesLoading } =
		useDonationScope();

	if (candidatesLoading) return null;

	if (!shelterId) {
		return shelterCandidates.length === 0 ? (
			<EmptyState
				title="Nessun rifugio idoneo"
				description="Non hai permessi di donazione su nessun rifugio."
			/>
		) : (
			<EmptyState
				title="Seleziona un rifugio"
				description={`Scegli un rifugio qui sopra per gestire: ${title.toLowerCase()}.`}
			/>
		);
	}

	if (!shelterAuth.can(requiredPermission)) {
		return (
			<EmptyState
				title="Accesso negato"
				description={`Non hai il permesso "${requiredPermission}" su questo rifugio.`}
			/>
		);
	}

	return (
		<EmptyState
			icon="◫"
			title={`${title} — non ancora disponibile`}
			description={missingBackendDescription}
		/>
	);
};
