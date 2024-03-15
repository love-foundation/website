<script lang="ts">
	import Content from '$lib/components/UI/Content.svelte';
	import type { PageData } from './$types';
  export let data: PageData

  const queriedContent = data.privacyPolicy;


</script>

<svelte:head>
	<title>Privacy Policy</title>
</svelte:head>
{#if queriedContent}
<section id="privacy-policy" class="pad--bottom--small">
	<Content {queriedContent} />
</section>
{/if}
