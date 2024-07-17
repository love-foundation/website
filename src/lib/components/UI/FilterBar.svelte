<script lang="ts">
	import Select from 'svelte-select';
	import { createEventDispatcher } from 'svelte';
	import { updateClass, setTransitionDuration } from '$lib/helpers/sharedFunctions';

	const dispatch = createEventDispatcher();

	export let filters: Record<
		string,
		{
			options: string[];
			placeholder: string;
			value: string | boolean | null | undefined;
		}
	>;

	let headerClass = 'show';
	let y = 0;
	let lastY = 0;
	let helper;

	function selected(key: string, event: CustomEvent) {
		dispatch('selected', { [key]: event.detail.value });
	}

	$: {
		helper = updateClass(y, lastY);
		headerClass = helper.class;
		lastY = helper.lastY;
	}
</script>

<svelte:window bind:scrollY={y} />

<div use:setTransitionDuration class={`topbar columns is-horizontal ${headerClass}`}>
	{#each Object.entries(filters) as [key, { options, placeholder, value }]}
		<div class="column is-3">
			<div class="select" class:active={true}>
				<Select
					inputAttributes={{ readonly: 'readonly' }}
					{value}
					items={options}
					{placeholder}
					on:select={(e) => {
						selected(key, e);
					}}
					on:clear={() => {
						dispatch('clear', key);
					}}
				/>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.topbar {
		position: fixed;
		width: 100%;
		border-bottom: 1px solid $medium-grey;
		background: $white;
		z-index: 10;
		left: 0;
		right: 0;
		top: $mobile-header-height;
		margin-top: -57px;
		height: $mobile-header-height;
		transition: transform 300ms ease-in-out;

		@include desktop {
			height: $desktop-header-height;
			top: $desktop-header-height;
			margin: 0;
			margin-top: -50px;
			justify-content: space-between;
		}
		&.show {
			transform: translateY(100%);
		}
		&.hide {
			transform: translateY(0%);
		}
		.column {
			padding: unset;
		}
	}
	.select {
		--border: none;
		--placeholderColor: black;
		--inputFontSize: 2.8rem;
		--height: 54px;
		--itemIsActiveColor: black;
		--itemHoverBG: #f8f8f8;
		--background: transparent;
		--listShadow: none;
		--border-radius: 0;
		--listBorderRadius: 0;
		--itemIsActiveBG: #f8f8f8;
		--itemFirstBorderRadius: 0;
		--itemPadding: 0 16px;
		position: relative;
		@include desktop {
			--inputFontSize: 3rem;
		}
	}
	.hide-on-mobile {
		display: none;
		@include desktop {
			display: block;
		}
	}

	:global(.listContainer) {
		margin-top: -10px;
		border: 1px solid $medium-grey;
		font-size: 20px;
		font-size: 2rem;
		cursor: pointer !important;

		@include desktop {
			font-size: 30px;
			font-size: 3rem;
		}
	}
	:global(input) {
		font-family: $family-primary;
		color: $black;
		font-size: 20px;
		font-size: 2rem;
		cursor: pointer !important;
		&::placeholder {
			opacity: 1;
		}
		@include desktop {
			font-size: 30px;
			font-size: 3rem;
		}
	}
	:global(.selectedItem) {
		font-size: 20px;
		font-size: 2rem;
		color: $black;
		overflow-x: visible !important;
		width: auto;
		@include desktop {
			font-size: 30px;
			font-size: 3rem;
		}
	}
	:global(.selection) {
		overflow-x: visible !important;
		text-transform: capitalize !important;
	}
</style>
