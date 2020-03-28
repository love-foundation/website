<script context="module">
  // export function preload({ params, query }) {
  //   return this.fetch(`events.json`)
  //     .then(r => r.json())
  //     .then(events => {
  //       return { events };
  //     });
  // }

  export function preload(_, session) {
    const events = session.events;

    return { events };
  }
</script>

<script>
  import GridGroup from "../../components/UI/Grid/GridGroup.svelte";
  import { stores } from "@sapper/app";
  import FilterBar from "../../components/UI/FilterBar.svelte";
  const { session } = stores();
  import { onMount } from "svelte";

  let events = $session.events;
  let eventsArray = events;
  let eventGroups = [];
  let len;
  let categories = [];
  let hubs = [];
  let filteredEvents;
  let currentFilters = {};

  onMount(() => {
    eventsArray.map(event => {
      hubs = [...hubs, event.hub];
      if (event.category) {
        categories = [...categories, event.category];
      }
    });

    hubs = [...new Set(hubs)];
    categories = [...new Set(categories)];
  });

  $: {
    eventGroups = [];
    for (let i = 0, len = filteredEvents.length; i < len; i += 5) {
      eventGroups = [...eventGroups, filteredEvents.slice(i, i + 5)];
    }
  };

  $: filteredEvents =
    eventsArray.filter(e => {
      const filterHub = !!currentFilters.hub;
      const filterCategory = !!currentFilters.category;

      if (filterHub && filterCategory) {
        return (
          e.hub == currentFilters.hub && e.category == currentFilters.category
        );
      } else if (filterCategory) {
        return e.category == currentFilters.category;
      } else if (filterHub) {
        return e.hub == currentFilters.hub;
      } else {
        return true;
      }
    });

  function filterEvents(filter) {
    if (filter.hub) {
      currentFilters.hub = filter.hub;
    } else {
      currentFilters.category = filter.category;
    }

    console.log("filters updated", currentFilters);
  }

  function reset(filter) {
    if (filter == "one") {
      delete currentFilters.hub
    } else {
      delete currentFilters.category
    }
    filterEvents(currentFilters);
  }

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
  placeholderTwo={'Genre'}
  on:selectedOne={data => {
    filterEvents(data.detail);
  }}
  on:selectedTwo={data => {
    filterEvents(data.detail);
  }}
  on:clear={data => {
    reset(data.detail);
  }} />

<button on:click={filterEvents}>Filtered</button>
<div class="tile is-ancestor is-vertical">
  {#each eventGroups as eventGroup, i (Math.random())}
    <GridGroup itemGroup={eventGroup} groupIndex={i} />
  {/each}
</div>
