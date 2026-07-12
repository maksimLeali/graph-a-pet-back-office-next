import Cookies from "js-cookie";

export type SessionUser = {
	id: string;
	role?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	email?: string | null;
};

const TOKEN_KEY = "jwt";
const USER_KEY = "bo_user";

export const auth = {
	getToken: () => Cookies.get(TOKEN_KEY) ?? null,
	saveToken: (token: string) =>
		Cookies.set(TOKEN_KEY, token, { sameSite: "strict", expires: 7 }),
	deleteToken: () => Cookies.remove(TOKEN_KEY),

	getUser: (): SessionUser | null => {
		try {
			return JSON.parse(Cookies.get(USER_KEY) ?? "null");
		} catch {
			return null;
		}
	},
	saveUser: (user: SessionUser) =>
		Cookies.set(USER_KEY, JSON.stringify(user), {
			sameSite: "strict",
			expires: 7,
		}),
	deleteUser: () => Cookies.remove(USER_KEY),

	logout: () => {
		Cookies.remove(TOKEN_KEY);
		Cookies.remove(USER_KEY);
	},
};
