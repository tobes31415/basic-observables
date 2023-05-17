import { Subject } from "./subject";
import { map } from "./operators";
import expect from "expect.js";

describe("subject", () => {
  it("Unsubscribe Stops new messages", () => {
    const sub = new Subject<number>();

    const result: number[] = [];
    const subscription = sub.subscribe({
      next: (v) => result.push(v),
      error: (reason) => {
        result.push(-1);
      },
      complete: () => result.push(0),
    });

    expect(result).to.eql([]);
    sub.next(123);
    expect(result).to.eql([123]);
    subscription.unsubscribe();
    sub.next(456);
    expect(result).to.eql([123]);
  });
});
