<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`lovecasts.json`)
      .then(r => r.json())
      .then(lovecasts => {
        return { lovecasts };
      });
  }
</script>

<script>
  import GridGroup from "../../components/UI/Grid/GridGroup.svelte";

  export let lovecasts;

  let lovecastsArray = lovecasts;
  let lovecastGroups = [];
	let len;


	for  (let i = 0, len = lovecasts.length; i < len; i += 5) {
    lovecastGroups.push(lovecasts.slice(i, i + 5));
}
</script>

<style lang="scss">
  .tile {
    flex-flow: wrap !important;
  }
</style>

<svelte:head>
  <title>Lovecasts</title>
</svelte:head>

<div class="tile is-ancestor is-vertical">
  {#each lovecastGroups as lovecastGroup, i}
    <GridGroup itemGroup={lovecastGroup} groupIndex={i} />
  {/each}
</div>
