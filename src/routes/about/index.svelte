<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`about.json`)
      .then(r => r.json())
      .then(queriedContent => {
        return { queriedContent };
      });
  }
</script>

<script>
  export let queriedContent;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

{#each queriedContent as content}
  {#if content.text}
    <p>{@html content.text}</p>
  {/if}
  {#if content.image}
    <img src={content.image.data.full_url} alt="" />
  {/if}
{/each}
