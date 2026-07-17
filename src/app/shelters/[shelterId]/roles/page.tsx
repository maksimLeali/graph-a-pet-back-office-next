"use client";

import { use } from "react";

import { RequireShelterPermission } from "@/components/authz/RequireShelterPermission";
import { ShelterPermissions } from "@/lib/permissions";
import { MembersTab } from "@/components/shelters/MembersTab";

export default function Page({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = use(params);
	return (
		<RequireShelterPermission permission={ShelterPermissions.ROLES_READ}>
			<MembersTab shelterId={shelterId} />
		</RequireShelterPermission>
	);
}
