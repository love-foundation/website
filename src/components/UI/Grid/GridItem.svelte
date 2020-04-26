<script>
  import { fade } from "svelte/transition";

  export let item = null;
  export let lazy = false;
  export let cardClass = "";

  let {
    id,
    slug,
    title,
    subtitle = item.hub ? item.hub : null,
    soundcloud,
    imageUrl
  } = item;

  let link = soundcloud ? soundcloud : `/events/${slug}`;
  // let imageRatio = soundcloud ? "is-square" : "is-3by4";
  let imageRatio = "is-square";
</script>

<style lang="scss">

  .parent-single {    
    .card {
      width: 50vw;
      height: 50vw;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }
  }

  .parent-wrap {
    .card {
      width: 25vw;
      height: 25vw;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
    }
  }

  .tile { 
    padding: 0px !important;
    box-shadow: none !important;
  }

  .card-header {
    flex-wrap: wrap;
    box-shadow: none;
    text-align: center;
  }

  .image {
    img {
      object-fit: contain;
    }

    &.is-square {
      padding-top: 64%;
      margin-top: 10% !important;
    }

    &.lazy {
      opacity: 0;
      transition: opacity 0.2s;
      &.loaded {
        opacity: 1;
      }
    }
  }
</style>

<a transition:fade rel="prefetch" href={link} class="link tile {cardClass}">
  <div class="tile is-child card">
    <div class="card-image">
      <figure
        data-toggle-class="loaded"
        class:lazy
        class:lozad={lazy}
        class="image {imageRatio}">
        {#if lazy}
          <img class="lozad" data-src={imageUrl} alt="{title} Poster" />
        {:else}
          <img src={imageUrl} alt="{title} Poster" />
        {/if}
      </figure>
    </div>
    <div class="card-header">
      <h3 class="title card-header-title is-centered">{title}</h3>
      {#if subtitle}
        <h3 class="subtitle card-header-title is-centered">{subtitle}</h3>
      {/if}
    </div>
  </div>
</a>
