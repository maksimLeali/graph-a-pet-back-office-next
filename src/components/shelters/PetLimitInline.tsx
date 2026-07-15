"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { formatCents } from "@/lib/donations/formatCents";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { $color, $uw } from "@/theme";

import { useUpdatePetDonationLimitMutation } from "@/graphql/__generated__/updatePetDonationLimit.generated";

type Props = {
	shelterId: string;
	petId: string;
	currentCents: number | null;
	onSaved: () => void;
};

type LimitForm = { amount: string };

/**
 * Controllo inline del limite di donazione mensile del singolo animale
 * (PetDonationPolicy.custom_monthly_limit_cents; vuoto = usa il predefinito
 * del rifugio, impostato nelle Informazioni generali). Usato per riga nel
 * tab Animali.
 */
export const PetLimitInline: React.FC<Props> = ({
	shelterId,
	petId,
	currentCents,
	onSaved,
}) => {
	const [open, setOpen] = useState(false);
	const form = useForm<LimitForm>({
		defaultValues: { amount: currentCents != null ? String(currentCents / 100) : "" },
	});

	const [updateLimit, { loading }] = useUpdatePetDonationLimitMutation({
		onCompleted: ({ updatePetDonationLimit }) => {
			if (!updatePetDonationLimit.success) {
				toast.error(
					updatePetDonationLimit.error?.message ?? "Errore nel salvataggio del limite"
				);
				return;
			}
			toast.success("Limite aggiornato");
			setOpen(false);
			onSaved();
		},
		onError: () => toast.error("Errore nel salvataggio del limite"),
	});

	const submit = form.handleSubmit((v) => {
		const trimmed = v.amount.trim();
		const custom_monthly_limit_cents = trimmed
			? Math.round(parseFloat(trimmed.replace(",", ".")) * 100)
			: null;
		updateLimit({
			variables: {
				data: { pet_id: petId, shelter_id: shelterId, custom_monthly_limit_cents },
			},
		});
	});

	const label =
		currentCents != null ? formatCents(currentCents) : "Predefinito";

	return (
		<Wrap>
			<Toggle
				type="button"
				onClick={() => setOpen((o) => !o)}
				aria-expanded={open}
			>
				Limite: <b>{label}</b> <Caret $open={open}>▾</Caret>
			</Toggle>
			{open && (
				<EditForm onSubmit={submit}>
					<Input
						aria-label="Limite mensile personalizzato"
						type="number"
						step="0.01"
						min="0"
						placeholder="Vuoto = predefinito rifugio"
						{...form.register("amount")}
					/>
					<Button type="submit" loading={loading}>
						Salva
					</Button>
				</EditForm>
			)}
		</Wrap>
	);
};

const Wrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.5)};
	align-items: flex-end;
`;

const Toggle = styled.button`
	display: inline-flex;
	align-items: center;
	gap: ${$uw(0.35)};
	background: transparent;
	border: 1px solid ${$color("border")};
	border-radius: 999px;
	padding: ${$uw(0.3)} ${$uw(0.75)};
	font-size: 1.3rem;
	color: ${$color("muted")};
	cursor: pointer;
	> b {
		color: ${$color("text")};
	}
	&:hover {
		border-color: ${$color("primary")};
	}
`;

const Caret = styled.span<{ $open: boolean }>`
	transition: transform 0.15s ease;
	transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;

const EditForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	gap: ${$uw(0.5)};
	align-items: center;
	justify-content: flex-end;
`;
