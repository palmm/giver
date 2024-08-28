import { describe, expect, it } from "vitest";
import { giverInstance } from "../giver-instance";
import { inject } from "../inject";
import { injectable } from "../injectable";

describe("e2e giver", () => {
	it("should throw if class is not registered", () => {
		class MyService {}

		expect(() => giverInstance.instanceOf(MyService)).toThrow(
			"No provider registered for token: class MyService",
		);
	});

	it("supports injection of dependencies and ", () => {
		@injectable()
		class MyDependency {
			log = (msg: string) => console.log(msg);
		}

		@injectable()
		class MyOtherDependency {
			getContent = () => "content";
		}

		@injectable()
		class MyService {
			@inject(MyDependency)
			myDependency!: MyDependency;

			@inject(MyOtherDependency)
			myOtherDependency!: MyOtherDependency;

			doWork = () => {
				this.myDependency.log(this.myOtherDependency.getContent());
			};
		}

		const myService = giverInstance.instanceOf(MyService);
		myService.doWork();
	});
});
