import { Token } from "./token";

interface InjectMetadata {
  token: Token;
}

const injectMetadataKey = Symbol.for("injectMetadata");

export const addToInjectMetadata = (metadata: DecoratorMetadata, injectMetadata: InjectMetadata) => {
  const existingMetadata = metadata[injectMetadataKey] as InjectMetadata[] | undefined;
  if (existingMetadata) {
    existingMetadata.push(injectMetadata);
  } else {
    metadata[injectMetadataKey] = [injectMetadata];
  }
}

export const getInjectMetadata = (metadata: DecoratorMetadata): InjectMetadata[] => {
  return metadata[injectMetadataKey] as InjectMetadata[] | undefined ?? [];
}