import type { Class } from "./class";
import { giverInstance } from "./giver-instance";
import type { Token } from "./token";

export const injectable =
	<C extends Class>(tokenOverride?: Token) =>
	(target: C, _context: ClassDecoratorContext<C>) => {
		giverInstance.registerTokenForClass(tokenOverride ?? target, target);
	};
