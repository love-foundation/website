<script>
  import TextModule from "./ContentModules/TextModule.svelte";
  import TextImageModule from "./ContentModules/TextImageModule.svelte";
  import InlineImageModule from "./ContentModules/InlineImageModule.svelte";
  import { flip } from "svelte/animate";
  import { onMount } from "svelte";
  import lozad from "lozad";

  export let queriedContent;

  let layout;
  let moduleMapping = [
    { type: "text_only", component: TextModule },
    { type: "image_left", component: TextImageModule },
    { type: "image_only", component: InlineImageModule },
    { type: "double_image", component: InlineImageModule },
    { type: "image_right", component: TextImageModule },
    { type: "full_width", component: InlineImageModule }
  ];

  onMount(() => {
    const observer = lozad();
    observer.observe();
  });

  queriedContent.map(qc => {
    layout = moduleMapping.filter(m => m.type == qc.type);
    if (layout[0]) {
      qc.component = layout[0].component;
    }
  });
</script>

<style lang="scss">
  section {
    margin-top: -50px;
    opacity: 0;
    transition: margin-top 1s cubic-bezier(0.4, 0.07, 0.32, 0.94),
      opacity 1s ease-in;
    &.loaded {
      opacity: 1;
      margin-top: 0;
    }
  }
</style>

{#each queriedContent as content, i (content.id)}
  <section
    data-toggle-class="loaded"
    animate:flip
    class:loaded={i < 3}
    class:lozad={i >= 3}
    class={`columns is-centered pad--bottom--${content.details.padding}`}>
    {#if content.component}
      <svelte:component this={content.component} {content} lazy={i >= 3} />
    {/if}
  </section>
{/each}
