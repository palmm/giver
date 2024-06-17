import type { Class } from "./class";
import { RegistryFactory } from "./registry-factory";
import type { Token } from "./token";

export const inject =
	(
		classOrToken: Token | Class,
		getServiceForToken: (token: Token) => any = RegistryFactory.instance
			.getServiceForToken,
	) =>
	(_target: unknown, _context: ClassFieldDecoratorContext) => {
		if (typeof classOrToken === "string" || typeof classOrToken === "symbol") {
			return () => getServiceForToken(classOrToken);
		}

		const targetToken = classOrToken.name;
		return () => getServiceForToken(targetToken);
	};
