import { RegistryFactory } from "./registry-factory";
import type { Token } from "./token";

export const injectable =
	<Class extends abstract new (...args: any) => any>(
		tokenOverride?: Token,
		registerServiceForToken: (
			token: Token,
			toRegister: Class,
		) => void = RegistryFactory.instance.registerServiceForToken,
	) =>
	(target: Class, context: ClassDecoratorContext<Class>) => {
		const { name } = context;
		const token = tokenOverride ?? name?.toString().toLowerCase();
		if (!token) {
			throw new Error(
				"Token is required for injectable decorator but it wasn't provided or couldn't be inferred.",
			);
		}

		registerServiceForToken(token, target);
	};
