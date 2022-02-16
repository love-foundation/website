<script>
	import Button from '$lib/components/UI/Button.svelte';
</script>

<svelte:head>
	<title>Love Foundation - Join the Family</title>
</svelte:head>

<h1 class="pad--bottom--small centered">Join the Family</h1>

<h2 class="centered">Download membership application for Love Foundation e.V. now</h2>
<Button newTab={true} link={'/Mitgliedsantrag_LF-eV.pdf'}>Download</Button>

<section class="columns pad--bottom--small">
	<div class="column is-4">
		<div class="bubble">
			<figure class="image">
				<object data="/join_family.svg" type="image/svg+xml" title="Map" />
			</figure>
		</div>
		<Button newTab={false} link={'/join/internships'}>Work with us</Button>
	</div>
	<div class="column is-4">
		<div class="bubble">
			<figure class="image">
				<object data="/join_events.svg" type="image/svg+xml" title="Map" />
			</figure>
		</div>
		<Button newTab={true} link={'events'}>Join our events</Button>
	</div>
	<div class="column is-4">
		<div class="bubble">
			<figure class="image">
				<object data="/join_financial.svg" type="image/svg+xml" title="Map" />
			</figure>
		</div>
		<Button link={'support'}>Support us financially</Button>
	</div>
</section>
<section class="pad--bottom--small">
	<Button newTab={true} link={'mailto:hello@love-foundation.org'}>Join us</Button>
</section>

<style lang="scss">
	.bubble {
		border-radius: 50%;
		border: 10px solid #555555;
		margin: 5%;
		.image {
			object {
				width: 100%;
				padding: 10%;
			}
		}
	}
</style>
