<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/events/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { event: data[0] };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import HeroModule from "../../components/UI/ContentModules/HeroModule.svelte";
  import ArtistItem from "../../components/UI/ArtistItem.svelte";

  export let event;

  let heroContent = {};

  heroContent.image = event.imageUrls.full_url;
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

  h2 {
    text-align: center
  }
</style>

<svelte:head>
  <title>{event.name}</title>
</svelte:head>

<HeroModule content={heroContent} />
<div class="head">
  <h1>{event.name}</h1>
</div>
<div class="info">
  <div class="columns is-vertical is-multiline is-centered">
    <div class="column is-4">
      <h2>Hub: {event.hub}</h2>
    </div>
    <div class="column is-4">
      <h2>Location: {event.location}</h2>
    </div>
    <div class="column is-4">
      <h2>Genre: {event.category}</h2>
    </div>
    <div class="column is-4">
      <h2>Date: {event.starttime}</h2>
    </div>
    <div class="column is-4">
      <h2>Time: {event.endtime}</h2>
    </div>
    <div class="column is-4">

    </div>
  </div>
</div>
<h2>Artists that supported this event</h2>
<div class="columns is-multiline">
  {#each event.artists as artist}
    <ArtistItem {artist} />
  {/each}
</div>
