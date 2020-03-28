<script>
  import TextModule from "./ContentModules/TextModule.svelte"
  export let queriedContent;

  let layout;
  let moduleMapping = [
    {type: "text_only", component: TextModule}

  ];

 // {type: "image_left", component: TextImageModule},
    // {type: "image_right", component: TextImageModule},
    // {type: "double_image", component: DoubleImageModule},
    // {type: "image_caption", component: CaptionModule},
    // {type: "image_only", component: InlineImageModule},
    // {type: "full_width", component: FullWidthModule}
queriedContent.map((qc) => {
  layout = moduleMapping.filter(m => m.type == qc.type)
  if (layout[0]) {
    qc.component = layout[0].component;
  }
})
</script>

<style>
</style>


{#each queriedContent as content}
  {#if content.component}
   <svelte:component this={content.component} content={content.details} />
  {/if}
{/each}

<!-- <section>
  <div class="container columns is-vcentered">
    {#if type == 'text_only'}
      <div class="column">
        {@html text}
      </div>
    {:else if type == 'image_left'}
      <div class="column is-half">
        <figure class="image is-3by4">
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
        <figure class="image is-3by4">
          <img src={imageOne.data.full_url} alt="" />
        </figure>
      </div>
    {:else if type == 'double_image'}
      <div class="column is-half">
        <figure class="image is-3by4">
          <img src={imageOne.data.full_url} alt="" />
        </figure>
      </div>
      <div class="column is-half">
        <figure class="image is-3by4">
          <img src={imageTwo.data.full_url} alt="" />
        </figure>
      </div>
    {/if}
  </div>
</section> -->
