import type Lenis from "lenis";

// The smooth-scroll instance is shared so the menu can pause it and anchor links can drive it.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => { instance = lenis; };
export const getLenis = () => instance;
