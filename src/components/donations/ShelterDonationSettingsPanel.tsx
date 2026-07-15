"use client";

import toast from "react-hot-toast";
import styled from "styled-components";

import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ShelterPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

import { useGetShelterDonationSettingsQuery } from "@/graphql/__generated__/getShelterDonationSettings.generated";
import { useStartShelterStripeOnboardingMutation } from "@/graphql/__generated__/startShelterStripeOnboarding.generated";
import { useRefreshShelterStripeAccountMutation } from "@/graphql/__generated__/refreshShelterStripeAccount.generated";
import { useUpdateShelterDonationSettingsMutation } from "@/graphql/__generated__/updateShelterDonationSettings.generated";

/**
 * Attivazione pagamenti/donazioni per un rifugio: collegamento Stripe
 * (Account Link hosted da Stripe, il manager compila lì i dati reali),
 * refresh dello stato dopo il ritorno, e toggle "donazioni attive" una
 * volta che charges_enabled è vero. Nessuna chiave/carta gestita qui.
 */
export const ShelterDonationSettingsPanel: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const shelterAuth = useShelterAuthorization(shelterId);

	const { data, loading, refetch } = useGetShelterDonationSettingsQuery({
		fetchPolicy: "cache-and-network",
		variables: { shelter_id: shelterId },
	});

	const [startOnboarding, { loading: startingOnboarding }] =
		useStartShelterStripeOnboardingMutation({
			onCompleted: ({ startShelterStripeOnboarding }) => {
				if (!startShelterStripeOnboarding.success || !startShelterStripeOnboarding.onboarding_url) {
					toast.error(
						startShelterStripeOnboarding.error?.message ??
							"Errore nell'avvio del collegamento Stripe"
					);
					return;
				}
				window.open(startShelterStripeOnboarding.onboarding_url, "_blank");
				refetch();
			},
			onError: () => toast.error("Errore nell'avvio del collegamento Stripe"),
		});

	const [refreshAccount, { loading: refreshing }] =
		useRefreshShelterStripeAccountMutation({
			onCompleted: ({ refreshShelterStripeAccount }) => {
				if (!refreshShelterStripeAccount.success) {
					toast.error(
						refreshShelterStripeAccount.error?.message ?? "Errore nell'aggiornamento dello stato"
					);
					return;
				}
				toast.success("Stato aggiornato");
				refetch();
			},
			onError: () => toast.error("Errore nell'aggiornamento dello stato"),
		});

	const [toggleDonations, { loading: toggling }] =
		useUpdateShelterDonationSettingsMutation({
			onCompleted: ({ updateShelterDonationSettings }) => {
				if (!updateShelterDonationSettings.success) {
					toast.error(
						updateShelterDonationSettings.error?.message ??
							"Errore nell'aggiornamento delle donazioni"
					);
					return;
				}
				toast.success("Impostazione aggiornata");
				refetch();
			},
			onError: () => toast.error("Errore nell'aggiornamento delle donazioni"),
		});

	if (shelterAuth.loading) return null;

	if (!shelterAuth.can(ShelterPermissions.DONATIONS_SETTINGS_MANAGE)) {
		return (
			<EmptyState
				title="Accesso negato"
				description={`Non hai il permesso "${ShelterPermissions.DONATIONS_SETTINGS_MANAGE}" su questo rifugio.`}
			/>
		);
	}

	if (loading) return <Spinner />;

	const settings = data?.getShelterDonationSettings;
	const account = settings?.settings?.connected_account;

	const returnUrl =
		typeof window !== "undefined"
			? `${window.location.origin}/shelters/${shelterId}`
			: "";

	const onStartOnboarding = () =>
		startOnboarding({
			variables: { shelter_id: shelterId, refresh_url: returnUrl, return_url: returnUrl },
		});

	if (!account) {
		return (
			<Card title="Pagamenti">
				<Body>
					<p>Questo rifugio non è ancora collegato a Stripe.</p>
					<Button type="button" onClick={onStartOnboarding} loading={startingOnboarding}>
						Collega Stripe
					</Button>
				</Body>
			</Card>
		);
	}

	const canToggle =
		shelterAuth.can(ShelterPermissions.DONATIONS_ENABLE) ||
		shelterAuth.can(ShelterPermissions.DONATIONS_DISABLE);

	return (
		<Card title="Pagamenti">
			<Body>
				<StatusRow>
					<StatusBadge $tone="neutral">{account.environment}</StatusBadge>
					<StatusBadge $tone={account.charges_enabled ? "success" : "warning"}>
						{account.charges_enabled ? "Pagamenti attivi" : "Pagamenti non attivi"}
					</StatusBadge>
					<StatusBadge $tone={account.payouts_enabled ? "success" : "warning"}>
						{account.payouts_enabled ? "Bonifici attivi" : "Bonifici non attivi"}
					</StatusBadge>
					<StatusBadge $tone={account.donations_enabled ? "success" : "neutral"}>
						{account.donations_enabled ? "Donazioni attive" : "Donazioni disattive"}
					</StatusBadge>
				</StatusRow>

				{!account.details_submitted && (
					<p>
						L'onboarding Stripe non è completo. Riapri il collegamento per
						finire di inserire i dati richiesti.
					</p>
				)}

				<Actions>
					<Button
						type="button"
						variant="ghost"
						onClick={onStartOnboarding}
						loading={startingOnboarding}
					>
						{account.details_submitted ? "Riapri collegamento Stripe" : "Completa collegamento Stripe"}
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={() => refreshAccount({ variables: { shelter_id: shelterId } })}
						loading={refreshing}
					>
						Aggiorna stato
					</Button>
					{canToggle && (
						<Button
							type="button"
							disabled={!account.charges_enabled && !account.donations_enabled}
							loading={toggling}
							onClick={() =>
								toggleDonations({
									variables: {
										shelter_id: shelterId,
										data: { donations_enabled: !account.donations_enabled },
									},
								})
							}
						>
							{account.donations_enabled ? "Disattiva donazioni" : "Attiva donazioni"}
						</Button>
					)}
				</Actions>

				{!account.charges_enabled && (
					<Hint>
						Serve completare l'onboarding Stripe (pagamenti attivi) prima di
						poter attivare le donazioni.
					</Hint>
				)}
			</Body>
		</Card>
	);
};

const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
	font-size: 1.4rem;
	color: ${$color("muted")};
	> p {
		margin: 0;
	}
`;

const StatusRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.5)};
`;

const TONE_COLOR = {
	success: "primary",
	warning: "warning",
	neutral: "border",
} as const;

const TONE_TEXT_COLOR = {
	success: "primary-contrast",
	warning: "text",
	neutral: "muted",
} as const;

const StatusBadge = styled.span<{ $tone: "success" | "warning" | "neutral" }>`
	border-radius: 999px;
	background: ${({ $tone }) => $color(TONE_COLOR[$tone])};
	padding: ${$uw(0.25)} ${$uw(0.6)};
	font-size: 1.1rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: ${({ $tone }) => $color(TONE_TEXT_COLOR[$tone])};
`;

const Actions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.5)};
`;

const Hint = styled.p`
	font-size: 1.3rem;
	color: ${$color("dim")};
`;
