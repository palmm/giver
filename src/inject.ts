import { RegistryFactory } from "./registry-factory";
import type { Token } from "./token";

export const inject =
	<This, FieldType>(
		tokenOverride?: Token,
		getServiceForToken: (token: Token) => any = RegistryFactory.instance
			.getServiceForToken,
	) =>
	(
		_target: FieldType | undefined,
		context: ClassFieldDecoratorContext<This, FieldType>,
	) => {
		const { name } = context;
		const token = tokenOverride ?? name.toString().toLowerCase();
		return () => getServiceForToken(token);
	};
