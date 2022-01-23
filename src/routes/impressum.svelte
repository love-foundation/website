<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`impressum.json`)
      .then((r) => r.json())
      .then((queriedContent) => {
        return { queriedContent }
      })
  }
</script>

<script>
  import Content from '../components/UI/Content.svelte'
  export let queriedContent
</script>

<svelte:head>
  <title>Love Foundation e.V. - Impressum</title>
</svelte:head>
<section id="impressum" class="pad--bottom--small">
  <Content {queriedContent} />
</section>
