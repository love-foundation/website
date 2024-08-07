<script lang="ts">
	import { fade } from 'svelte/transition';

	export let item;
	export let showDate = false;
	export let lazy = false;
	export let cardClass = '';
	let {
		slug = item.slug ?? null,
		title,
		subtitle = item.hub ? item.hub : null,
		soundcloud,
		starttime,
		imageUrl
	} = item;

	const months = [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUN',
		'JUL',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC'
	];
	let link = soundcloud ? soundcloud : slug ? `/events/${slug}` : null;
	let imageRatio = soundcloud ? 'is-square' : 'is-2by3';
	let eventDate;

	if (showDate && starttime) {
		eventDate = new Date(starttime);
		eventDate =
			eventDate.getDate() + ' / ' + months[eventDate.getMonth()] + ' / ' + eventDate.getFullYear();
	}
</script>

<a
	transition:fade
	rel={soundcloud ? 'nofollow noopener noreferrer' : 'prefetch'}
	href={link ?? '/events'}
	class="item {cardClass}"
>
	<figure data-toggle-class="loaded" class:lazy class:lozad={lazy} class="image {imageRatio}">
		{#if lazy}
			<img class="lozad" data-src={imageUrl} alt="{title} Poster" />
		{:else}
			<img src={imageUrl} alt="{title} Poster" />
		{/if}
	</figure>
	<div class="item-info">
		<h3 class="title">{title}</h3>
		{#if subtitle}
			<h3 class="subtitle">{subtitle}</h3>
		{/if}
		{#if eventDate}
			<h3 class="subtitle">{eventDate}</h3>
		{/if}
	</div>
</a>

<style lang="scss">
	.item {
		padding: 5%;
		padding-bottom: 10%;
		position: relative;
		&.big {
			grid-area: big;
			border-bottom: 1px solid $medium-grey;
			&.left {
				border-right: 1px solid $medium-grey;

				~ .b,
				~ .d {
					border-right: none;
				}
			}
		}
		&.small {
			padding: 10%;
			padding-bottom: 20%;
			&.a {
				grid-area: small-a;
				border-bottom: 1px solid $medium-grey;
				border-right: 1px solid $medium-grey;
			}
			&.b {
				grid-area: small-b;
				border-bottom: 1px solid $medium-grey;
				border-right: 1px solid $medium-grey;
			}
			&.c {
				grid-area: small-c;
				border-bottom: 1px solid $medium-grey;
				border-right: 1px solid $medium-grey;
				align-self: end;
			}
			&.d {
				grid-area: small-d;
				border-bottom: 1px solid $medium-grey;
				border-right: 1px solid $medium-grey;
				align-self: end;
			}
		}
		&.borders {
			padding-top: 4%;
			padding-bottom: 6%;

			.item-info {
				padding-top: 14px;
			}
			&.one + .two {
				border-left: 1px solid $medium-grey;
				border-right: 1px solid $medium-grey;
			}
			&.one {
				border-left: 1px solid $medium-grey;
				&:only-child {
					border-right: 1px solid $medium-grey;
				}
			}
		}
	}

	h3 {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0;
		line-height: 25px;
		text-align: center;
		&.subtitle {
			text-transform: capitalize;
		}
	}

	.item-info {
		height: 0;
		padding-top: 7px;

		.big & {
			padding-top: 12px;
		}
	}

	.image {
		&.is-2by3 {
			padding-top: 141.421356238%;
		}
		img {
			object-fit: contain;
		}

		&.lazy {
			opacity: 0;
			transition: opacity 1s ease-in;
			&.loaded {
				opacity: 1;
			}
		}
	}
</style>
