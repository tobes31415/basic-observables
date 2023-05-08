import { from, of, map, filter, scan, take, skip } from "./operators";
import expect from "expect.js";

describe("Operators", () => {
  describe("from", () => {
    it("emits values", () => {
      const obs = from([1, 2, 3]);

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([1, 2, 3, 0]);
    });
  });
  describe("of", () => {
    it("emits values", () => {
      const obs = of(1, 2, 3);

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([1, 2, 3, 0]);
    });
    it("Can subscribe with functions", () => {
      const obs = of(1, 2, 3);

      const result: any[] = [];
      obs.subscribe(
        (v) => {
          result.push(v);
        },
        (reason) => {
          result.push(reason);
        },
        () => {
          result.push(0);
        },
      );

      expect(result).to.eql([1, 2, 3, 0]);
    });
  });
  describe("map", () => {
    it("changes values", () => {
      const obs = of(1, 2, 3).pipe(map((v) => v * 2));

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([2, 4, 6, 0]);
    });
  });
  describe("filter", () => {
    it("filters values", () => {
      const obs = of(1, 2, 3, 4, 5, 6).pipe(filter((v) => v % 2 === 0));

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([2, 4, 6, 0]);
    });
  });
  describe("scan", () => {
    it("scans values", () => {
      const obs = of(1, 2, 3, 4, 5, 6).pipe(scan((acc, v) => acc + v, 0));

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([1, 3, 6, 10, 15, 21, 0]);
    });
  });
  describe("take", () => {
    it("takes n values", () => {
      const obs = of(1, 2, 3, 4, 5, 6).pipe(take(4));

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([1, 2, 3, 4, 0]);
    });
  });
  describe("skip", () => {
    it("skips values", () => {
      const obs = of(1, 2, 3, 4, 5, 6).pipe(skip(2));

      const result: number[] = [];
      obs.subscribe({
        next: (v) => result.push(v),
        error: (reason) => {
          result.push(-1);
        },
        complete: () => result.push(0),
      });

      expect(result).to.eql([3, 4, 5, 6, 0]);
    });
  });
});
