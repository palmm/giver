import { Class } from "./class";

export const getDecoratorMetadataFromClass = (cls: Class): DecoratorMetadata => {
  return (cls as any)[Symbol.for("Symbol.metadata")];
}