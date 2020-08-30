<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`projects.json`)
      .then(r => r.json())
      .then(projects => {
        return { projects };
      });
  }
</script>

<script>
  import ProjectItem from "../../components/UI/ProjectItem.svelte";
  import { flip } from "svelte/animate";

  export let projects;
</script>

<style lang="scss">
  #projectList {
    display: grid;
    grid-template-areas:
      "left"
      "right";
    grid-template-columns: 100%;
    @include tablet {
      grid-template-areas: "left" "right";
      grid-template-columns: 50% 50%;
      grid-column-gap: 5%;
    }
    .project {
      padding: 15%;
      grid-area: "left";
      &.pull--top--medium {
        margin-top: -100px;
      }
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

<ul id="projectList">
  {#each projects as project, i (project.id)}
    <li
      animate:flip
      class="project"
      class:push--bottom--large={i === 0 || (i + 1) % 2}
      class:push--top--large={i % 2}
      class:pull--top--medium={i > 1 && (i + 1) % 2}>
      <ProjectItem {project} />
    </li>
  {/each}
</ul>
