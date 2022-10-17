<script lang="ts">
	import type { Content as ContentCollection } from '$lib/types';

	export let content: ContentCollection;
	export let lazy: boolean;

	let wysiwyg;
	let layout;

	wysiwyg = content.text;
	layout = content.text_layout;

	let classNames = '';
	switch (layout) {
		case 'two_columns':
			classNames = 'column is-8 two-col';
			break;
		case 'full_width':
			classNames = 'column is-8';
			break;
		case 'one_column':
			classNames = 'column is-4';
	}
</script>

<section class={classNames} class:lazy data-toggle-class="loaded" class:lozad={lazy}>
	{@html wysiwyg}
</section>

<style lang="scss">
	.two-col {
		columns: 2;
		column-fill: balance;
	}
	.lazy {
		opacity: 0;
		margin-top: -50px;
		transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94), opacity 1s ease-in;
		&.loaded {
			opacity: 1;
			margin-top: 0;
		}
	}
</style>
