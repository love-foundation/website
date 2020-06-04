<script>
  import Button from "../components/UI/Button.svelte";
</script>

<svelte:head>
  <title>Love Foundation - Join the Family</title>
</svelte:head>

<h1 class="pad--bottom--small">Join the Family</h1>

<div class="columns">
  <div class="column is-4">
    <h1>Hubs</h1>
    <Button newTab={true} link={'mailto:hello@love-foundation.org'}>
      Join our hubs
    </Button>
  </div>
  <div class="column is-4">
    <h1>Events</h1>
    <Button newTab={true} link={'events'}>Join our events</Button>
  </div>
  <div class="column is-4">
    <h1>Financial</h1>
    <Button newTab={true} link={'mailto:hello@love-foundation.org'}>
      Support us financially
    </Button>
  </div>
</div>
<Button newTab={true} link={'https://www.google.com'}>Hello World</Button>
