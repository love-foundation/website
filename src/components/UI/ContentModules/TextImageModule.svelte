<script>
  export let content;

  let imageOne;
  let caption;
  let text;
  let type;

  imageOne = content.details.imageOne;
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
</style>

<div class={`column column--image${type} is-half`}>
  <figure class="image">
    <img src={imageOne.data.full_url} alt="" />
  </figure>
</div>
<div class="column column--text is-half">
  {@html text}
</div>
