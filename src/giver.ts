import type { Class } from "./class";
import {
	type Provider,
	isClassProvider,
	isFunctionProvider,
	isValueProvider,
} from "./provider";
import type { Token } from "./token";

export class Giver {
	providerRegistry = new Map<Token, Provider>();

	registerTokenForClass = (token: Token, classToProvide: Class) => {
		this.providerRegistry.set(token, {
			class: classToProvide,
		});
	};

	instanceOf = <T extends Token>(
		token: T,
	): T extends Class ? InstanceType<T> : T => {
		const provider = this.providerRegistry.get(token);
		if (!provider) {
			throw new Error(`No provider registered for token: ${String(token)}`);
		}

		if (isClassProvider(provider)) {
			return new provider.class() as any;
		}

		if (isFunctionProvider(provider)) {
			return provider.factory() as any;
		}

		if (isValueProvider(provider)) {
			return provider.value as any;
		}

		throw new Error(`No provider registered for token: ${String(token)}`);
	};
}
