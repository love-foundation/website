<script>
  import GridItem from "./GridItem.svelte";
  export let eventGroup = [];
  export let groupIndex = null;
  let isEven = groupIndex % 2 == 0;
</script>

<style lang="scss">
  .test {
    flex-flow: wrap !important;
  }
  // grid-template:
  //   "a b b" 40px
  //   "a b b" 40px / 1fr 1fr 1fr;

  // grid-template: :nth-child(n+1)
  //   "b b a" 40px
  //   "b b a" 40px / 1fr 1fr 1fr;


</style>

{#if isEven}
  <GridItem event={eventGroup[0]} cardClass={'is-parent is-6'} />
{/if}

<div class="tile is-parent is-6 is-vertical test">
  {#each eventGroup.slice(1, eventGroup.length) as event, i (event.id)}
    {#if eventGroup.length === 5}
      <GridItem {event} cardClass={'is-6'} />
    {:else}
      <GridItem {event} cardClass={'is-6 is-alone'} />
    {/if}
  {/each}
</div>

{#if !isEven}
  <GridItem event={eventGroup[0]} cardClass={'is-parent is-6'} />
{/if}
