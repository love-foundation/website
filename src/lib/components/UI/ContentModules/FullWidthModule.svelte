<script lang="ts">
	export let image: Pick<HTMLImageElement, 'src' | 'alt'>;

	let { src, alt } = { ...image };
</script>

<section class="fullbleedimage">
	<img {src} {alt} />
</section>

<style lang="scss">
	.fullbleedimage {
		width: 100vw;
		margin-left: calc(-50vw + 50%);
		text-align: center;
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;

		img {
			width: 100%;
		}
	}
</style>
