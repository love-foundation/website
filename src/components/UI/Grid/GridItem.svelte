<script>
  import { fade } from "svelte/transition";

  export let item = null;
  export let showDate = false;
  export let lazy = false;
  export let cardClass = "";

  let {
    id,
    slug,
    title,
    subtitle = item.hub ? item.hub : null,
    soundcloud,
    starttime,
    imageUrl
  } = item;

  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let link = soundcloud ? soundcloud : `/events/${slug}`;
  let imageRatio = soundcloud ? "is-square" : "is-3by4";
  let eventDate;

  if (showDate && starttime) {
    eventDate = new Date(starttime);
    eventDate = eventDate.getDate() + " / " + months[eventDate.getMonth()] + " / " + eventDate.getFullYear();
  }


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

  .image {
    img {
      object-fit: contain;
    }

    &.lazy {
      opacity: 0;
      margin-top: -50px;
      transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
        opacity 1s ease-in;
      &.loaded {
        opacity: 1;
        margin-top: 0;
      }
    }
  }
</style>

<a transition:fade rel="prefetch" href={link} class="tile {cardClass}">
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
      {#if eventDate}
        <h3 class="subtitle card-header-title is-centered">{eventDate}</h3>
      {/if}
    </div>
  </div>
</a>
