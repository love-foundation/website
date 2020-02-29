<script>
  import Nav from "../components/UI/Nav.svelte";

  export let segment;

  let docHeight = 0;
  let winHeight = 0;
  let y = 0;
  let showProgress = true;
  let progress = 0;

  $: if (docHeight > winHeight) {
    progress = y / (docHeight - winHeight);
  }

  // $: if (headerClass === "hide") {
  //   showProgress = true;
  // } else {
  //   showProgress = false;
  // }
</script>

<style lang="scss">
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: $desktop-header-height;
  }

  progress {
		top: 0;
    position: fixed;
    width: 100%;
		height: 5px;
		border: none;
		background: transparent;
		z-index: 1000;

		&[value]::-webkit-progress-value {
			background: $blue;
		}

		&[value]::-moz-progress-bar {
			background: $blue;
		}
  }

  .test {
    height: 1000px;
  }
</style>

<svelte:window bind:scrollY={y} bind:innerHeight={winHeight} />

{#if showProgress}
  <progress value={progress} />
{/if}

<Nav {segment} />

<main bind:offsetHeight={docHeight}>
  <slot />
  <div class="test" />
</main>
