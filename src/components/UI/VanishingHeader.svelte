<script>
  import { createEventDispatcher } from "svelte";

  export let duration = "300ms";
  export let offset = 50;
  export let tolerance = 0;
  export let navActive = false;
  export let segment = "";

  let dispatch = createEventDispatcher();

  let subpage = "";
  let headerClass = "show";

  let y = 0;
  let lastY = 0;

  function toggleNav() {
    navActive = !navActive;
    dispatch("nav");
  }

  function deriveClass(y, dy) {
    if (y < offset) {
      return "show";
    }

    if (Math.abs(dy) <= tolerance) {
      return headerClass;
    }

    if (dy > 0) {
      return "show";
    }

    return "hide";
  }

  function updateClass(y) {
    const dy = lastY - y;
    lastY = y;
    return deriveClass(y, dy);
  }

  function setTransitionDuration(node) {
    node.style.transitionDuration = duration;
  }

  $: if (navActive) {
    headerClass = "show";
  } else {
    headerClass = updateClass(y);
  }

  $: subpage = segment ? "&mdash; " + segment : ""

</script>

<style lang="scss">
  header {
    position: fixed;
    top: 0;
    z-index: 10000;
    width: 100%;
    height: $desktop-header-height;

    &:hover > div {
      transform: translateY(0%);
    }

    > div {
      box-sizing: border-box;
      height: 100%;
      background-color: $blue;
      transition: transform 300ms ease-in-out;

      .homelink {
        padding-left: 31px;
        float: left;
        text-decoration: none;
        color: white;
        padding-top: 6px;

        h1 {
          text-transform: uppercase;
        }
      }

      .side {
        float: right;
      }
    }
  }

  .show {
    transform: translateY(0%);
  }
  .hide {
    transform: translateY(-100%);
  }

  /*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
  .hamburger {
    padding: 9px;
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
    width: 28px;
    height: 2px;
    background-color: #fff;
    // border-radius: 4px;
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
    top: -8px;
  }
  .hamburger-inner::after {
    bottom: -8px;
  }

/*
  * Squeeze
*/
.hamburger--squeeze {
  .hamburger-inner {
    transition-duration: 0.075s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

    &::before {
      transition: top 0.075s 0.12s ease,
      opacity 0.075s ease;
    }

    &::after {
      transition: bottom 0.075s 0.12s ease,
      transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }

  &.is-active {
    .hamburger-inner {
      transform: rotate(45deg);
      transition-delay: 0.12s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

      &::before {
        top: 0;
        opacity: 0;
        transition: top 0.075s ease,
        opacity 0.075s 0.12s ease;
      }

      &::after {
        bottom: 0;
        transform: rotate(-90deg);
        transition: bottom 0.075s ease,
        transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }
}</style>

<svelte:window bind:scrollY={y} />

<header>
  <div use:setTransitionDuration class={headerClass}>
    <a class="homelink" href="/">
      <h1>Love Foundation {@html subpage}</h1>
    </a>

    <div class="side">
      <button
        class:is-active={navActive}
        class="hamburger hamburger--squeeze"
        type="button"
        on:click={toggleNav}>
        <span class="hamburger-box">
          <span class="hamburger-inner" />
        </span>
      </button>
    </div>
  </div>

</header>
