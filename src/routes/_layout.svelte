<script>
  import Nav from "../components/UI/Nav.svelte";
  import Footer from "../components/UI/Footer.svelte";

  export let segment;

  let winHeight = 0;
  let y = 0;
  let progress = 0;
  let docHeight = 0;

  $: if (docHeight > winHeight) {
    progress = y / (docHeight - winHeight);
  }
</script>

<style lang="scss">
  main {
    position: relative;
    max-width: $max-width;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: $desktop-header-height;
  }

  progress {
    top: 0;
    position: fixed;
    width: 100%;
    height: 5px;
    border: none;
    background: transparent;
    z-index: 1000;

    &[value]::-webkit-progress-value {
      background: $blue;
    }

    &[value]::-moz-progress-bar {
      background: $blue;
    }
  }

  .test {
    height: 1000px;
  }
</style>

<svelte:window bind:scrollY={y} bind:innerHeight={winHeight} />

<Nav {segment} />
<<<<<<< HEAD
<progress value={progress} />
=======
  <progress value={progress} />

<div bind:clientHeight={docHeight}>

>>>>>>> Adding the index pages, the query for the artists.json file, ArtistItem component

<div bind:clientHeight={docHeight}>

  <main>
    <slot />
  </main>
  <Footer />
</div>

<<<<<<< HEAD
=======
  <Footer />
</div>
>>>>>>> Adding the index pages, the query for the artists.json file, ArtistItem component
