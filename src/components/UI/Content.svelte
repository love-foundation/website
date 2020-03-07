<script>
  export let text = "";
  export let imageOne = null;
  export let imageTwo = null;
  export let type = "text_only";
</script>

<style lang="scss">
  // section {
  //   max-width: $content-width;
  //   margin: 0 auto !important;
  // }
</style>

<section>
  <div class="container columns is-vcentered">
    {#if type == 'text_only'}
      <div class="column">
        {@html text}
      </div>
    {:else if type == 'image_left'}
      <div class="column is-half">
        <figure class="image">
          <img src={imageOne.data.full_url} alt="" />
        </figure>

      </div>
      <div class="column is-half">
        {@html text}
      </div>
    {:else if type == 'image_right'}
      <div class="column is-half">
        {@html text}
      </div>
      <div class="column is-half">
        <figure class="image">
          <img src={imageOne.data.full_url} alt="" />
        </figure>
      </div>
    {:else if type == 'double_image'}
      <div class="column is-half">
        <figure class="image">
          <img src={imageOne.data.full_url} alt="" />
        </figure>
      </div>
      <div class="column is-half">
        <figure class="image">
          <img src={imageTwo.data.full_url} alt="" />
        </figure>
      </div>
    {/if}
  </div>
</section>
