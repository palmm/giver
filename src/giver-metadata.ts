import { Class } from "./class";

export enum Lifetime {
  Transient = "Transient",
  Singleton = "Singleton",
}

export interface GiverMetadata {
	lifetime: Lifetime;
}

const lifetimeMetadataKey = Symbol("giverLifetime");

const getSymbolFromObject = <T>(record: Record<PropertyKey, unknown> | null, key: string | symbol): T | undefined => {
	const symbol = typeof key === "symbol" ? key : Symbol(key);
	if (record && symbol in record) {
		return (record[symbol]) as T | undefined;
	}

	return undefined;
}

const getMetadataSymbol = Symbol.for('Symbol.metadata');

export const getGiverMetadata = (cls: Class): GiverMetadata | undefined => {
	const metadata = (cls as any)[getMetadataSymbol];
	const lifetime = getSymbolFromObject<Lifetime>(metadata, lifetimeMetadataKey);
	if (!lifetime) {
		return undefined;
	}

	return { lifetime };
}

export const setGiverMetadata = (context: ClassDecoratorContext, metadata: GiverMetadata) => {
	context.metadata[lifetimeMetadataKey] = metadata.lifetime;
}