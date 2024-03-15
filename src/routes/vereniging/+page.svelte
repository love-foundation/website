<script lang="ts">
	import Content from '$lib/components/UI/Content.svelte';
	import type { PageData } from './$types';
  export let data: PageData

  const queriedContent = data.vereniging;

</script>

<svelte:head>
	<title>Vereniging Love Foundation</title>
</svelte:head>
{#if queriedContent}
<section id="vereniging" class="pad--bottom--small">
	<Content {queriedContent} />
</section>
{/if}
