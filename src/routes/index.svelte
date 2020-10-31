<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`hubs.json`)
      .then(r => r.json())
      .then(hubs => {
        return { hubs };
      })
      .then(this.fetch('sitemap.xml'));
  }
</script>

<script>
  import UpcomingEvents from "../components/UI/FrontPage/UpcomingEvents.svelte";
  import Button from "../components/UI/Button.svelte";
  import Hub from "../components/UI/Hub.svelte";
  import { stores } from "@sapper/app";

  export let hubs;

  const { session } = stores();

  let upcomingEvents = $session.events.filter(
    event => new Date(event.starttime) >= new Date()
  );
</script>

<style lang="scss">
  .centered {
    text-align: center;
  }
  object {
    width: 100%;
  }

  /* ########################## */
  /* #### Style Settings ##### */
  /* ########################## */
  .row {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px;
  }
  /* ########################## */
  /* #### Reusable Elements ##### */
  /* ########################## */

  h1,
  h2 {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 20px;
  }

  .main-text {
    padding: 20px;
    line-height: 145%;
    text-align: center;
    font-size: 20px !important; // FIX ME: This should come from global font values. Discussion on font/text variations should be happening
    font-size: 2rem !important;
    @include desktop {
      font-size: 30px !important; // FIX ME: This should come from global font values. Discussion on font/text variations should be happening
      font-size: 3rem !important;
    }
  }

  #opener {
    min-height: 100vh;
    text-align: center;
  }
</style>

<svelte:head>
  <title>Love Foundation - Home</title>
</svelte:head>
<section id="opener" class="pad--bottom--small">
  <h1>What is Love Foundation?</h1>
  <div class="row">
    <figure class="image">
      <object data="whatislove.svg" type="image/svg+xml" title="Map" />
    </figure>
    <h2>
      Love Foundation is a community of activists and artists spreading love,
      connecting people and raising money for water development projects through
      cultural events.
    </h2>
    <Button link={'join'}>Join the Family</Button>
  </div>
</section>

{#if upcomingEvents.length}
  <section class="pad--bottom--small">
    <h1 class="centered">Upcoming Events</h1>
    <UpcomingEvents {upcomingEvents} />
  </section>
{/if}

<section class="love-locations pad--bottom--small">
  <div class="row">

    <h1>Where is the Love?</h1>

    <figure class="image">
      <object data="map.svg" type="image/svg+xml" title="Map" />
    </figure>

    <p class="main-text">
      Love Foundation was founded in 2013 by two students from Maastricht
      University and a designer in the Netherlands.
      <br />
      We have organised events in the Netherlands, the US, Australia, Brazil,
      Israel, Spain, Germany, the UK, Italy, Portugal, Israel, South Africa and
      France.
    </p>
  </div>
</section>

<section class="active-hubs row">
  <h1>Active Love Hubs</h1>
  <div class="columns is-multiline">
    {#each hubs as hub}
      <Hub {hub} />
    {/each}
  </div>
</section>
<!-- Fix Me: Should be UI component, with properties for link and text -->
<section class="cta pad--bottom--small centered">
  <Button link={'join'}>Join the Family</Button>
</section>
