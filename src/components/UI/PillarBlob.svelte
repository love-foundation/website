<script>
  export let pillar = "";
</script>

<style lang="scss">
  .project--identifier {
    margin-right: 10px;
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
</style>


<div data-cy="projectPillar" class={`project--identifier ${pillar}`} />

