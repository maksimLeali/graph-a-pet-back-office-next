"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useGetMeQuery } from "@/graphql/__generated__/me.generated";
import { useUpdateMeMutation } from "@/graphql/__generated__/updateMe.generated";
import { auth } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { $color, $uw } from "@/theme";

type ProfileForm = {
	first_name: string;
	last_name: string;
	email: string;
};

export default function ProfilePage() {
	const { register, handleSubmit, reset } = useForm<ProfileForm>();

	const { data, loading } = useGetMeQuery({
		onError: () => toast.error("Errore nel caricamento del profilo"),
	});

	const me = data?.me?.user;

	useEffect(() => {
		if (me) {
			reset({
				first_name: me.first_name ?? "",
				last_name: me.last_name ?? "",
				email: me.email ?? "",
			});
		}
	}, [me, reset]);

	const [updateMe, { loading: saving }] = useUpdateMeMutation({
		onCompleted: ({ updateMe }) => {
			if (updateMe.error || !updateMe.user) {
				toast.error("Errore nel salvataggio");
				return;
			}
			toast.success("Profilo aggiornato");
			auth.saveUser({ ...auth.getUser(), ...updateMe.user });
		},
		onError: () => toast.error("Errore nel salvataggio"),
	});

	if (loading) return <Spinner />;

	return (
		<ProfileCard title="Il tuo profilo">
			<ProfileForm
				onSubmit={handleSubmit((data) => updateMe({ variables: { data } }))}
			>
				<Input label="Nome" {...register("first_name", { required: true })} />
				<Input
					label="Cognome"
					{...register("last_name", { required: true })}
				/>
				<Input
					label="Email"
					type="email"
					{...register("email", { required: true })}
				/>
				{me?.role && (
					<RoleText>
						Ruolo: <strong>{me.role}</strong>
					</RoleText>
				)}
				<SaveButton type="submit" loading={saving}>
					Salva
				</SaveButton>
			</ProfileForm>
		</ProfileCard>
	);
}

const ProfileCard = styled(Card)`
	max-width: ${$uw(32)};
`;

const ProfileForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const RoleText = styled.p`
	margin: 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
	> strong {
		font-weight: 500;
		color: ${$color("muted")};
	}
`;

const SaveButton = styled(Button)`
	align-self: flex-start;
`;
