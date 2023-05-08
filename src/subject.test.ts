import { Subject } from "./subject";
import { map } from "./operators";
import expect from "expect.js";

describe("subject", () => {
  it("Emits events", () => {
    const sub = new Subject<number>();

    const result: number[] = [];
    sub.subscribe({
      next: (v) => result.push(v),
      error: (reason) => {
        result.push(-1);
      },
      complete: () => result.push(0),
    });

    expect(result).to.eql([]);
    sub.next(123);
    expect(result).to.eql([123]);
    sub.complete();
    expect(result).to.eql([123, 0]);
  });

  it("Emits errors", () => {
    const sub = new Subject<number>();

    const result: number[] = [];
    sub.subscribe({
      next: (v) => result.push(v),
      error: (reason) => {
        result.push(reason);
      },
      complete: () => result.push(0),
    });

    expect(result).to.eql([]);
    sub.next(123);
    expect(result).to.eql([123]);
    sub.error("fake error");
    expect(result).to.eql([123, "fake error"]);
  });

  it("Is Pipeable", () => {
    const sub = new Subject<number>();
    const obs = sub.pipe(map((v) => v * 2));

    const result: number[] = [];
    sub.subscribe({
      next: (v) => result.push(v),
      error: (reason) => {
        result.push(-1);
      },
      complete: () => result.push(0),
    });

    expect(result).to.eql([]);
    sub.next(246);
  });
});
