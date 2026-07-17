import { redirect } from "next/navigation";

export default async function ShelterIndex({
	params,
}: {
	params: Promise<{ shelterId: string }>;
}) {
	const { shelterId } = await params;
	redirect(`/shelters/${shelterId}/dashboard`);
}
