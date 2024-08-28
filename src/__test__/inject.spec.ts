import { describe, expect, it, vi } from "vitest";
import { giverInstance } from "../giver-instance";
import { inject } from "../inject";

class MockInjectedClass {}

describe("inject", () => {
	it("injects requested service", () => {
		const instanceOfSpy = vi.spyOn(giverInstance, "instanceOf");
		const mockInstance = new MockInjectedClass();
		instanceOfSpy.mockReturnValue(mockInstance);

		class MockClass {
			@inject(MockInjectedClass)
			mockInjectedClass!: MockInjectedClass;
		}

		const instance = new MockClass();
		expect(instanceOfSpy).toHaveBeenCalledWith(MockInjectedClass);
		expect(instance.mockInjectedClass).toBe(mockInstance);
	});
});
