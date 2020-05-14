<script>
  import GridItem from "../Grid/GridItem.svelte";

  export let upcomingEvents;
</script>

<style lang="scss">
 .wrap {
    flex-flow: wrap;
  }
</style>

<div class="tile is-ancestor is-parent wrap">
  {#each upcomingEvents as upcomingEvent}
    <GridItem
      item={upcomingEvent}
      showDate={true}
      cardClass={'push--bottom--small is-4'} />
  {/each}
</div>
