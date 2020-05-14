<script>
  import UpcomingEvents from "../components/UI/FrontPage/UpcomingEvents.svelte";
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

<style lang="scss">
  .centered {
    text-align: center;
  }
</style>

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
  <UpcomingEvents {upcomingEvents} />
{/if}
