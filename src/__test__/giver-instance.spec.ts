import { describe, expect, it } from "vitest";
import { Giver } from "../giver";
import { giverInstance } from "../giver-instance";

describe("giverInstance", () => {
	it("should be an instance of Giver", () => {
		expect(giverInstance).toBeInstanceOf(Giver);
	});
});
