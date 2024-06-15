import type { Token } from "./token";

export interface RegistrySchema {
	registerServiceForToken(
		token: Token,
		componentClass: abstract new (...args: any) => any,
	): void;

	getServiceForToken(token: Token): any;
}

export class Registry implements RegistrySchema {
	private tokenToClass = new Map();
	private tokenToInstance = new Map();

	registerServiceForToken(token: Token, componentClass: any) {
		if (this.tokenToClass.has(token)) {
			throw new Error(
				`Service already registered: ${JSON.stringify(token, null, 2)}`,
			);
		}

		this.tokenToClass.set(token, componentClass);
	}

	getServiceForToken(token: Token) {
		const existingInstance = this.tokenToInstance.get(token);
		if (existingInstance) {
			return existingInstance;
		}

		const componentClass = this.tokenToClass.get(token);
		if (componentClass === undefined) {
			throw new Error(
				`Token not registered for service: ${JSON.stringify(token, null, 2)}`,
			);
		}

		const instance = new componentClass();
		this.tokenToInstance.set(token, instance);
		return instance;
	}
}
