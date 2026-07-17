"use client";

import { use } from "react";

import { RequireShelterPermission } from "@/components/authz/RequireShelterPermission";
import { ShelterPermissions } from "@/lib/permissions";
import { WalksTab } from "@/components/shelters/WalksTab";

export default function Page({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = use(params);
	return (
		<RequireShelterPermission permission={ShelterPermissions.WALKS_READ}>
			<WalksTab shelterId={shelterId} />
		</RequireShelterPermission>
	);
}
