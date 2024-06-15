import { describe, expect, it, jest } from "@jest/globals";
import { Registry, type RegistrySchema } from "../registry";
import { RegistryFactory } from "../registry-factory";

describe("RegistryFactory", () => {
	it("should return a Registry instance", () => {
		const instance = RegistryFactory.getInstance();
		expect(instance).toBeInstanceOf(Registry);
	});

	it("should return the same instance for subsequent calls", () => {
		const instance1 = RegistryFactory.getInstance();
		const instance2 = RegistryFactory.getInstance();
		expect(instance1).toBe(instance2);
	});

	it("should set a custom Registry instance", () => {
		class CustomRegistry implements RegistrySchema {
			getServiceForToken = jest.fn();
			registerServiceForToken = jest.fn();
		}

		const instance = new CustomRegistry();
		RegistryFactory.setInstance(instance);
		expect(RegistryFactory.getInstance()).toBe(instance);
	});
});
