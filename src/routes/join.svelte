<script>
  import Button from "../components/UI/Button.svelte";
</script>

<style lang="scss">
  .bubble {
    border-radius: 50%;
    border: 10px solid $black;
    margin: 5%;
    position: relative;

    .image {
      object {
        width: 100%;
        padding: 20%;
      }
    }

    h2 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 10%;
    }
  }
</style>

<svelte:head>
  <title>Love Foundation - Join the Family</title>
</svelte:head>

<h1 class="pad--bottom--small centered">Join the Family</h1>

<div class="columns">
  <div class="column is-4">
    <div class="bubble">
      <figure class="image">
        <object data="join_family.svg" type="image/svg+xml" title="Map" />
      </figure>
      <h2>Join a hub</h2>
    </div>
    <Button newTab={true} link={'mailto:hello@love-foundation.org'}>
      Join our hubs
    </Button>
  </div>
  <div class="column is-4">
    <div class="bubble">
      <figure class="image">
        <object data="join_events.svg" type="image/svg+xml" title="Map" />
      </figure>
      <h2>Join an event</h2>
    </div>
    <Button newTab={true} link={'events'}>Join our events</Button>
  </div>
  <div class="column is-4">
    <div class="bubble">
      <figure class="image">
        <object data="join_financial.svg" type="image/svg+xml" title="Map" />
      </figure>
      <h2>Financial Hug</h2>
    </div>
    <Button newTab={true} link={'mailto:hello@love-foundation.org'}>
      Support us financially
    </Button>
  </div>
</div>
