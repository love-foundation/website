<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`test.json`)
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

<Content {queriedContent} />
