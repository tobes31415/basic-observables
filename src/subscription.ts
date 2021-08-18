import { Subscription } from "./types";
import * as gc from "@tobes31415/dispose";

export class LightweightSubscription implements Subscription {
    constructor() {
        this.unsubscribe = this.unsubscribe.bind(this);
    }

    unsubscribe() {
        gc.dispose(this);
    }
}