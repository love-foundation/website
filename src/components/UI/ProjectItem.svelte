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
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 100%;
      text-align: center;
      color: $white;
      text-shadow: 2px 2px 2px $black;
    }

    img {
      width: 100%;
    box-shadow: 7px 8px 5px -3px rgba(0, 0, 0, 0.5);
    }
  }
</style>

<a rel="prefetch" href="/projects/{slug}">
  <div class="project--card">
    <img src={imageUrl} alt="{name} Image" />
    <h2>{name}</h2>
  </div>
</a>
