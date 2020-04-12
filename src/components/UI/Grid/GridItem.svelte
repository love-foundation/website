<script>
  import { fade } from 'svelte/transition';

  export let item = null;
  export let cardClass = "";

  let imageUrl;
  let { id, title, subtitle = item.hub ? item.hub : null, soundcloud } = item;

  if (item.imageUrls) {
    imageUrl = item.imageUrls.thumbnails[7].url;
  } else {
    imageUrl = item.imageUrl;
  }

  let link = soundcloud ? soundcloud : `/events/${id}`;
  let imageRatio = soundcloud ? "is-square" : "is-3by4";

</script>

<style lang="scss">
  .tile {
    &.is-child {
      padding: 10%;
    }
    &.is-alone {
      height: max-content;
    }
  }
  .card-header {
    flex-wrap: wrap;
    box-shadow: none;
    text-align: center;
  }
  h3 {
    width: 100%;
    &.subtitle {
      text-transform: capitalize;
    }
  }

  .image img {
    object-fit: contain;
  }
</style>

<a transition:fade rel="prefetch" href="{link}" class="tile {cardClass}">
  <div class="tile is-child card">
    <div class="card-image">
      <figure class="image {imageRatio}">
        <img src={imageUrl} alt="{title} Poster" />
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
