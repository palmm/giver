import { giverInstance } from "./giver-instance";
import type { Token } from "./token";

export const inject =
	(token: Token): any =>
	(_target: unknown, _context: ClassFieldDecoratorContext) => {
		return () => giverInstance.instanceOf(token);
	};
