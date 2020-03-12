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

  const { session } = stores();

  let events = $session.events;
  let eventsArray = events;
  let eventGroups = [];
	let len;

	for  (let i = 0, len = events.length; i < len; i += 5) {
    eventGroups.push(events.slice(i, i + 5));
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

<div class="tile is-ancestor is-vertical">
  {#each eventGroups as eventGroup, i}
    <GridGroup itemGroup={eventGroup} groupIndex={i} />
  {/each}
</div>
