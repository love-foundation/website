<script>
	import GridItem from './GridItem.svelte';
	export let itemGroup = [];
	export let lazy = false;
	export let groupIndex = 0;

	let isEven = groupIndex % 2 == 0;

	const mapping = {
		0: 'a',
		1: 'b',
		2: 'c',
		3: 'd'
	};

	$: {
		if (!isEven) {
			let lastItem = itemGroup.pop();
			itemGroup = [lastItem, ...itemGroup];
		}
	}
</script>

<div class="grid-group" class:even={isEven}>
	{#if isEven}
		<GridItem item={itemGroup[0]} {lazy} cardClass={'big left'} />
	{/if}

	{#each itemGroup.slice(1, itemGroup.length) as item, i (item.id)}
		<GridItem {lazy} {item} cardClass={`small ${mapping[i]}`} />
	{/each}

	{#if !isEven}
		<GridItem {lazy} item={itemGroup[0]} cardClass={'big right'} />
	{/if}
</div>

<style lang="scss">
	.grid-group {
		display: grid;
		grid-template-areas:
			'small-a'
			'small-b'
			'small-c'
			'small-d'
			'big';
		grid-template-columns: 100%;
		@include desktop {
			grid-template-areas:
				'small-a small-b big big'
				'small-c small-d big big';
			grid-template-columns: 25% 25% 25% 25%;
		}
		&.even {
			grid-template-areas:
				'big'
				'small-a'
				'small-b'
				'small-c'
				'small-d';
			@include desktop {
				grid-template-areas:
					'big big small-a small-b'
					'big big small-c small-d';
			}
		}
	}
</style>
