<script>
  export let content;
  export let lazy;

  console.log(lazy);

  let imageOne;
  let imageTwo;
  let imageOneCaption;
  let imageTwoCaption;
  let fullWidth;
  let double;

  imageOne = content.details.imageOne;
  imageTwo = content.details.imageTwo;
  imageOneCaption = content.details.captions
    ? content.details.captions.imageOneCaption
    : null;
  imageTwoCaption = content.details.captions
    ? content.details.captions.imageTwoCaption
    : null;
  double = content.type == "double_image" ? true : false;
  fullWidth = content.type == "full_width" ? true : false;
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

<div class={`column`} class:is-half={!fullWidth}>
  <figure
    data-toggle-class="loaded"
    class:lazy
    class:lozad={lazy}
    class="image">
    {#if lazy}
      <img class="lozad" data-src={imageOne.data.full_url} alt="" />
    {:else}
      <img src={imageOne.data.full_url} alt="" />
    {/if}
  </figure>
</div>
{#if double}
  <div class="column is-half">
    <figure
      data-toggle-class="loaded"
      class:lazy
      class:lozad={lazy}
      class="image">
      {#if lazy}
        <img class="lozad" data-src={imageTwo.data.full_url} alt="" />
      {:else}
        <img src={imageTwo.data.full_url} alt="" />
      {/if}
    </figure>
  </div>
{/if}
