<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let segment;

  let navActive = false;

  function toggleNav() {
    navActive = !navActive;
  }
</script>

<style lang="scss">
  header {
    height: 66px;
    padding-top: 8px;
    padding-left: 31px;
    background-color: $blue;
    .homelink {
      float: left;
      text-decoration: none;
      color: white;
      h2 {
        text-transform: uppercase;
      }
    }

    .side {
      float: right;
    }
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

  /*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
  .hamburger {
    padding: 15px 15px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
  }
  .hamburger:hover {
    opacity: 0.7;
  }
  .hamburger.is-active:hover {
    opacity: 0.7;
  }
  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: #fff;
  }

  .hamburger-box {
    width: 40px;
    height: 24px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }
  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 40px;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: "";
    display: block;
  }
  .hamburger-inner::before {
    top: -10px;
  }
  .hamburger-inner::after {
    bottom: -10px;
  }

  /*
   * Spin
   */
  .hamburger--spin .hamburger-inner {
    transition-duration: 0.22s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  .hamburger--spin .hamburger-inner::before {
    transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
  }
  .hamburger--spin .hamburger-inner::after {
    transition: bottom 0.1s 0.25s ease-in,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--spin.is-active .hamburger-inner {
    transform: rotate(225deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .hamburger--spin.is-active .hamburger-inner::before {
    top: 0;
    opacity: 0;
    transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
  }
  .hamburger--spin.is-active .hamburger-inner::after {
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.1s ease-out,
      transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
</style>

<header>
  <a class="homelink" href="/">
    <h2>Love Foundation</h2>
  </a>

  <div class="side">
    <button
      class:is-active={navActive}
      class="hamburger hamburger--spin"
      type="button"
      on:click={toggleNav}>
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
  </div>

</header>

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
