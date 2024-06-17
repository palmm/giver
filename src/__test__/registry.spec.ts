import { beforeEach, describe, expect, it } from "@jest/globals";
import { Registry } from "../registry";

class MockComponent {}

describe("Registry", () => {
	let registry: Registry;

	beforeEach(() => {
		registry = new Registry();
	});

	it("should return an instance of a registered component", () => {
		const token = Symbol("MockComponent");
		registry.registerServiceForToken(token, MockComponent);
		const instance = registry.getServiceForToken(token);
		expect(instance).toBeInstanceOf(MockComponent);
	});

	it("should return the same instance for subsequent calls", () => {
		const token = Symbol("MockComponent");
		registry.registerServiceForToken(token, MockComponent);
		const instance1 = registry.getServiceForToken(token);
		const instance2 = registry.getServiceForToken(token);
		expect(instance1).toBe(instance2);
	});

	it("should throw an error if the component is not registered", () => {
		const token = Symbol("MockComponent");
		expect(() => registry.getServiceForToken(token)).toThrowError();
	});
});
