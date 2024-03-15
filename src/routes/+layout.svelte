<script lang="ts">
	import Nav from '$lib/components/UI/Nav.svelte';
	import Footer from '$lib/components/UI/Footer.svelte';
	import { page } from '$app/stores';
	import '@beyonk/gdpr-cookie-consent-banner/dist/style.css'; // optional, you can also define your own styles
	import attachBanner from '@beyonk/gdpr-cookie-consent-banner';
	import '../app.scss';

	const choices = {
		necessary: {
			label: 'Necessary cookies',
			description: 'Used for cookie control and usage of the donation form',
			value: true
		},
	};

	let winHeight = 0;
	let y = 0;
	let progress = 0;
	let docHeight = 0;
	let mainClasses = '';
	let progressClasses = '';
	let bodyElement: HTMLBodyElement;

	mainClasses = $page.url.pathname === '/events' ? 'events' : '';

	$: progressClasses =
		$page.url.pathname === '/events' || $page.url.pathname === '/artists' ? 'background' : '';

	$: if (docHeight > winHeight) {
		progress = y / (docHeight - winHeight);
	}

	let siteId = import.meta.env.NODE_ENV === 'production' ? 2 : 1;
	const scriptInjectString = `<script>
		var _paq = (window._paq = window._paq || []);
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
		_paq.push(['setDomains', ['*.www.love-foundation.org', '*.love-foundation.org']]);
		_paq.push(['trackPageView']);
		_paq.push(['enableLinkTracking']);
		(function () {
			var u = '//matomo.love-foundation.org/';
			_paq.push(['setTrackerUrl', u + 'matomo.php']);
			_paq.push(['setSiteId', ${siteId}]);
			var d = document,
				g = d.createElement('script'),
				s = d.getElementsByTagName('script')[0];
			g.async = true;
			g.src = u + 'matomo.js';
			s.parentNode.insertBefore(g, s);
		})();`;

	const noscriptInjectString = `<noscript
	><p>
		<img
			src="//matomo.love-foundation.org/matomo.php?idsite=${siteId}&amp;rec=1"
			style="border:0;"
			alt=""
		/>
	</p></noscript
>`;
	$: {
		bodyElement
			? attachBanner(bodyElement, {
					heading: 'We want to inform you about our usage of cookies',
					cookieName: 'love_foundation_cookieconsent',
					description:
						'We only use cookies as part of our donation form that is implemented with a third party supplier that sets cookies. We currently do not set any cookies ourselves.',
					choices,

			  })
			: undefined;
	}

  window.addEventListener("consent:necessary", () => {

  });
</script>

<svelte:head>
	<!-- Matomo -->
	{@html scriptInjectString + '</script>'}
	{@html noscriptInjectString}
	<!-- End Matomo Code -->
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight={winHeight} />
<svelte:body bind:this={bodyElement} />

<Nav />
<progress value={progress} class={progressClasses} />

<div bind:clientHeight={docHeight}>
	<main class={mainClasses}>
		<slot />
	</main>
	<Footer />
</div>

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
