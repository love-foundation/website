<script>
  export let id = null;
  export let imageUrl = "";
  export let title = "";
  export let hub = "";
  export let index = null;

  let cardClass = "";

  if (index === 0) {
    cardClass = "is-6";
  } else if (index % 10 === 0 || (index + 1) % 10 === 0) {
    cardClass = "is-6";
  } else {
    cardClass = "is-3";
  }
</script>

<style lang="scss">
  .card-header {
    flex-wrap: wrap;
    box-shadow: none;
    text-align: center;
  }
  h3 {
    width: 100%;
    &.hub {
      text-transform: capitalize;
    }
  }
</style>

<a rel="prefetch" href="/events/{id}" class="card column {cardClass}">
  <div class="card-image">
    <figure class="image is-3by4">
      <img src={imageUrl} alt="{title} Poster" />
    </figure>
  </div>
  <div class="card-header">
    <h3 class="title card-header-title is-centered">{title}</h3>
    <h3 class="hub card-header-title is-centered">{hub}</h3>
  </div>
</a>
