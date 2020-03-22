<script context="module">
  // export function preload({ params, query }) {
  //   return this.fetch(`events.json`)
  //     .then(r => r.json())
  //     .then(events => {
  //       return { events };
  //     });
  // }

  export function preload(_, session) {
    const events = session.events

    return {events}
  }
</script>

<script>
  import GridGroup from "../../components/UI/Grid/GridGroup.svelte";
  import { stores } from "@sapper/app";
  import FilterBar from "../../components/UI/FilterBar.svelte";
  const { session } = stores();


  let events = $session.events;
  let eventsArray = events;
  let eventGroups = [];
  let len;
  let categories = [];
  let hubs = [];

  eventsArray.map(event => {
    hubs = [...hubs, event.hub];
    if (event.category) {
      categories = [...categories, event.category];
    }

  });

  hubs = [...new Set(hubs)];
  categories = [...new Set(categories)];
  for (let i = 0, len = eventsArray.length; i < len; i += 5) {
    eventGroups.push(eventsArray.slice(i, i + 5));
  }

  // function filterEvents(filter) {

  // }
</script>

<style lang="scss">
  .tile {
    flex-flow: wrap !important;
  }
</style>

<svelte:head>
  <title>Events</title>
</svelte:head>

<FilterBar
  title={'Events'}
  filterOne={hubs}
  filterTwo={categories}
  placeholderOne={'Location'}
  placeholderTwo={'Genre'} />

<div class="tile is-ancestor is-vertical">
  {#each eventGroups as eventGroup, i}
    <GridGroup itemGroup={eventGroup} groupIndex={i} />
  {/each}
</div>
