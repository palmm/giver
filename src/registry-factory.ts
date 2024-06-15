import { Registry, type RegistrySchema } from "./registry";

export class RegistryFactory {
	static instance: RegistrySchema = new Registry();

	static getInstance() {
		return RegistryFactory.instance;
	}

	static setInstance = (instance: RegistrySchema) => {
		this.instance = instance;
	};
}
