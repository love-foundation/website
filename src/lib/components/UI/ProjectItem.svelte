<script>
	import PillarBlob from './PillarBlob.svelte';

	export let project;

	let { name, imageUrl, pillar, country, slug } = project;
</script>

<a data-sveltekit-preload-data href="/projects/{slug}">
	<div class="project--card">
		<img src={imageUrl} alt="{name} Image" />
		<div class="project--information">
			<PillarBlob {pillar} />
			<div>
				<h3 data-cy="projectTitle">{name}</h3>
				<h3>{country}</h3>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	a {
		width: 100%;
		position: relative;
	}
	.project--card {
		position: relative;

		img {
			width: 100%;
		}
		.project--information {
			display: flex;
		}
	}
</style>
