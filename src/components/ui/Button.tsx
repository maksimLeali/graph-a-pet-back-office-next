"use client";

import styled, { css } from "styled-components";

import { $color, $uw } from "@/theme";

type Variant = "primary" | "ghost" | "danger";

export const Button: React.FC<
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: Variant;
		loading?: boolean;
	}
> = ({ variant = "primary", loading, children, ...rest }) => (
	<Btn {...rest} $variant={variant} disabled={rest.disabled || loading}>
		{loading && <Spin aria-hidden />}
		{children}
	</Btn>
);

const variants = {
	primary: css`
		background: ${$color("primary")};
		color: ${$color("primary-contrast")};
		border: 1px solid transparent;
		&:hover:not(:disabled) {
			background: ${$color("primary-strong")};
		}
		&:disabled {
			background: ${$color("border")};
			color: ${$color("dim")};
		}
	`,
	ghost: css`
		background: transparent;
		color: ${$color("muted")};
		border: 1px solid ${$color("border-strong")};
		&:hover:not(:disabled) {
			border-color: ${$color("dim")};
			color: ${$color("text")};
		}
	`,
	danger: css`
		background: transparent;
		color: ${$color("danger")};
		border: 1px solid ${$color("danger-strong")};
		&:hover:not(:disabled) {
			background: rgba(185, 28, 28, 0.15);
		}
	`,
};

const Btn = styled.button<{ $variant: Variant }>`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${$uw(0.5)};
	border-radius: ${$uw(0.5)};
	padding: ${$uw(0.6)} ${$uw(1)};
	font-size: 1.4rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
	${({ $variant }) => variants[$variant]}
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

const Spin = styled.span`
	width: ${$uw(1)};
	height: ${$uw(1)};
	border-radius: 50%;
	border: 2px solid currentColor;
	border-top-color: transparent;
	animation: spin 0.7s linear infinite;
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;
