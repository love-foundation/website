<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import VanishingHeader from "./VanishingHeader.svelte";

  export let segment;

  let navActive = false;

  function toggleNav() {
    navActive = !navActive;
  }
</script>

<style lang="scss">
  nav {
    position: fixed;
    top: $desktop-header-height;
    bottom: 0;
    right: 0;
    background: white;
    z-index: 10000;
    width: 100%;
    height: $desktop-header-height;
    padding-top: 4px;

    ul {
      margin: 0;
      padding: 0;
      padding-left: $distance-small;
      padding-right: $distance-small;
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      li {
        a {
          text-decoration: none;
          color: black !important;

          h1 {
            text-align: right;
          }
        }
      }
    }
  }

  // /* clearfix */
  // ul::after {
  //   content: "";
  //   display: block;
  //   clear: both;
  // }
</style>

<VanishingHeader on:nav={toggleNav} {navActive} {segment}/>

{#if navActive}
  <nav transition:fly={{ delay: 50, duration: 200, easing: quintOut, y: -40 }}>
    <ul>
      <li>
        <a class:selected={segment === undefined} href="/" on:click={toggleNav}>
          <h1>Home </h1>
        </a>
      </li>
      <li>
        <a
          class:selected={segment === 'about'}
          href="about"
          rel="prefetch"
          on:click={toggleNav}>
          <h1>About</h1>
        </a>
      </li>
      <li>
        <a
          on:click={toggleNav}
          rel="prefetch"
          class:selected={segment === 'projects'}
          href="projects">
          <h1>Projects</h1>
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'events'}
          href="events"
          on:click={toggleNav}>
          <h1>Events</h1>
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'artists'}
          href="artists"
          on:click={toggleNav}>
          <h1>Artists</h1>
        </a>
      </li>
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'lovecasts'}
          href="lovecasts"
          on:click={toggleNav}>
          <h1>Lovecasts</h1>
        </a>
      </li>
    </ul>
  </nav>
{/if}

