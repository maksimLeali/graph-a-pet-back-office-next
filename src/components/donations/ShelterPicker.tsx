"use client";

import { Select } from "@/components/ui/Select";
import { useDonationScope } from "@/lib/donations/DonationScopeContext";

/** Shelter selector — hidden when there's zero or exactly one eligible shelter (auto-selected). */
export const ShelterPicker: React.FC = () => {
	const { shelterCandidates, shelterId, setShelterId, candidatesLoading } =
		useDonationScope();

	if (candidatesLoading || shelterCandidates.length <= 1) return null;

	return (
		<Select
			label="Rifugio"
			value={shelterId ?? ""}
			onChange={(e) => setShelterId(e.target.value)}
			options={shelterCandidates.map((s) => ({ value: s.id, label: s.name }))}
			placeholder="Seleziona un rifugio…"
		/>
	);
};
