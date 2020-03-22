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
<<<<<<< HEAD
  const { session } = stores();

=======
  import {onMount} from "svelte";
  export let events;
>>>>>>> WIP Filter Bar

  let events = $session.events;
  let eventsArray = events;
  let eventGroups = [];
  let len;
  let categories = [];
  let hubs = [];
  let filteredEvents;
  let filtered = false;
  let filter



  onMount(() => {
    eventsArray.map(event => {
    hubs = [...hubs, event.hub];
    if (event.category) {
      categories = [...categories, event.category];
    }

  });

  hubs = [...new Set(hubs)];
  categories = [...new Set(categories)];

  })

for (let i = 0, len = eventsArray.length; i < len; i += 5) {
    eventGroups.push(eventsArray.slice(i, i + 5));
  }
  console.log(eventsArray)

// $:  eventsArray.length = eventsArray.length ? () => {
//     console.log(eventsArray.length)
//    } : console.log("test")

$: if(filteredEvents) {
  eventGroups = new Set();
  for (let i = 0, len = filteredEvents.length; i < len; i += 5) {
    eventGroups = [...eventGroups, filteredEvents.slice(i, i + 5)];
  }
}





  function filterEvents(filter) {
    console.log("Got called dude!")
    console.log(filter)

    filteredEvents = eventsArray.filter(e => e.hub === filter)
    console.log(filteredEvents)
    filtered = true

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
  on:select={(data) => {filterEvents(data.detail.value)}}/>

<div class="tile is-ancestor is-vertical">
  {#each eventGroups as eventGroup, i }
    <GridGroup itemGroup={eventGroup} groupIndex={i} />
  {/each}
</div>
