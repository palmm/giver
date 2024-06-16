import { describe, expect, it, jest } from "@jest/globals";
import { injectable } from "../injectable";

describe("injectable", () => {
	it("should register class to registry with provided token", () => {
		const registerMock = jest.fn();
		const token = Symbol("TestClass");

		@injectable(token, registerMock)
		class TestClass {}

		expect(registerMock).toHaveBeenCalledWith(token, TestClass);
	});

	it("should register class to registry with class name token", () => {
		const registerMock = jest.fn();

		@injectable(undefined, registerMock)
		class TestClass {}

		expect(registerMock).toHaveBeenCalledWith(
			TestClass.name,
			TestClass,
		);
	});

	it("should throw error when class has no name", () => {
		const registerMock = jest.fn();
		const wrapper = jest.fn(() => {
			(
				@injectable(undefined, registerMock)
				class {}
			);
		});

		expect(registerMock).not.toHaveBeenCalled();
		expect(wrapper).toThrowError();
	});
});
