import { Subject } from "./subject";
import { map } from './operators';

describe("subject", () => {
    test("Emits events", () => {
        const sub = new Subject<number>();

        const result: number[] = [];
        sub.subscribe({
            next: v => result.push(v),
            error: (reason) => { result.push(-1) },
            complete: () => result.push(0)
        });

        expect(result).toEqual([]);
        sub.next(123);
        expect(result).toEqual([123]);
        sub.complete();
        expect(result).toEqual([123, 0]);
    });

    test("Emits errors", () => {
        const sub = new Subject<number>();

        const result: number[] = [];
        sub.subscribe({
            next: v => result.push(v),
            error: (reason) => { result.push(reason) },
            complete: () => result.push(0)
        });

        expect(result).toEqual([]);
        sub.next(123);
        expect(result).toEqual([123]);
        sub.error("fake error");
        expect(result).toEqual([123, "fake error"]);
    });

    test("Is Pipeable", () => {
        const sub = new Subject<number>();
        const obs = sub.pipe(map(v => v * 2));

        const result: number[] = [];
        sub.subscribe({
            next: v => result.push(v),
            error: (reason) => { result.push(-1) },
            complete: () => result.push(0)
        });

        expect(result).toEqual([]);
        sub.next(246);
    });
});