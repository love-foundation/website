<script>
  import { fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
  import VanishingHeader from './VanishingHeader.svelte'

  export let segment

  let navActive = false

  function toggleNav() {
    navActive = !navActive
  }
</script>

<style lang="scss">
  nav {
    position: fixed;
    top: $mobile-header-height;
    bottom: 0;
    right: 0;
    background: $blue;
    z-index: 10000;
    left: 0;
    @include tablet {
      top: $desktop-header-height;
      left: unset;
    }

    ul {
      margin-top: 40px;
      padding: 0;
      list-style-type: none;

      @include tablet {
        margin: 0;
        padding-left: 40px;
        padding-right: 100px;
      }
      li {
        text-align: center;
        font-size: 36px;
        font-size: 3.6rem;
        line-height: 64px;

        @include tablet {
          text-align: left;
        }

        a {
          text-decoration: none;
          color: $white !important;
          transition: opacity 0.2s ease;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }
</style>

<VanishingHeader on:nav={toggleNav} {navActive} {segment} />

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
      <li>
        <a
          rel="prefetch"
          class:selected={segment === 'support'}
          href="support"
          on:click={toggleNav}>
          Support
        </a>
      </li>
    </ul>
  </nav>
{/if}
