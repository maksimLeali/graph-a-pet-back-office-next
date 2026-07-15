"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { formatCents } from "@/lib/donations/formatCents";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ShelterPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

import { useGetShelterDonationSettingsQuery } from "@/graphql/__generated__/getShelterDonationSettings.generated";
import { useUpdateShelterDonationSettingsMutation } from "@/graphql/__generated__/updateShelterDonationSettings.generated";

type LimitForm = { amount: string };

/**
 * Limite mensile di donazione predefinito per gli animali del rifugio
 * (StripeConnectedAccount.default_pet_monthly_limit_cents; se vuoto vale il
 * default globale di piattaforma). Il limite per singolo animale vive nel
 * tab Animali. Estratto dal vecchio PetDonationLimitsPanel per stare nelle
 * "Informazioni generali" del rifugio.
 */
export const ShelterDefaultLimitPanel: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const shelterAuth = useShelterAuthorization(shelterId);

	const { data, loading, refetch } = useGetShelterDonationSettingsQuery({
		fetchPolicy: "cache-and-network",
		variables: { shelter_id: shelterId },
	});

	if (shelterAuth.loading) return null;
	if (!shelterAuth.can(ShelterPermissions.FUNDING_LIMITS_READ)) return null;
	if (loading && !data) return <Spinner />;

	const settings = data?.getShelterDonationSettings;
	if (!settings?.success || !settings.settings) {
		return (
			<Card title="Limite donazioni predefinito">
				<EmptyState
					title="Nessun account Stripe collegato"
					description="Completa i pagamenti (qui sotto) prima di impostare i limiti."
				/>
			</Card>
		);
	}

	const canManage = shelterAuth.can(ShelterPermissions.DONATIONS_SETTINGS_MANAGE);

	return (
		<Card title="Limite donazioni predefinito">
			<Body>
				<p>
					Applicato a tutti gli animali senza un limite personalizzato (che si
					imposta nel tab Animali). Attuale:{" "}
					<b>{formatCents(settings.settings.default_pet_monthly_limit_cents)}</b>
				</p>
				{canManage && (
					<DefaultLimitForm
						shelterId={shelterId}
						currentCents={settings.settings.default_pet_monthly_limit_cents}
						onDone={refetch}
					/>
				)}
			</Body>
		</Card>
	);
};

const DefaultLimitForm: React.FC<{
	shelterId: string;
	currentCents: number;
	onDone: () => void;
}> = ({ shelterId, currentCents, onDone }) => {
	const form = useForm<LimitForm>({
		defaultValues: { amount: String(currentCents / 100) },
	});

	const [updateSettings, { loading }] = useUpdateShelterDonationSettingsMutation({
		onCompleted: ({ updateShelterDonationSettings }) => {
			if (!updateShelterDonationSettings.success) {
				toast.error(
					updateShelterDonationSettings.error?.message ??
						"Errore nel salvataggio del limite predefinito"
				);
				return;
			}
			toast.success("Limite predefinito aggiornato");
			onDone();
		},
		onError: () => toast.error("Errore nel salvataggio del limite predefinito"),
	});

	const submit = form.handleSubmit((v) => {
		const trimmed = v.amount.trim();
		const default_pet_monthly_limit_cents = trimmed
			? Math.round(parseFloat(trimmed.replace(",", ".")) * 100)
			: null;
		updateSettings({
			variables: { shelter_id: shelterId, data: { default_pet_monthly_limit_cents } },
		});
	});

	return (
		<EditForm onSubmit={submit}>
			<Input
				aria-label="Limite predefinito mensile del rifugio"
				type="number"
				step="0.01"
				min="0"
				placeholder="Vuoto = default di piattaforma"
				{...form.register("amount")}
			/>
			<Button type="submit" loading={loading}>
				Salva
			</Button>
		</EditForm>
	);
};

const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
	font-size: 1.4rem;
	color: ${$color("muted")};
	> p {
		margin: 0;
	}
`;

const EditForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.5)};
	align-items: center;
`;
