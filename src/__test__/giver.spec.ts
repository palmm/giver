import { beforeEach, describe, expect, it } from "vitest";
import { Giver } from "../giver";

describe("Giver", () => {
	let giver: Giver;

	beforeEach(() => {
		giver = new Giver();
	});

	it("should register and retrieve a class provider", () => {
		class TestClass {}
		giver.registerTokenForClass(TestClass, TestClass);
		const instance = giver.instanceOf(TestClass);
		expect(instance).toBeInstanceOf(TestClass);
	});

	it("should throw an error when trying to retrieve an unregistered token", () => {
		class UnregisteredClass {}
		expect(() => giver.instanceOf(UnregisteredClass)).toThrow(
			"No provider registered for token: class UnregisteredClass",
		);
	});

	it("should throw an error for invalid provider type", () => {
		const invalidToken = Symbol("invalidToken");
		giver.providerRegistry.set(invalidToken, {} as any);
		expect(() => giver.instanceOf(invalidToken)).toThrow(
			"No provider registered for token: Symbol(invalidToken)",
		);
	});
});
