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
.secret {
      height: 0;
      opacity: 0;
    }
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
        line-height: 64px;
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

<VanishingHeader on:nav={toggleNav} {navActive} {segment}/>

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
          rel="prefetch"
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

<div class="secret">
  <a href="/">Home</a>
  <a href="about" rel="prefetch">About</a>
  <a rel="prefetch" href="projects">Projects</a>
  <a rel="prefetch" href="events">Events</a>
  <a rel="prefetch" href="artists">Artists</a>
  <a rel="prefetch" href="lovecasts">Lovecasts</a>
</div>
