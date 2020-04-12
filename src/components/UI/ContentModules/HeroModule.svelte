<script>
  import { onMount } from "svelte";

  export let content;
  let heroClass;
  let bgColor = false;
  let heading = false;
  let image = "";
  let bgImage;

  if (content.details) {
    bgColor = content.details.heroColor ? content.details.heroColor : false;
    image = content.details.imageOne.data.full_url;
    heading = content.details.text ? content.details.text : false;
  } else {
    ({ image, bgColor, heading } = {...content});
  }

  heroClass = bgColor ? "bgcolor" : heading ? "title" : "bgimage";

  onMount(() => {
    if (bgColor) {
      console.log("I'm running bg color");
      document.documentElement.style.setProperty("--hero-bgcolor", bgColor);
    } else if (!heading) {
      bgImage = 'url("' + image + '"';
      document.documentElement.style.setProperty("--hero-bgimage", bgImage);
    }
  });
</script>

<style lang="scss">
  #hero {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-top: -2em;
    text-align: center;
    max-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;

    &.bgimage {
      .backdrop {
        background-image: var(--hero-bgimage);
      }
      img {
        width: 70%;
        margin: 0 auto;
        padding: 20%;
        z-index: 5;
      }
    }

    &.title {
      h1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        text-align: center;
        color: $white;
        text-shadow: 2px 2px 2px $black;
      }
      img {
        width: 100% !important;
      }
    }

    .backdrop {
      background-color: var(--hero-bgcolor);
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      z-index: 0;
      &.image {
        filter: blur(5px);
        margin: -5px -10px -10px -5px;
      }
    }
  }
</style>

<div id="hero" class={heroClass}>
  <div class="backdrop" class:image={bgImage}>
    {#if heading}
      <h1>{heading}</h1>
    {/if}
  </div>
  <img src={image} alt="" />
</div>
