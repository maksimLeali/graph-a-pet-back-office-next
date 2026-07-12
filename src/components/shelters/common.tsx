"use client";

import { useState } from "react";
import styled from "styled-components";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { $color, $uw } from "@/theme";

/** sezione "aggiungi" richiudibile in testa a ogni tab */
export const AddSection: React.FC<
	React.PropsWithChildren<{ label: string }>
> = ({ label, children }) => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<Button variant="ghost" type="button" onClick={() => setOpen((o) => !o)}>
				{open ? "− Chiudi" : `+ ${label}`}
			</Button>
			{open && <AddCard>{children}</AddCard>}
		</div>
	);
};

const AddCard = styled(Card)`
	margin-top: ${$uw(0.75)};
`;

export const TabWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

export const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.75)};
`;

export const RowCard = styled(Card)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${$uw(1)};
	flex-wrap: wrap;
`;

export const RowTitle = styled.p`
	margin: 0;
	font-weight: 500;
	color: ${$color("text")};
`;

export const RowSub = styled.p`
	margin: ${$uw(0.2)} 0 0;
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

export const RowActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${$uw(0.5)};
	flex-wrap: wrap;
`;

export const EmptyText = styled.p`
	padding: ${$uw(1.5)} 0;
	text-align: center;
	color: ${$color("dim")};
`;

export const FormGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${$uw(1)};
	@media (min-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1280px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const FormFoot = styled.div`
	margin-top: ${$uw(1)};
	display: flex;
	gap: ${$uw(0.5)};
`;
