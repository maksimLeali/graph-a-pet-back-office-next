"use client";

import { use } from "react";

import { RequireShelterPermission } from "@/components/authz/RequireShelterPermission";
import { ShelterPermissions } from "@/lib/permissions";
import { ShelterInfoPanel } from "@/components/shelters/ShelterInfoPanel";

export default function Page({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = use(params);
	return (
		<RequireShelterPermission permission={ShelterPermissions.READ}>
			<ShelterInfoPanel shelterId={shelterId} />
		</RequireShelterPermission>
	);
}
