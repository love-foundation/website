<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`events.json`)
      .then(r => r.json())
      .then(events => {
        return { events };
      });
  }
</script>

<script>
  import GridItem from "../../components/UI/Grid/GridItem.svelte";
  export let events;
</script>

<style lang="scss">

</style>

<svelte:head>
  <title>Events</title>
</svelte:head>

<div class="columns is-multiline">
  {#each events as event, i (event.id)}
    <GridItem
      id={event.id}
      imageUrl={event.imageUrls.full_url}
      title={event.title}
      hub={event.hub}
      index={i} />
  {/each}
</div>
