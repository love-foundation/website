<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/artists/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { artist: data[0] };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import HeroModule from "../../components/UI/ContentModules/HeroModule.svelte";
  import GridItem from "../../components/UI/Grid/GridItem.svelte";

  export let artist;

  let {
    name,
    image,
    location,
    category,
    status,
    soundcloud,
    facebook,
    events,
    heroColor
  } = artist;

  let heroContent = {};

  heroContent.image = image;
  heroContent.bgColor = heroColor;
</script>

<style lang="scss">
  .info {
    background: $light-grey;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    .columns {
      max-width: $content-width;
      margin: 0 auto;
      padding: 2em;
    }
  }

  .head {
    background: $light-grey;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    display: flex;
    height: 100px;
    border-bottom: 0.5px solid $dark-grey;
    justify-content: center;
    align-items: center;
    position: relative;
  }
</style>

<svelte:head>
  <title>Artists &mdash; {name}</title>
</svelte:head>

<HeroModule content={heroContent} />
<div class="head">
  <h1>{name}</h1>
</div>
<div class="info">
  <div class="columns is-centered">
    {#if location}
      <div class="column">
        <h2>Hub:</h2>
        <h2>{location}</h2>
      </div>
    {/if}

    {#if status}
      <div class="column">
        <h2>Status:</h2>
        <h2 class="capitalized">{status}</h2>
      </div>
    {/if}

    {#if category}
      <div class="column">
        <h2>Genre:</h2>
        <h2 class="capitalized">{category}</h2>
      </div>
    {/if}

    {#if facebook || soundcloud}
      <div class="column">
        <h2>Links:</h2>
        {#if facebook}
          <a href={facebook}>
            <h2>Facebook</h2>
          </a>
        {/if}
        {#if soundcloud}
          <a href={soundcloud}>
            <h2>Soundcloud</h2>
          </a>
        {/if}

      </div>
    {/if}
  </div>
</div>

{#if events.length}
  <h2 class="pad--bottom--small pad--top--small centered">
    Events that this artist supported
  </h2>
  <div class="columns is-multiline">
    {#each events as event}
      <GridItem item={event} cardClass={'push--bottom--small column is-4'} />
    {/each}
  </div>
{/if}
