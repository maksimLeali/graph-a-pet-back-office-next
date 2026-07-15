"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

import { useShelterAuthorization } from "@/lib/useShelterAuthorization";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { ShelterPermissions } from "@/lib/permissions";
import { $color, $uw } from "@/theme";

import { useGetShelterQuery } from "@/graphql/__generated__/queries.generated";
import { useUpdateShelterBoMutation } from "@/graphql/__generated__/mutations.generated";

/**
 * Configurazione del racconto pubblico del rifugio: editor WYSIWYG il cui
 * HTML (ri-sanitizzato lato backend) viene mostrato nel profilo pubblico
 * agli utenti esterni al rifugio. Gli altri campi pubblici restano dove
 * sono; questo è il contenuto libero e formattato.
 */
export const ShelterPublicProfilePanel: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => {
	const shelterAuth = useShelterAuthorization(shelterId);

	const { data, loading, refetch } = useGetShelterQuery({
		fetchPolicy: "cache-and-network",
		variables: { id: shelterId },
	});

	const [html, setHtml] = useState("");
	const [dirty, setDirty] = useState(false);

	const loaded = data?.getShelter?.shelter?.public_story_html ?? "";
	useEffect(() => {
		if (!dirty) setHtml(loaded);
	}, [loaded, dirty]);

	const [save, { loading: saving }] = useUpdateShelterBoMutation({
		onCompleted: ({ updateShelter }) => {
			if (!updateShelter.success) {
				toast.error(updateShelter.error?.message ?? "Errore nel salvataggio");
				return;
			}
			toast.success("Profilo pubblico aggiornato");
			setDirty(false);
			refetch();
		},
		onError: () => toast.error("Errore nel salvataggio"),
	});

	if (shelterAuth.loading) return null;

	if (!shelterAuth.can(ShelterPermissions.PUBLIC_PROFILE_MANAGE)) {
		return (
			<EmptyState
				title="Accesso negato"
				description={`Non hai il permesso "${ShelterPermissions.PUBLIC_PROFILE_MANAGE}" su questo rifugio.`}
			/>
		);
	}

	if (loading && !data) return <Spinner />;

	const onSave = () =>
		save({ variables: { id: shelterId, data: { public_story_html: html || null } } });

	return (
		<Card title="Racconto pubblico">
			<Body>
				<Intro>
					Testo formattato mostrato nel profilo pubblico del rifugio agli
					utenti esterni. Racconta la storia, la missione e come si può
					aiutare.
				</Intro>
				<RichTextEditor
					value={html}
					onChange={(v) => {
						setHtml(v);
						setDirty(true);
					}}
					placeholder="Scrivi qui il racconto del rifugio…"
				/>
				<Actions>
					<Button type="button" onClick={onSave} loading={saving} disabled={!dirty}>
						Salva
					</Button>
					{dirty && (
						<Button
							type="button"
							variant="ghost"
							disabled={saving}
							onClick={() => {
								setHtml(loaded);
								setDirty(false);
							}}
						>
							Annulla modifiche
						</Button>
					)}
				</Actions>
			</Body>
		</Card>
	);
};

const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const Intro = styled.p`
	margin: 0;
	font-size: 1.4rem;
	color: ${$color("muted")};
`;

const Actions = styled.div`
	display: flex;
	gap: ${$uw(0.5)};
`;
