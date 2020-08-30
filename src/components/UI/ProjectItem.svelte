<script>
  export let project;
  let { name, imageUrl, pillar, country, slug } = project;
</script>

<style lang="scss">
  a {
    width: 100%;
    position: relative;
  }
  .project--card {
    position: relative;

    img {
      width: 100%;
    }
    .project--information {
      display: flex;
    }

    .project--identifier {
      margin-right: 10px;
      margin-top: 3px;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      &.water {
        background-color: $water;
      }
      &.community {
        background-color: $community;
      }
      &.sustainability {
        background-color: $sustainability;
      }
      &.joy {
        background-color: $joy;
      }
      &.love {
        background-color: $love;
        border: 2px solid $black;
      }
    }
  }
</style>

<a rel="prefetch" href="/projects/{slug}">
  <div class="project--card">
    <img src={imageUrl} alt="{name} Image" />
    <div class="project--information">
      <div data-cy="projectPillar" class={`project--identifier ${pillar}`} />
      <div>
        <h3 data-cy="projectTitle">{name}</h3>
        <h3>{country}</h3>
      </div>

    </div>

  </div>
</a>
