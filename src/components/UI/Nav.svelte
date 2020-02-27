<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import VanishingHeader from "./VanishingHeader.svelte"

  export let segment;

  let navActive = false;

  function toggleNav() {
    navActive = !navActive;
	}
</script>

<style lang="scss">


  nav {
    position: fixed;
    top: 66px;
    bottom: 0;
    right: 0;
    background: $blue;
    z-index: 10000;
    ul {
      margin: 0;
      padding: 0;
      padding-left: 50px;
      padding-right: 100px;
      list-style-type: none;
      li {
        font-size: 36px;
        font-size: 3.6rem;
        color: white;
        margin: 20px 0;
        a {
          text-decoration: none;
        }
      }
    }
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }


</style>

<VanishingHeader on:nav={toggleNav}/>

{#if navActive}
  <nav transition:fly={{ delay: 250, duration: 300, easing: quintOut, x: 200 }}>
    <ul>
      <li>
        <a class:selected={segment === undefined} href="/" on:click={toggleNav}>
          Home
        </a>
      </li>
      <li>
        <a
          class:selected={segment === 'about'}
          href="about"
          on:click={toggleNav}>
          About
        </a>
      </li>
      <li>
        <a
          on:click={toggleNav}
          rel="prefetch"
          class:selected={segment === 'projects'}
          href="projects">
          Projects
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'events'}
          href="events"
          on:click={toggleNav}>
          Events
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'artists'}
          href="artists"
          on:click={toggleNav}>
          Artists
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'lovecasts'}
          href="lovecasts"
          on:click={toggleNav}>
          Lovecasts
        </a>
      </li>
    </ul>
  </nav>
{/if}
