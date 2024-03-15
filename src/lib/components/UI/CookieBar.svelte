<script lang="ts">
	import GdprBanner from "@beyonk/gdpr-cookie-consent-banner";
  import "@beyonk/gdpr-cookie-consent-banner/banner.css"; // optional, you can also define your own styles

	const choices = {
		necessary: {
			label: 'Necessary cookies',
			description: 'Used for cookie control and usage of the donation form',
			value: true
		},
		tracking: false,
		analytics: false,
		marketing: false
	};
</script>

<GdprBanner
	heading="We want to inform you about our usage of cookies"
	cookieName="love_foundation_cookieconsent"
	description="We only use cookies as part of our donation form that is implemented with a third party supplier that sets cookies. We currently do not set any cookies ourselves."
	{choices}
/>
