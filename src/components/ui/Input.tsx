"use client";

import { forwardRef } from "react";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
	({ label, error, className, id, ...rest }, ref) => {
		const inputId = id ?? rest.name;
		return (
			<Field className={className} htmlFor={inputId}>
				{label && <FieldLabel>{label}</FieldLabel>}
				<StyledInput ref={ref} id={inputId} $error={!!error} {...rest} />
				{error && <FieldError>{error}</FieldError>}
			</Field>
		);
	}
);
Input.displayName = "Input";

export const Field = styled.label`
	display: flex;
	flex-direction: column;
	gap: ${$uw(0.4)};
`;

export const FieldLabel = styled.span`
	font-size: 1.3rem;
	font-weight: 500;
	color: ${$color("muted")};
`;

const FieldError = styled.span`
	font-size: 1.2rem;
	color: ${$color("danger")};
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
	border-radius: ${$uw(0.5)};
	border: 1px solid
		${({ $error }) => ($error ? $color("danger-strong") : $color("border-strong"))};
	background: ${$color("surface")};
	padding: ${$uw(0.6)} ${$uw(0.8)};
	font-size: 1.4rem;
	color: ${$color("text")};
	outline: none;
	transition: border-color 0.15s ease;
	&::placeholder {
		color: ${$color("dim")};
	}
	&:focus {
		border-color: ${$color("primary")};
	}
`;
