import { describe, expect, it, vi } from "vitest";
import { giverInstance } from "../giver-instance";
import { injectable } from "../injectable";

describe("injectable", () => {
	it("registers class with giverInstance", () => {
		const registerSpy = vi.spyOn(giverInstance, "registerTokenForClass");

		@injectable()
		class TestClass {}

		expect(registerSpy).toHaveBeenCalledWith(TestClass, TestClass);
	});

	it("registers class with custom token", () => {
		const registerSpy = vi.spyOn(giverInstance, "registerTokenForClass");
		const customToken = Symbol("customToken");

		@injectable(customToken)
		class TestClass {}

		expect(registerSpy).toHaveBeenCalledWith(customToken, TestClass);
	});
});
