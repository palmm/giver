import type { Class } from "./class";

interface ClassProvider {
	class: Class;
}

export const isClassProvider = (
	provider: Provider,
): provider is ClassProvider => {
	return typeof provider === "object" && "class" in provider;
};

interface FunctionProvider {
	factory: (...args: unknown[]) => unknown;
}

export const isFunctionProvider = (
	provider: Provider,
): provider is FunctionProvider => {
	return typeof provider === "object" && "factory" in provider;
};

interface ValueProvider {
	value: unknown;
}

export const isValueProvider = (
	provider: Provider,
): provider is ValueProvider => {
	return typeof provider === "object" && "value" in provider;
};

export type Provider = ClassProvider | FunctionProvider | ValueProvider;
