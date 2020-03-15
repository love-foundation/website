<script>
  export let artist;
</script>

<style lang="scss">
  h3 {
    text-align: center;
  }
  .image img {
    object-fit: cover;
  }

  .column {
    padding: 5rem;
  }
</style>

<a
  rel="prefetch"
  href="/artists/{artist.id}"
  class="column is-one-quarter-desktop is-one-third-tablet">
  <div>
    <figure class="image is-square">
      <img
        class="is-rounded"
        src={artist.imageUrls}
        alt="{artist.name} Picture" />
    </figure>
    <h3>{artist.name}</h3>
  </div>
</a>
