<script>
  import GridItem from "./GridItem.svelte";
  export let eventGroup = [];
  export let groupIndex = null;
  console.log(groupIndex);
</script>

<style lang="scss">
  .test {
    flex-flow: wrap !important;
  }
</style>

{#if groupIndex % 2 === 0}
  {#if eventGroup.length === 5}
    <GridItem
      id={eventGroup[0].id}
      imageUrl={eventGroup[0].imageUrls.full_url}
      title={eventGroup[0].title}
      hub={eventGroup[0].hub}
      cardClass={'is-parent is-6'} />
    <div class="tile is-parent is-6 is-vertical test">
      {#each eventGroup.slice(1, eventGroup.length) as event, i (event.id)}
        <GridItem
          id={event.id}
          imageUrl={event.imageUrls.full_url}
          title={event.title}
          hub={event.hub}
          cardClass={'is-6 '} />
      {/each}
    </div>
  {:else}
    <GridItem
      id={eventGroup[0].id}
      imageUrl={eventGroup[0].imageUrls.full_url}
      title={eventGroup[0].title}
      hub={eventGroup[0].hub}
      cardClass={'is-parent is-6'} />
    <div class="tile is-parent is-6 is-vertical test">
      {#each eventGroup.slice(1, eventGroup.length) as event, i (event.id)}
        <GridItem
          id={event.id}
          imageUrl={event.imageUrls.full_url}
          title={event.title}
          hub={event.hub}
          cardClass={'is-6 is-alone'} />
      {/each}
    </div>
  {/if}
{:else}
  {#if eventGroup.length === 5}
    <div class="tile is-parent is-6 is-vertical test">
      {#each eventGroup.slice(0, eventGroup.length - 1) as event, i (event.id)}
        <GridItem
          id={event.id}
          imageUrl={event.imageUrls.full_url}
          title={event.title}
          hub={event.hub}
          cardClass={'is-6'} />
      {/each}
    </div>
    <GridItem
      id={eventGroup[4].id}
      imageUrl={eventGroup[4].imageUrls.full_url}
      title={eventGroup[4].title}
      hub={eventGroup[4].hub}
      cardClass={'is-parent is-6'} />
  {:else}
    <div class="tile is-parent is-6 is-vertical test">
      {#each eventGroup.slice(0, eventGroup.length) as event, i (event.id)}
        <GridItem
          id={event.id}
          imageUrl={event.imageUrls.full_url}
          title={event.title}
          hub={event.hub}
          cardClass={'is-6'} />
      {/each}
    </div>
  {/if}
{/if}
