<script lang="ts">
	import ProjectItem from '$lib/components/UI/ProjectItem.svelte';
	import PillarBlob from '$lib/components/UI/PillarBlob.svelte';
	import { fade } from 'svelte/transition';
	import { beforeUpdate, onMount } from 'svelte';
	import type { ConvertedProjects } from './_types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	export let data: PageData;

	$: projects = data.projects ?? [];
	const pageFilters: {
		pillar?: string | null | boolean;
	} = { pillar: browser && $page.url.searchParams.get('pillar') };

	onMount(() => {
		pageFilters.pillar = $page.url.searchParams.get('pillar');
	});

	let currentPillars = { ...pageFilters };
	let filteredProjects: ConvertedProjects[] = [];

	let categories = [
		{
			name: 'Water for all',
			slug: 'water'
		},
		{
			name: 'Universal Love',
			slug: 'love'
		},
		{
			name: 'Community Spirit',
			slug: 'community'
		},
		{
			name: 'Shared Sustainability',
			slug: 'sustainability'
		},
		{
			name: 'Joyful Purpose',
			slug: 'joy'
		}
	];

	beforeUpdate(() => {
		let params = { ...currentPillars };
		let url = new URL(window.location.href);
		if (params.pillar) {
			url.searchParams.set('pillar', params.pillar.toString());
		} else {
			url.searchParams.delete('pillar');
		}
		goto(`?${url.searchParams.toString()}`, {});
	});

	function filterProjects(pillar: string | null) {
		if (currentPillars.pillar === pillar) {
			delete currentPillars.pillar;

			// force an update
			currentPillars = { ...currentPillars };
		} else {
			currentPillars.pillar = pillar;
		}
	}

	$: filteredProjects = projects.filter((p) => {
		if (currentPillars.pillar) {
			return p.pillar === currentPillars.pillar;
		} else {
			return p.pillar;
		}
	});
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1 class="centered" data-cy="pageTitle">Projects</h1>

<p class="centered pad--bottom--small" data-cy="pageIntro">
	Love Foundation is starting and supporting a variety of projects globally.
</p>

<ul data-cy="projectFilters" id="projectfilters">
	{#each categories as category}
		<li data-cy="projectFilter" class="projectfilter">
			<div
				tabindex="0"
				role="button"
				data-cy="projectFilter"
				class="projectfilter"
				on:click={() => {
					filterProjects(category.slug);
				}}
				on:keydown={() => {
					filterProjects(category.slug);
				}}
			>
				<PillarBlob pillar={category.slug} />
				<h3>{category.name}</h3>
			</div>
		</li>
	{/each}
</ul>

<ul id="projectList">
	{#each filteredProjects as project, i (project.id)}
		<li
			data-cy="projectItem"
			transition:fade
			class="project"
			class:push--bottom--large={i === 0 || (i + 1) % 2}
			class:push--top--large={i % 2}
			class:pull--top--medium={i > 1 && (i + 1) % 2}
		>
			<ProjectItem {project} />
		</li>
	{/each}
</ul>

<style lang="scss">
	#projectList {
		display: grid;
		grid-template-areas:
			'left'
			'right';
		grid-template-columns: 100%;
		@include tablet {
			grid-template-areas: 'left' 'right';
			grid-template-columns: 50% 50%;
			grid-column-gap: 5%;
		}
		.project {
			padding: 15%;
			grid-area: 'left';
			&.pull--top--medium {
				margin-top: -100px;
			}
		}
	}

	#projectfilters {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.projectfilter {
			margin: 10px;
			display: flex;
			align-items: center;
			cursor: pointer;
		}
	}
</style>
