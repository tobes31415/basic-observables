import { from, of, map, filter, scan, take, skip } from "./operators";

describe("Operators", () => {
    describe("from", () => {
        test("emits values", () => {
            const obs = from([1, 2, 3]);

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([1, 2, 3, 0]);
        });
    });
    describe("of", () => {
        test("emits values", () => {
            const obs = of(1, 2, 3);

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([1, 2, 3, 0]);
        });
    });
    describe("map", () => {
        test("changes values", () => {
            const obs = of(1, 2, 3).pipe(map(v => v * 2));

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([2, 4, 6, 0]);
        });
    });
    describe("filter", () => {
        test("filters values", () => {
            const obs = of(1, 2, 3, 4, 5, 6).pipe(filter(v => v % 2 === 0));

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([2, 4, 6, 0]);
        });
    });
    describe("scan", () => {
        test("scans values", () => {
            const obs = of(1, 2, 3, 4, 5, 6).pipe(scan((acc, v) => acc + v, 0));

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([1, 3, 6, 10, 15, 21, 0]);
        });
    });
    describe("take", () => {
        test("takes n values", () => {
            const obs = of(1, 2, 3, 4, 5, 6).pipe(take(4));

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([1, 2, 3, 4, 0]);
        });
    });
    describe("skip", () => {
        test("skips values", () => {
            const obs = of(1, 2, 3, 4, 5, 6).pipe(skip(2));

            const result: number[] = [];
            obs.subscribe({
                next: v => result.push(v),
                error: (reason) => { result.push(-1) },
                complete: () => result.push(0)
            });

            expect(result).toEqual([3, 4, 5, 6, 0]);
        });
    });
});