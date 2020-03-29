<script>
  import { onMount } from "svelte";

  export let content;

  let { image, bgColor, heading } = content;
  let bgImage;
  console.log(image);
  console.log(bgColor);
  console.log(heading);

  onMount(() => {
    if (bgColor) {
      console.log("I'm running bg color");
      document.documentElement.style.setProperty("--hero-bgcolor", bgColor);
    } else {
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

    .backdrop {
      background-color: var(--hero-bgcolor);
      background-image: var(--hero-bgimage);
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
        filter: blur(10px);
      }
    }

    img {
      width: 70%;
      margin: 0 auto;
      padding: 20%;
      filter: none;
      z-index: 5;
    }
  }
</style>

<div id="hero">
  <div class="backdrop" class:image={bgImage} />
  <img src={image} alt="" />
</div>
