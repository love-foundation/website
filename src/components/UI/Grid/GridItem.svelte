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

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  let link = soundcloud ? soundcloud : `/events/${slug}`;
  let imageRatio = soundcloud ? "is-square" : "is-2by3";
  let eventDate;

  if (showDate && starttime) {
    eventDate = new Date(starttime);
    eventDate =
      eventDate.getDate() +
      " / " +
      months[eventDate.getMonth()] +
      " / " +
      eventDate.getFullYear();
  }
</script>

<style lang="scss">
  .item {
    padding: 5%;
    padding-bottom: 10%;
    position: relative;
    &.big {
      grid-area: big;
      border-bottom: 1px solid $light-grey;
      &.right {
        border-left: 1px solid $light-grey;
      }
      &.left {
        border-right: 1px solid $light-grey;
      }
    }
    &.small {
      padding: 10%;
      padding-bottom: 20%;
      &.a {
        grid-area: small-a;
        border-bottom: 1px solid $light-grey;
        border-right: 1px solid $light-grey;
      }
      &.b {
        grid-area: small-b;
        border-bottom: 1px solid $light-grey;
      }
      &.c {
        grid-area: small-c;
        border-bottom: 1px solid $light-grey;
        border-right: 1px solid $light-grey;
        align-self: end;
      }
      &.d {
        grid-area: small-d;
        border-bottom: 1px solid $light-grey;
        align-self: end;
      }
    }
  }

  h3 {
    width: 100%;
    padding: 0;
    line-height: 29px;
    text-align: center;
    &.subtitle {
      text-transform: capitalize;
    }
  }

  .item-info {
    height: 0;
  }

  .image {
    &.is-2by3 {
      padding-top: 141.421356238%;
    }
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

<a transition:fade rel="prefetch" href={link} class="item {cardClass}">
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
  <div class="item-info">
    <h3 class="title">{title}</h3>
    {#if subtitle}
      <h3 class="subtitle">{subtitle}</h3>
    {/if}
    {#if eventDate}
      <h3 class="subtitle">{eventDate}</h3>
    {/if}
  </div>
</a>
