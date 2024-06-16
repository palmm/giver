import { RegistryFactory } from "./registry-factory";
import type { Token } from "./token";
import type { Class } from "./class";

export const injectable =
  <C extends Class>(
    tokenOverride?: Token,
    registerServiceForToken: (
      token: Token,
      toRegister: C
    ) => void = RegistryFactory.instance.registerServiceForToken
  ) =>
  (target: C, _context: ClassDecoratorContext<C>) => {
    const token = tokenOverride ?? target.name;
    if (!token) {
      throw new Error(
        "Token is required for injectable decorator but it wasn't provided or couldn't be inferred."
      );
    }

    registerServiceForToken(token, target);
  };
