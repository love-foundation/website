<script>
  import GridItem from "./GridItem.svelte";
  export let itemGroup = [];
  export let lazy = false;
  export let groupIndex = null;
  let isEven = groupIndex % 2 == 0;

  $: {
    if (!isEven) {
      let lastItem = itemGroup.pop();
      itemGroup = [lastItem, ...itemGroup];
    }
  }
</script>

<style lang="scss">
  .wrap {
    flex-flow: wrap !important;
  }

  .tile { 
    padding: 0px !important;
    margin-bottom: 0px !important;
  }

</style>

{#if isEven}
  <GridItem
    item={itemGroup[0]}
    {lazy}
    cardClass={'is-parent is-6 parent-single'}
    (itemGroup[0].id) />
{/if}

<div class="tile is-parent is-6 is-vertical wrap">
  {#each itemGroup.slice(1, itemGroup.length) as item, i (item.id)}
    {#if itemGroup.length === 5}
      <GridItem {lazy} {item} cardClass={'is-6 parent-wrap'} />
    {:else}
      <GridItem {lazy} {item} cardClass={'is-6 is-alone parent-wrap'} />
    {/if}
  {/each}
</div>

{#if !isEven}
  <GridItem
    {lazy}
    item={itemGroup[0]}
    cardClass={'is-parent is-6 parent-single'}
    (itemGroup[0].id) />
{/if}
