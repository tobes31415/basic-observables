**@tobes31415/basic-observables** • [**Docs**](globals.md)

***

# Basic-Observables

A lightweight implementation of the observable pattern.

This is meant to cover many of the common needs so that you don't always need to reach for larger libraries at the start. The syntax is compatible with a particularly well know asynchrounous event library, so when your application grows to the point you need all those extra features you can seamlessly transition without having to rewrite your code, just change your imports.

[View API Docs](docs/globals.md)

# Installation

    npm install --save @tobes31415/basic-observables

# Basic Useage

    import { subject } from "@tobes31415/basic-observables";

    const event = new Subject<number>();
    event.subscribe(value => console.log("The event happened", value));

    event.next(123);
    // "The event happened", 123

## Thank you

Big thank you to Macadamian Technologies for donating time towards this open source project :-)
