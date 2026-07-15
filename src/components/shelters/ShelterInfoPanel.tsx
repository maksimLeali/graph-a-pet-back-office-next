"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { Spinner } from "@/components/ui/Spinner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ShelterPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

import { useGetShelterQuery } from "@/graphql/__generated__/queries.generated";
import { useUpdateShelterBoMutation } from "@/graphql/__generated__/mutations.generated";
import { ShelterDefaultLimitPanel } from "@/components/donations/ShelterDefaultLimitPanel";
import { ShelterDonationSettingsPanel } from "@/components/donations/ShelterDonationSettingsPanel";

type InfoForm = {
	name: string;
	street: string;
	street_number: string;
	postal_code: string;
	city: string;
	province_code: string;
	region: string;
	district: string;
	accepts_volunteers: string;
	public_contact_email: string;
	public_contact_phone: string;
	public_description: string;
};

const VOLUNTEER_OPTIONS = [
	{ value: "true", label: "Sì" },
	{ value: "false", label: "No" },
];

/**
 * Informazioni generali del rifugio: dati anagrafici/indirizzo MODIFICABILI,
 * più il limite donazioni predefinito degli animali e i pagamenti (Stripe),
 * accorpati qui dai vecchi tab separati.
 */
export const ShelterInfoPanel: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const shelterAuth = useShelterAuthorization(shelterId);
	const { data, loading, refetch } = useGetShelterQuery({
		fetchPolicy: "cache-and-network",
		variables: { id: shelterId },
	});

	const form = useForm<InfoForm>();
	const shelter = data?.getShelter?.shelter;

	useEffect(() => {
		if (!shelter) return;
		form.reset({
			name: shelter.name ?? "",
			street: shelter.street ?? "",
			street_number: shelter.street_number ?? "",
			postal_code: shelter.postal_code ?? "",
			city: shelter.city ?? "",
			province_code: shelter.province_code ?? "",
			region: shelter.region ?? "",
			district: shelter.district ?? "",
			accepts_volunteers: shelter.accepts_volunteers ? "true" : "false",
			public_contact_email: shelter.public_contact_email ?? "",
			public_contact_phone: shelter.public_contact_phone ?? "",
			public_description: shelter.public_description ?? "",
		});
	}, [shelter]); // eslint-disable-line react-hooks/exhaustive-deps

	const [save, { loading: saving }] = useUpdateShelterBoMutation({
		onCompleted: ({ updateShelter }) => {
			if (!updateShelter.success) {
				toast.error(updateShelter.error?.message ?? "Errore nel salvataggio");
				return;
			}
			toast.success("Informazioni aggiornate");
			refetch();
		},
		onError: () => toast.error("Errore nel salvataggio"),
	});

	if (shelterAuth.loading) return null;
	if (loading && !data) return <Spinner />;

	const canEdit = shelterAuth.can(ShelterPermissions.PUBLIC_PROFILE_MANAGE);

	const submit = form.handleSubmit((v) =>
		save({
			variables: {
				id: shelterId,
				data: {
					name: v.name,
					street: v.street,
					street_number: v.street_number,
					postal_code: v.postal_code,
					city: v.city,
					province_code: v.province_code,
					region: v.region || null,
					district: v.district || null,
					accepts_volunteers: v.accepts_volunteers === "true",
					public_contact_email: v.public_contact_email || null,
					public_contact_phone: v.public_contact_phone || null,
					public_description: v.public_description || null,
				},
			},
		})
	);

	return (
		<Wrap>
			<Card title="Dati rifugio">
				{canEdit ? (
					<Form onSubmit={submit}>
						<Grid>
							<Input label="Nome" {...form.register("name", { required: true })} />
							<Input label="Via" {...form.register("street", { required: true })} />
							<Input label="Civico" {...form.register("street_number", { required: true })} />
							<Input label="CAP" {...form.register("postal_code", { required: true })} />
							<Input label="Città" {...form.register("city", { required: true })} />
							<Input label="Provincia" {...form.register("province_code", { required: true })} />
							<Input label="Regione" {...form.register("region")} />
							<Input label="Quartiere / zona" {...form.register("district")} />
							<Select
								label="Accetta volontari"
								options={VOLUNTEER_OPTIONS}
								{...form.register("accepts_volunteers")}
							/>
							<Input label="Email pubblica" type="email" {...form.register("public_contact_email")} />
							<Input label="Telefono pubblico" {...form.register("public_contact_phone")} />
						</Grid>
						<Field>
							<FieldLabel>Descrizione breve (testo semplice)</FieldLabel>
							<Textarea rows={3} {...form.register("public_description")} />
							<Hint>
								Per il racconto formattato usa il tab “Profilo pubblico”.
							</Hint>
						</Field>
						<Foot>
							<Button type="submit" loading={saving}>
								Salva
							</Button>
						</Foot>
					</Form>
				) : (
					<ReadOnly>
						<Row>
							<Label>Nome</Label>
							<Value>{shelter?.name ?? "—"}</Value>
						</Row>
						<Row>
							<Label>Indirizzo</Label>
							<Value>
								{[
									shelter?.street,
									shelter?.street_number,
									shelter?.postal_code,
									shelter?.city,
									shelter?.province_code,
									shelter?.region,
								]
									.filter(Boolean)
									.join(", ") || "—"}
							</Value>
						</Row>
						<Row>
							<Label>Accetta volontari</Label>
							<Value>{shelter?.accepts_volunteers ? "Sì" : "No"}</Value>
						</Row>
					</ReadOnly>
				)}
			</Card>

			<ShelterDefaultLimitPanel shelterId={shelterId} />
			<ShelterDonationSettingsPanel shelterId={shelterId} />
		</Wrap>
	);
};

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1.25)};
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: ${$uw(0.75)};
`;

const Field = styled.label`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.35)};
`;

const FieldLabel = styled.span`
	font-size: 1.3rem;
	font-weight: 600;
	color: ${$color("text")};
`;

const Textarea = styled.textarea`
	width: 100%;
	box-sizing: border-box;
	resize: vertical;
	padding: ${$uw(0.6)} ${$uw(0.75)};
	border: 1px solid ${$color("border")};
	border-radius: 8px;
	background: ${$color("surface")};
	color: ${$color("text")};
	font-size: 1.4rem;
	line-height: 1.4;
	font-family: inherit;
	&:focus {
		outline: none;
		border-color: ${$color("primary")};
	}
`;

const Hint = styled.span`
	font-size: 1.2rem;
	color: ${$color("dim")};
`;

const Foot = styled.div`
	display: flex;
	gap: ${$uw(0.5)};
`;

const ReadOnly = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

const Row = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const Label = styled.span`
	font-size: 1.2rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: ${$color("dim")};
`;

const Value = styled.span`
	font-size: 1.4rem;
	color: ${$color("text")};
`;
