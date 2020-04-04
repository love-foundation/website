<script>
  import GridItem from "./GridItem.svelte";
  export let itemGroup = [];
  export let groupIndex = null;
  let isEven = groupIndex % 2 == 0;

  $: {
    if (!isEven) {
      let test = itemGroup.pop();
      itemGroup = [test, ...itemGroup];
    }
  }
</script>

<style lang="scss">
  .wrap {
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
  <GridItem
    item={itemGroup[0]}
    cardClass={'is-parent is-6'}
    (itemGroup[0].id) />
{/if}

<div class="tile is-parent is-6 is-vertical wrap">
  {#each itemGroup.slice(1, itemGroup.length) as item, i (item.id)}
    {#if itemGroup.length === 5}
      <GridItem {item} cardClass={'is-6'} />
    {:else}
      <GridItem {item} cardClass={'is-6 is-alone'} />
    {/if}
  {/each}
</div>

{#if !isEven}
  <GridItem
    item={itemGroup[0]}
    cardClass={'is-parent is-6'}
    (itemGroup[0].id) />
{/if}
