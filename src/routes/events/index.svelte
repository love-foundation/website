<script context="module">
  export function preload(session) {
    const pageFilters = session.query;

    return { pageFilters };
  }
</script>

<script>
  import GridGroup from "../../components/UI/Grid/GridGroup.svelte";
  import { stores } from "@sapper/app";
  import FilterBar from "../../components/UI/FilterBar.svelte";
  const { session } = stores();
  import { onMount, beforeUpdate } from "svelte";

  export let pageFilters;

  let events = $session.events;
  let eventsArray = events;
  let eventGroups = [];
  let len;
  let categories = [];
  let hubs = [];
  let filteredEvents;
  let currentFilters = { ...pageFilters };
  let reverse = false;

  $: eventsArray = reverse
    ? eventsArray.reverse()
    : eventsArray

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

  beforeUpdate(() => {
    let params = { ...currentFilters };
    let url = new URL(window.location.href);

    if (params.hub) {
      url.searchParams.set("hub", params.hub);
    } else if (url.searchParams.has("hub")) {
      url.searchParams.delete("hub");
    }

    if (params.category) {
      url.searchParams.set("category", params.category);
    } else if (url.searchParams.has("category")) {
      url.searchParams.delete("category");
    }
    window.history.pushState({}, null, url);
  });

  $: filteredEvents = eventsArray.filter(e => {
    return Object.entries(currentFilters).every(
      ([filterName, value]) => e[filterName] == value || value == undefined
    );
  });

  $: {
    eventGroups = [];
    for (let i = 0, len = filteredEvents.length; i < len; i += 5) {
      eventGroups = [...eventGroups, filteredEvents.slice(i, i + 5)];
    }
  }

  function filterEvents(filter) {
    if (filter.hub) {
      currentFilters.hub = filter.hub;
    } else {
      currentFilters.category = filter.category;
    }
  }

  function reset(filter) {
    delete currentFilters[filter];

    // force an update
    currentFilters = { ...currentFilters };
  }

  let filters = {};
  $: filters = {
    hub: {
      placeholder: "Location",
      options: hubs,
      value: pageFilters.hub
    },
    category: {
      placeholder: "Genre",
      options: categories,
      value: pageFilters.category
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
  {filters}
  on:selected={data => {
    filterEvents(data.detail);
  }}
  on:clear={data => {
    reset(data.detail);
  }}
  on:sort={() => {
    reverse = !reverse;
  }} />

<div class="tile is-ancestor is-vertical">
  {#each eventGroups as eventGroup, i (Math.random())}
    <GridGroup itemGroup={eventGroup} groupIndex={i} />
  {/each}
</div>
