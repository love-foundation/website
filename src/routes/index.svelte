<script>
  import UpcomingEvents from "../components/UI/FrontPage/UpcomingEvents.svelte";
  import { stores } from "@sapper/app";

  export let queriedContent;

  const { session } = stores();

  let upcomingEvents = $session.events.filter(
    event => new Date(event.starttime) >= new Date()
  );
</script>

<style lang="scss">
  .centered {
    text-align: center;
  }
</style>

<svelte:head>
  <title>Home</title>
</svelte:head>
<section class="pad--bottom--small">
  <div class="columns is-centered">
    <div class="column">
      <figure class="image">
        <object data="whatislove.svg" type="image/svg+xml" title="Map" />
      </figure>
    </div>
  </div>
</section>
<section class="pad--bottom--small">
  <div class="columns is-centered">
    <div class="column is-8">
      <h2 class="centered">
        Love Foundation is an open network of artists and activists. Together we
        organise projects to spread love, connect people and fundraise money for
        water development projects in Kenya with our partners Viva con Agua and
        Simavi.
      </h2>
    </div>
  </div>
</section>

{#if upcomingEvents.length}
  <section class="pad--bottom--small">
    <h2 class="centered">Upcoming Events</h2>
    <UpcomingEvents {upcomingEvents} />
  </section>
{/if}

<section>
<h2 class="centered">Where is Love Foundation</h2>
  <figure class="image">
    <object data="map.svg" type="image/svg+xml" title="Map" />
  </figure>
</section>
