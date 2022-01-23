<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { updateClass, setTransitionDuration } from '$lib/helpers/sharedFunctions';

	export let navActive = false;
	export let segment = '';

	let dispatch = createEventDispatcher();

	let headerClass = 'show';

	let y = 0;
	let lastY = 0;
	let helper;

	function toggleNav() {
		navActive = !navActive;
		dispatch('nav');
	}

	$: if (navActive) {
		headerClass = 'show';
	} else {
		helper = updateClass(y, lastY);
		headerClass = helper.class;
		lastY = helper.lastY;
	}
</script>

<svelte:window bind:scrollY={y} />

<header>
	<div use:setTransitionDuration class={headerClass}>
		<a class="homelink" href="/">
			<h2>
				{#if !segment}
					Love Foundation
				{:else}
					{segment}
				{/if}
			</h2>
		</a>

		<div class="side">
			<button
				class:is-active={navActive}
				class="hamburger hamburger--squeeze"
				type="button"
				on:click={toggleNav}
				data-cy="toggleNav"
			>
				<span class="hamburger-box">
					<span class="hamburger-inner" />
				</span>
			</button>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		position: fixed;
		top: 0;
		z-index: 10000;
		width: 100%;
		height: $mobile-header-height;

		@include tablet {
			height: $desktop-header-height;
		}

		&:hover > div {
			transform: translateY(0%);
		}

		> div {
			box-sizing: border-box;
			padding-top: 8px;
			height: 100%;
			background-color: $black;
			transition: transform 300ms ease-in-out;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.homelink {
				padding-left: 15px;
				text-decoration: none;
				color: white;
				padding-bottom: 5px;
				h2 {
					text-transform: uppercase;
					font-size: 25px !important;
					font-size: 2.5rem !important;
					margin-top: -4px;

					@include tablet {
						font-size: 30px !important;
						font-size: 3rem !important;
						padding-top: unset;
					}
				}
			}
		}
	}

	.show {
		transform: translateY(0%);
	}
	.hide {
		transform: translateY(-100%);
	}

	/*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
	.hamburger {
		padding: 15px 15px;
		display: inline-block;
		cursor: pointer;
		transition-property: opacity, filter;
		transition-duration: 0.15s;
		transition-timing-function: linear;
		font: inherit;
		color: inherit;
		text-transform: none;
		background-color: transparent;
		border: 0;
		margin: 0;
		overflow: visible;
	}

	.hamburger.is-active .hamburger-inner,
	.hamburger.is-active .hamburger-inner::before,
	.hamburger.is-active .hamburger-inner::after {
		background-color: #fff;
	}

	.hamburger-box {
		width: 33px;
		height: 24px;
		display: inline-block;
		position: relative;

		@include tablet {
			width: 40px;
		}
	}

	.hamburger-inner {
		display: block;
		top: 50%;
		margin-top: -2px;
	}
	.hamburger-inner,
	.hamburger-inner::before,
	.hamburger-inner::after {
		width: 30px;
		height: 2px;
		background-color: #fff;
		position: absolute;
		transition-property: transform;
		transition-duration: 0.15s;
		transition-timing-function: ease;

		@include tablet {
			width: 34px;
		}
	}
	.hamburger-inner::before,
	.hamburger-inner::after {
		content: '';
		display: block;
	}
	.hamburger-inner::before {
		top: -9px;
		@include tablet {
			top: -10px;
		}
	}
	.hamburger-inner::after {
		bottom: -9px;
		@include tablet {
			bottom: -10px;
		}
	}

	.hamburger--squeeze {
		.hamburger-inner {
			transition-duration: 0.075s;
			transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

			&::before {
				transition: top 0.075s 0.12s ease, opacity 0.075s ease;
			}

			&::after {
				transition: bottom 0.075s 0.12s ease,
					transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
			}
		}

		&.is-active {
			.hamburger-inner {
				transform: rotate(45deg);
				transition-delay: 0.12s;
				transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

				&::before {
					top: 0;
					opacity: 0;
					transition: top 0.075s ease, opacity 0.075s 0.12s ease;
				}

				&::after {
					bottom: 0;
					transform: rotate(-90deg);
					transition: bottom 0.075s ease, transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
				}
			}
		}
	}

	.hamburger:focus {
		outline: none;
	}
</style>
