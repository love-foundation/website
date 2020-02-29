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
    <p>{content.text}</p>
  {/if}
  {#if content.test_file}
    <img src={content.test_file.data.full_url} alt="" />
  {/if}
{/each}

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>
