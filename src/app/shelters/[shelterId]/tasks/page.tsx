"use client";

import { use } from "react";

import { RequireShelterPermission } from "@/components/authz/RequireShelterPermission";
import { ShelterPermissions } from "@/lib/permissions";
import { TasksTab } from "@/components/shelters/TasksTab";

export default function Page({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = use(params);
	return (
		<RequireShelterPermission permission={ShelterPermissions.TASKS_READ}>
			<TasksTab shelterId={shelterId} />
		</RequireShelterPermission>
	);
}
