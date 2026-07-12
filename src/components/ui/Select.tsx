"use client";

import { forwardRef } from "react";
import styled from "styled-components";

import { $color, $uw } from "@/theme";

import { Field, FieldLabel } from "./Input";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string;
	options: { value: string; label: string }[];
	placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
	({ label, options, placeholder, className, id, ...rest }, ref) => {
		const selectId = id ?? rest.name;
		return (
			<Field className={className} htmlFor={selectId}>
				{label && <FieldLabel>{label}</FieldLabel>}
				<StyledSelect ref={ref} id={selectId} {...rest}>
					{placeholder && <option value="">{placeholder}</option>}
					{options.map((o) => (
						<option key={o.value} value={o.value}>
							{o.label}
						</option>
					))}
				</StyledSelect>
			</Field>
		);
	}
);
Select.displayName = "Select";

const StyledSelect = styled.select`
	cursor: pointer;
	border-radius: ${$uw(0.5)};
	border: 1px solid ${$color("border-strong")};
	background: ${$color("surface")};
	padding: ${$uw(0.6)} ${$uw(0.8)};
	font-size: 1.4rem;
	color: ${$color("text")};
	outline: none;
	transition: border-color 0.15s ease;
	&:focus {
		border-color: ${$color("primary")};
	}
`;
