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
  import lozad from "lozad";
  import { onMount } from "svelte";

  export let lovecasts;

  let lovecastsArray = lovecasts;
  let lovecastGroups = [];
  let len;

  for (let i = 0, len = lovecasts.length; i < len; i += 5) {
    lovecastGroups.push(lovecasts.slice(i, i + 5));
  }

  onMount(() => {
    const observer = lozad();
    observer.observe();
  });
</script>

<style lang="scss">
  section {
    opacity: 0;
    transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
      opacity 1s ease-in;
    &.loaded {
      opacity: 1;
      margin-top: 0;
    }
  }
</style>

<svelte:head>
  <title>Lovecasts</title>
</svelte:head>

{#each lovecastGroups as lovecastGroup, i (Math.random())}
  <section
    data-toggle-class="loaded"
    class:loaded={i < 1}
    class:lozad={i >= 1}>
    <GridGroup itemGroup={lovecastGroup} groupIndex={i} lazy={i >= 1} />
  </section>
{/each}
