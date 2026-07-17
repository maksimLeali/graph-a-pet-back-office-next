"use client";

import { use } from "react";

import { RequireShelterPermission } from "@/components/authz/RequireShelterPermission";
import { ShelterPermissions } from "@/lib/permissions";
import { InventoryTab } from "@/components/shelters/InventoryTab";

export default function Page({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = use(params);
	return (
		<RequireShelterPermission permission={ShelterPermissions.INVENTORY_READ}>
			<InventoryTab shelterId={shelterId} />
		</RequireShelterPermission>
	);
}
