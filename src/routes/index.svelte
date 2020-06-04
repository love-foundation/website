<script>
  import UpcomingEvents from "../components/UI/FrontPage/UpcomingEvents.svelte";
  import Button from "../components/UI/Button.svelte";
  import { stores } from "@sapper/app";

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
  .graphic {
    width: 90%;
    margin: 0px auto;
    display: inline-block;
  }
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

  // Hub Boxes

  .hub-box {
    text-align: center;
    margin: 5%;
    padding: 5%;
    color: #0597f2;
  }
  .hub-box:hover {
    background-color: aliceblue;
  }
  .hub-name {
    text-decoration: none;
    font-size: 150%;
    color: #575757;
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
    <Button link={'/join'}>Join the Family</Button>
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
    <div class="column is-4">
      <div class="hub-box">
        <h3>Amsterdam</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Berlin</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Brussels</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Cape Town</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Dresden</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Magdeburg</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Maastricht</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Munich</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
    <div class="column is-4">
      <div class="hub-box">
        <h3>Tel Aviv</h3>
        <a href="#" class="hub-name">Facebook</a>
        <br />
        <a href="#" class="hub-name">Instagram</a>
      </div>
    </div>
  </div>
</section>
<!-- Fix Me: Should be UI component, with properties for link and text -->
<section class="cta pad--bottom--small centered">
  <Button link={'/join'}>Join the Family</Button>
</section>
