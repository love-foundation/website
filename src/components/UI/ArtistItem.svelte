<script>
  import lozad from "lozad";
  import { onMount } from "svelte";

  export let artist;

  onMount(() => {
    const observer = lozad(".lozad", {
      loaded: function(el) {
        // Custom implementation on a loaded element
        el.classList.add("loaded");
      }
    });
    observer.observe();
  });
</script>

<style lang="scss">
  h3 {
    text-align: center;
  }
  .image img {
    object-fit: cover;
    text-align: center;
    color: $white;
    opacity: 0;
    margin-top: -50px;
    transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
      opacity 1s ease-in;
  }

  :global(.loaded) {
    margin-top: 0 !important;
    opacity: 1 !important;
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
        class="is-rounded lozad"
        data-src={artist.imageUrl}
        alt="{artist.name} Picture" />
    </figure>
    <h3>{artist.name}</h3>
  </div>
</a>
