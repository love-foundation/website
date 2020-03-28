<script>
  export let content;

  let imageOne;
  let imageTwo;
  let imageOneCaption;
  let imageTwoCaption;
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
</style>

<div class={`column is-half`}>
  <figure class="image">
    <img src={imageOne.data.full_url} alt="" />
  </figure>
</div>
{#if double}
  <div class="column is-half">
    <figure class="image">
      <img src={imageTwo.data.full_url} alt="" />
    </figure>
  </div>
{/if}
