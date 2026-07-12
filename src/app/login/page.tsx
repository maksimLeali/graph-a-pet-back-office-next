"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useLoginMutation } from "@/graphql/__generated__/login.generated";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { $color, $uw } from "@/theme";

type FormValues = { email: string; password: string };

export default function LoginPage() {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormValues>();

	const [login, { loading }] = useLoginMutation({
		onCompleted: ({ login }) => {
			if (login.error || !login.token || !login.user) {
				toast.error("Credenziali non valide");
				return;
			}
			auth.saveToken(login.token);
			auth.saveUser(login.user);
			router.replace("/dashboard");
		},
		onError: () => toast.error("Errore di accesso"),
	});

	return (
		<Screen>
			<LoginForm
				onSubmit={handleSubmit((variables) => login({ variables }))}
			>
				<Brand>Graph-a-Pet</Brand>
				<Sub>Back office — accedi con il tuo account amministratore</Sub>

				<Fields>
					<Input
						label="Email"
						type="email"
						autoComplete="email"
						placeholder="admin@example.com"
						{...register("email", { required: true })}
					/>
					<Input
						label="Password"
						type="password"
						autoComplete="current-password"
						placeholder="••••••••"
						{...register("password", { required: true })}
					/>
					<SubmitButton type="submit" loading={loading}>
						Accedi
					</SubmitButton>
				</Fields>
			</LoginForm>
		</Screen>
	);
}

const Screen = styled.main`
	display: flex;
	min-height: 100dvh;
	align-items: center;
	justify-content: center;
	padding: ${$uw(1.5)};
`;

const LoginForm = styled.form`
	width: 100%;
	max-width: ${$uw(24)};
	border: 1px solid ${$color("border")};
	background: ${$color("card")};
	border-radius: ${$uw(1)};
	padding: ${$uw(2)};
`;

const Brand = styled.h1`
	margin: 0 0 ${$uw(0.25)};
	font-size: 2.2rem;
	font-weight: 700;
	color: ${$color("text")};
`;

const Sub = styled.p`
	margin: 0 0 ${$uw(2)};
	font-size: 1.3rem;
	color: ${$color("dim")};
`;

const Fields = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${$uw(1)};
`;

const SubmitButton = styled(Button)`
	margin-top: ${$uw(0.5)};
	width: 100%;
`;
