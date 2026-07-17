"use client";

import { use } from "react";

import { RequireShelterPermission } from "@/components/authz/RequireShelterPermission";
import { ShelterPermissions } from "@/lib/permissions";
import { MembersPeopleTab } from "@/components/shelters/MembersPeopleTab";

export default function Page({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = use(params);
	return (
		<RequireShelterPermission permission={ShelterPermissions.MEMBERS_READ}>
			<MembersPeopleTab shelterId={shelterId} />
		</RequireShelterPermission>
	);
}
