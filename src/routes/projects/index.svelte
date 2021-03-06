<script context="module">
  export function preload({ params, query }) {
    const pageFilters = query
    return this.fetch(`projects.json`)
      .then(r => r.json())
      .then(projects => {
        return { projects, pageFilters }
      })
  }
</script>

<script>
  import ProjectItem from '../../components/UI/ProjectItem.svelte'
  import PillarBlob from '../../components/UI/PillarBlob.svelte'
  import { fade } from "svelte/transition";
  import { beforeUpdate } from 'svelte'

  export let projects
  export let pageFilters

  let currentPillars = { ...pageFilters }
  let projectsArray = projects
  let filteredProjects = []

  let categories = [
    {
      name: 'Water for all',
      slug: 'water',
    },
    {
      name: 'Universal Love',
      slug: 'love',
    },
    {
      name: 'Community Spirit',
      slug: 'community',
    },
    {
      name: 'Shared Sustainability',
      slug: 'sustainability',
    },
    {
      name: 'Joyful Purpose',
      slug: 'joy',
    },
  ]

  beforeUpdate(() => {
    let params = { ...currentPillars }
    let url = new URL(window.location.href)
    if (params.pillar) {
      url.searchParams.set('pillar', params.pillar)
    } else {
      url.searchParams.delete('pillar')
    }
    window.history.pushState({}, null, url)
  })

  function filterProjects(pillar) {
    console.log('Filtering')
    if (currentPillars.pillar === pillar) {
      delete currentPillars.pillar

      // force an update
      currentPillars = { ...currentPillars }
    } else {
      currentPillars.pillar = pillar
    }
  }

  $: filteredProjects = projectsArray.filter(p => {
    if (currentPillars.pillar) {
      return p.pillar === currentPillars.pillar
    } else {
      return p.pillar
    }
  })
</script>

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

<svelte:head>
  <title>Projects</title>
</svelte:head>

<h1 class="centered" data-cy="pageTitle">Projects</h1>

<p class="centered pad--bottom--small" data-cy="pageIntro">
  Love Foundation is starting and supporting a variety of projects globally.
</p>

<ul data-cy="projectFilters" id="projectfilters">
  {#each categories as category}
    <li
      data-cy="projectFilter"
      class="projectfilter"
      on:click={() => {
        filterProjects(category.slug)
      }}>
      <PillarBlob pillar={category.slug} />
      <h3>{category.name}</h3>
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
      class:pull--top--medium={i > 1 && (i + 1) % 2}>
      <ProjectItem {project} />
    </li>
  {/each}
</ul>
