"use client";

import { ShelterScopedPage } from "@/components/donations/ShelterScopedPage";
import { ShelterPermissions } from "@/lib/permissions";

export default function DonationSettingsPage() {
	return (
		<ShelterScopedPage
			requiredPermission={ShelterPermissions.DONATIONS_SETTINGS_MANAGE}
			title="Impostazioni donazioni"
			missingBackendDescription="Il backend non espone ancora i campi Shelter per donations_enabled, default_monthly_pet_limit, platform_fee_percentage, unused_funds_policy, stripe_environment, connected_account_status, né le mutation enableShelterDonations (shelters.donations.enable), disableShelterDonations (shelters.donations.disable) e updateShelterDonationSettings."
		/>
	);
}
