import { describe, expect, it, jest } from "@jest/globals";
import { inject } from "../inject";

class MockInjectedClass {}

describe("inject", () => {
	it("injects requested service by name token", () => {
		const getClassForToken = jest.fn();

		class MockClass {
			@inject(undefined, getClassForToken)
			mockInjectedClass!: MockInjectedClass;
		}

		new MockClass();
		expect(getClassForToken).toHaveBeenCalledWith(
			MockInjectedClass.name.toLowerCase(),
		);
	});

	it("injects requested service by provided token", () => {
		const token = Symbol("MockInjectedClass");
		const getClassForToken = jest.fn();

		class MockClass {
			@inject(token, getClassForToken)
			mockInjectedClass!: MockInjectedClass;
		}

		new MockClass();
		expect(getClassForToken).toHaveBeenCalledWith(token);
	});

	it("should return an instance of the requested service", () => {
		const mockInjectedClass = new MockInjectedClass();
		const getClassForToken = jest.fn(() => mockInjectedClass);

		class MockClass {
			@inject(undefined, getClassForToken)
			mockInjectedClass!: MockInjectedClass;
		}

		const instance = new MockClass();
		expect(instance.mockInjectedClass).toBe(mockInjectedClass);
	});
});
