<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`index.json`)
      .then(r => r.json())
      .then(queriedContent => {
        return { queriedContent };
      });
  }
</script>

<script>
  import Content from "../components/UI/Content.svelte";
  import UpcomingEvents from "../components/UI/FrontPage/UpcomingEvents.svelte"
  import { stores } from "@sapper/app";

  export let queriedContent;

  const { session } = stores();

  let upcomingEvents = $session.events.filter(
    event => new Date(event.starttime) >= new Date()
  );
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<Content {queriedContent} />

{#if upcomingEvents.length}
  <UpcomingEvents upcomingEvents />
{/if}
