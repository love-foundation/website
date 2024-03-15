// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Content } from "$lib/types";

// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	interface PageData {
    vereniging?: Content[];
  }
	// interface Platform {}
}

export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
