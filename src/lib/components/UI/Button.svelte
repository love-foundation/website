<script>
	export let link = '';
	export let newTab = false;

	let target = newTab ? '_blank' : '_self';
</script>

<div class="btn--wrap">
	<a sveltekit:prefetch {target} class="btn" href={link}>
		<slot />
	</a>
</div>

<style lang="scss">
	.btn {
		background-color: $blue;
		color: #fff;
		font-weight: 300;
		display: inline-block;
		padding: 10px 30px;
		margin: 0 auto;
		border-radius: 200px;
		text-decoration: none;
		font-size: 150%;
		&:hover {
			background-color: $hover-blue;
		}
		&--wrap {
			text-align: center;
			width: 100%;
		}
	}
</style>
