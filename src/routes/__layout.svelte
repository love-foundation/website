<script lang="ts">
	import Nav from '../components/UI/Nav.svelte';
	import Footer from '../components/UI/Footer.svelte';
	import { page } from '$app/stores';
	import CookieBar from '../components/UI/CookieBar.svelte';

	export let segment;

	let winHeight = 0;
	let y = 0;
	let progress = 0;
	let docHeight = 0;
	let mainClasses = '';
	let progressClasses = '';

	// TODO: Fix usage of path here
	mainClasses = $page.path === '/events' ? 'events' : '';

	$: progressClasses = $page.path === '/events' || $page.path === '/artists' ? 'background' : '';

	$: if (docHeight > winHeight) {
		progress = y / (docHeight - winHeight);
	}

	let siteId = process.env.NODE_ENV === 'production' ? 2 : 1;
</script>

<svelte:head>
	<style src="../styles/global.scss">
	</style>
	<!-- Matomo -->
	<script type="text/javascript">
		var _paq = (window._paq = window._paq || []);
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push(['requireCookieConsent']);
		_paq.push(['trackPageView']);
		_paq.push(['enableLinkTracking']);
		(function () {
			var siteId = process.env.NODE_ENV === 'production' ? 2 : 1;
			var u = '//matomo.love-foundation.org/';
			_paq.push(['setTrackerUrl', u + 'matomo.php']);
			_paq.push(['setSiteId', siteId]);
			var d = document,
				g = d.createElement('script'),
				s = d.getElementsByTagName('script')[0];
			g.type = 'text/javascript';
			g.async = true;
			g.src = u + 'matomo.js';
			s.parentNode.insertBefore(g, s);
		})();
	</script>
	<noscript
		><p>
			<img
				src={`//matomo.love-foundation.org/matomo.php?idsite=${siteId}&amp;rec=1`}
				style="border:0;"
				alt=""
			/>
		</p></noscript
	>
	<!-- End Matomo Code -->
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight={winHeight} />

<Nav {segment} />
<progress value={progress} class={progressClasses} />

<div bind:clientHeight={docHeight}>
	<main class={mainClasses}>
		<slot />
	</main>
	<Footer />
</div>

<CookieBar />

<style lang="scss">
	main {
		position: relative;
		max-width: $max-width;
		background-color: white;
		padding: 0.5em;
		padding-bottom: 0;
		margin: 0 auto;
		box-sizing: border-box;
		margin-top: $desktop-header-height;

		@include desktop {
			padding: 2em;
			padding-bottom: 0;
		}
		&.events {
			padding: unset !important;
		}
	}

	progress {
		top: 0;
		position: fixed;
		width: 100%;
		height: 5px;
		border: none;
		background: transparent;
		z-index: 1000;
		-webkit-appearance: none !important;

		&[value]::-webkit-progress-value {
			background: $black !important;
		}

		&[value]::-webkit-progress-value {
			background: $black !important;
		}

		&::-webkit-progress-bar {
			background-color: none !important;
			background: none !important;
			border: none !important;
			-webkit-appearance: none !important;
		}

		&::-moz-progress-bar {
			background: none !important;
			border: none !important;
		}

		&[value]::-moz-progress-bar {
			background: $black !important;
		}

		&.background {
			background: $medium-grey !important;
			&::-webkit-progress-bar {
				background: $medium-grey !important;
			}
		}
	}
</style>
