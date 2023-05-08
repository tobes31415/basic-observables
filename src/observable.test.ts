import { LightweightObservable } from "./observable";
import expect from "expect.js";

describe("Observable", () => {
  it("notifies of errors", () => {
    const obs = new LightweightObservable((subscriber) => {
      subscriber.error!("Something failed");
    });

    const result: any[] = [];
    obs.subscribe({
      next: (v) => result.push(v),
      error: (reason) => {
        result.push(reason);
      },
      complete: () => result.push(0),
    });

    expect(result).to.eql(["Something failed"]);
  });
});
