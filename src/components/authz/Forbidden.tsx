"use client";

import Link from "next/link";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

export const Forbidden: React.FC<{
	title?: string;
	message?: string;
	homeHref?: string;
}> = ({
	title = "403 — Accesso negato",
	message = "Non hai i permessi necessari per questa sezione.",
	homeHref,
}) => (
	<Wrap role="alert">
		<Code>403</Code>
		<Title>{title}</Title>
		<Message>{message}</Message>
		{homeHref && <HomeLink href={homeHref}>Torna all&apos;inizio</HomeLink>}
	</Wrap>
);

const Wrap = styled.div`
	display: flex;
	min-height: ${$uw(20)};
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: ${$uw(0.5)};
	padding: ${$uw(2)};
	text-align: center;
`;

const Code = styled.span`
	font-family: var(--font-jetbrains-mono);
	font-size: 1.3rem;
	font-weight: 600;
	letter-spacing: 0.2em;
	color: ${$color("danger")};
`;

const Title = styled.h1`
	margin: 0;
	font-size: 2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const Message = styled.p`
	margin: 0;
	max-width: 48ch;
	font-size: 1.4rem;
	color: ${$color("muted")};
`;

const HomeLink = styled(Link)`
	margin-top: ${$uw(0.75)};
	font-size: 1.4rem;
	font-weight: 600;
	color: ${$color("primary")};
	&:hover {
		text-decoration: underline;
	}
`;
