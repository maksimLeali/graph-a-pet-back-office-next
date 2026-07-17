"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

import { Forbidden } from "@/components/authz/Forbidden";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { $uw } from "@/theme";

export default function ForbiddenPage() {
	const router = useRouter();
	return (
		<Screen>
			<Forbidden message="Il tuo account non ha accesso al back office: nessuna permission platform e nessun rifugio con accesso operativo." />
			<Button
				type="button"
				onClick={() => {
					auth.logout();
					router.replace("/login");
				}}
			>
				Esci
			</Button>
		</Screen>
	);
}

const Screen = styled.main`
	display: flex;
	min-height: 100dvh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: ${$uw(1)};
	padding: ${$uw(1.5)};
`;
