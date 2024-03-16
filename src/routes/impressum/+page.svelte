
<script lang="ts">
	import Content from '$lib/components/UI/Content.svelte';
	import type { PageData } from './$types';
  export let data: PageData

  $: queriedContent = data.impressum;


</script>

<svelte:head>
	<title>Love Foundation e.V. - Impressum</title>
</svelte:head>
{#if queriedContent}
<section id="impressum" class="pad--bottom--small">
	<Content {queriedContent} />
</section>
{/if}
