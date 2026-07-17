"use client";

import {
	ApolloProvider,
	ApolloClient,
	ApolloLink,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import toast from "react-hot-toast";
import _ from "lodash";

import { config } from "./config";
import { auth } from "./auth";

const httpLink = createHttpLink({ uri: config.graphqlUrl });

const authLink = setContext((_op, { headers }) => {
	const token = auth.getToken();
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// 401 = sessione scaduta -> logout. 403 / MEMBERSHIP_NOT_ACTIVE NON fanno
// logout: in un back office multi-rifugio un divieto su un tenant è normale;
// si notifica il provider autorizzativo che ricarica backofficeAccessContext
// (l'utente può aver perso una membership mentre era in sessione).
const unauthorizedLink = new ApolloLink((operation, forward) =>
	forward(operation).map((response) => {
		const code = _.get(response, "errors.0.extensions.code", "");
		const errorCode = _.get(response, "errors.0.extensions.error_code", "");
		if (["401", 401].includes(code as string | number)) {
			toast.error("Sessione scaduta");
			auth.logout();
			setTimeout(() => {
				window.location.href = "/login";
			}, 1200);
		} else if (
			(["403", 403].includes(code as string | number) ||
				errorCode === "MEMBERSHIP_NOT_ACTIVE") &&
			// il 403 delle query di bootstrap autorizzativo non deve
			// ri-innescare il refresh del contesto (loop probe→403→refresh)
			!["backofficeAccessContext", "backofficeShelterAccess"].includes(
				operation.operationName ?? ""
			)
		) {
			window.dispatchEvent(new Event("gap-bo:authz-refresh"));
		}
		return response;
	})
);

export const apolloClient = new ApolloClient({
	link: unauthorizedLink.concat(authLink).concat(httpLink),
	cache: new InMemoryCache(),
});

export const ApolloWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
