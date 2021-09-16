<script>
  export let content;
  export let lazy;

  let imageOne;
  let caption;
  let text;
  let type;

  imageOne = content.details.imageOne ? content.details.imageOne.data.full_url : null;
  caption = content.details.captions
    ? content.details.captions.imageOneCaption
    : null;
  text = content.details.text;
  type = content.type == "image_left" ? "_left" : "_right";
</script>

<style lang="scss">
  .column {
    align-self: center;

    &--image {
      &_left {
        order: 0;
      }
      &_right {
        order: 2;
      }
    }
    &--text {
      order: 1;
    }
  }

  .image.lazy {
    opacity: 0;
    margin-top: -50px;
    transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
      opacity 1s ease-in;
    &.loaded {
      opacity: 1;
      margin-top: 0;
    }
  }
</style>

<div class={`column column--image${type} is-half`}>
  <figure
    data-toggle-class="loaded"
    class:lazy
    class:lozad={lazy}
    class="image">
    {#if lazy}
      <img class="lozad" data-src={imageOne} alt="" />
    {:else}
      <img src={imageOne} alt="" />
    {/if}
  </figure>
</div>
<div class="column column--text is-half">
  {@html text}
</div>
