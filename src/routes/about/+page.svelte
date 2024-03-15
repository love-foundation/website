
<script lang="ts">
	import Content from '$lib/components/UI/Content.svelte';
	import type { PageData } from './$types';
  export let data: PageData

  const queriedContent = data.about;

</script>
<svelte:head>
	<title>About</title>
</svelte:head>

{#if queriedContent}
  <Content {queriedContent} />
{/if}
