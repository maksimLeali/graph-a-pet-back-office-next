"use client";

import { ShelterScopedPage } from "@/components/donations/ShelterScopedPage";
import { ShelterPermissions } from "@/lib/permissions";

export default function FundingNeedsPage() {
	return (
		<ShelterScopedPage
			requiredPermission={ShelterPermissions.FUNDING_NEEDS_READ}
			title="Fabbisogni di raccolta"
			missingBackendDescription='Il backend non espone ancora un tipo FundingNeed né le operazioni listShelterFundingNeeds, getShelterFundingNeed, createShelterFundingNeed, updateShelterFundingNeed, closeShelterFundingNeed.'
		/>
	);
}
