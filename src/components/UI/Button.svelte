<script>
  export let link = "";
  export let newTab = false;

  let target = newTab ? "_blank" : "_self";
</script>

<style lang="scss">
  .btn {
    background-color: $blue;
    color: #fff;
    font-weight: 300;
    display: inline-block;
    padding: 20px 30px;
    margin: 0 auto;
    border-radius: 200px;
    text-decoration: none;
    font-size: 150%;
    &:hover {
      background-color: $hover-blue;
    }
    &--wrap {
      text-align: center;
      width: 100%;
    }
  }
</style>

<div class="btn--wrap">
  <a rel="prefetch" target={target} class="btn" href={link}>
    <slot />
  </a>
</div>
