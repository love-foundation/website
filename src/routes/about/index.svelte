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
  import Content from "../../components/UI/Content.svelte";
  export let queriedContent;

</script>

<svelte:head>
  <title>About</title>
</svelte:head>

{#each queriedContent as content}
  <Content
    text={content.text}
    imageOne={content.imageOne}
    imageTwo={content.imageTwo}
    type={content.type} />
{/each}
