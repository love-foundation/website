<script>
  export let project;
  let { name, imageUrl, slug } = project;
</script>

<style lang="scss">
  a {
    width: 100%;
    position: relative;
  }
  .project--card {
    position: relative;

    h2 {
      width: 100%;
    }

    img {
      width: 100%;
    }
  }
</style>

<a rel="prefetch" href="/projects/{slug}">
  <div class="project--card">
    <img src={imageUrl} alt="{name} Image" />
    <h2 data-cy="projectTitle">{name}</h2>
  </div>
</a>
