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
  import { flip } from "svelte/animate"

  export let projects;
</script>

<style lang="scss">
</style>

<svelte:head>
  <title>Projects</title>
</svelte:head>

<div class="columns is-multiline is-vertical">
  {#each projects as project, i (project.id)}
    <div animate:flip class="project column is-4">
      <ProjectItem {project} />
    </div>
  {/each}
</div>
