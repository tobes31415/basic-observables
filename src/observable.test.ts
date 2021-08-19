
import { LightweightObservable } from './observable';

describe("Observable", () => {
    test("notifies of errors", () => {
        const obs = new LightweightObservable(subscriber => {
            subscriber.error!("Something failed");
        });

        const result: any[] = [];
        obs.subscribe({
            next: v => result.push(v),
            error: (reason) => { result.push(reason) },
            complete: () => result.push(0)
        });

        expect(result).toEqual(["Something failed"]);
    });
});