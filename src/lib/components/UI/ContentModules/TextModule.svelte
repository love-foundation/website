<script lang="ts">
	import type { ContentCollection } from '$lib/types';

	export let content: ContentCollection;

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

<div class={classNames}>
	{@html wysiwyg}
</div>

<style lang="scss">
	.two-col {
		columns: 2;
		column-fill: balance;
	}
</style>
