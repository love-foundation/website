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
      return Object.entries(currentFilters)
        .every(([filterName, value]) => e[filterName] == value || value == undefined)
    });

  function filterEvents(filter) {
    if (filter.hub) {
      currentFilters.hub = filter.hub;
    } else {
      currentFilters.category = filter.category;
    }

    console.debug("filters updated", currentFilters);
  }

  function reset(filter) {
    delete currentFilters[filter];

    // force an update
    currentFilters = { ... currentFilters };
  }

  let filters = {};
  $: filters = {
    hub: {
      placeholder: 'Location',
      options: hubs
    },
    category: {
      placeholder: 'Genre',
      options: categories
    }
  };
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
  filters={filters}
  on:selected={data => {
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
