"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { usePlatformAuthorization } from "@/lib/usePlatformAuthorization";
import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import {
	useMyShelterDonationCandidates,
	ShelterDonationCandidate,
} from "@/lib/donations/useMyShelterDonationCandidates";
import { RELEVANT_PLATFORM_DONATION_PERMISSIONS } from "@/lib/donations/relevantPermissions";

export type DonationScope = "shelter" | "platform";

type DonationScopeValue = {
	scope: DonationScope;
	setScope: (scope: DonationScope) => void;
	hasShelterAccess: boolean;
	hasPlatformAccess: boolean;
	shelterCandidates: ShelterDonationCandidate[];
	candidatesLoading: boolean;
	shelterId: string | null;
	setShelterId: (id: string) => void;
	shelterAuth: ReturnType<typeof useShelterAuthorization>;
	platformAuth: ReturnType<typeof usePlatformAuthorization>;
};

const DonationScopeContext = createContext<DonationScopeValue | null>(null);

/**
 * Shared state for the whole /donations module: which scope is active
 * (shelter vs platform), which shelter is selected, and the two
 * authorization hooks pages need. Mounted once by donations/layout.tsx.
 */
export const DonationScopeProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const platformAuth = usePlatformAuthorization();
	const { candidates, loading: candidatesLoading } =
		useMyShelterDonationCandidates();

	const hasPlatformAccess = RELEVANT_PLATFORM_DONATION_PERMISSIONS.some((p) =>
		platformAuth.can(p)
	);
	const hasShelterAccess = candidates.length > 0;

	const [scope, setScope] = useState<DonationScope>("shelter");
	const [shelterId, setShelterId] = useState<string | null>(null);

	// once access is known, default to whichever scope the user actually has
	useEffect(() => {
		if (candidatesLoading || platformAuth.loading) return;
		if (hasShelterAccess && !hasPlatformAccess) setScope("shelter");
		else if (hasPlatformAccess && !hasShelterAccess) setScope("platform");
	}, [hasShelterAccess, hasPlatformAccess, candidatesLoading, platformAuth.loading]);

	// auto-select the only eligible shelter
	useEffect(() => {
		if (!shelterId && candidates.length === 1) setShelterId(candidates[0].id);
	}, [candidates, shelterId]);

	const shelterAuth = useShelterAuthorization(shelterId ?? undefined);

	const value: DonationScopeValue = {
		scope,
		setScope,
		hasShelterAccess,
		hasPlatformAccess,
		shelterCandidates: candidates,
		candidatesLoading,
		shelterId,
		setShelterId,
		shelterAuth,
		platformAuth,
	};

	return (
		<DonationScopeContext.Provider value={value}>
			{children}
		</DonationScopeContext.Provider>
	);
};

export const useDonationScope = (): DonationScopeValue => {
	const ctx = useContext(DonationScopeContext);
	if (!ctx) {
		throw new Error("useDonationScope must be used within DonationScopeProvider");
	}
	return ctx;
};
