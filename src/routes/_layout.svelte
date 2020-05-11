<script context="module">
  export function preload({ params, query }, session) {
    return this.fetch(`events.json`)
      .then(r => r.json())
      .then(events => {
        session.events = events;
        return { events };
      });

    // return this.fetch(`artists.json`)
    //   .then(r => r.json())
    //   .then(artists => {
    //     session.artist = artists;
    //     return { artists };
    //   });

    //   return this.fetch(`lovecasts.json`)
    //   .then(r => r.json())
    //   .then(artists => {
    //     session.artist = artists;
    //     return { artists };
    //   });
  }
</script>

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
    z-index: 1000;
    background-color: #aaa;
    -webkit-box-shadow: none;
    box-shadow: none;

    &[value] { 
      -webkit-appearance: none; 
      appearance: none;
    }

    &[value]::-webkit-progress-value {
      background-color: $blue;
    }

    &[value]::-moz-progress-bar {   
      background-color: $blue;
    }
  }
</style>

<svelte:window bind:scrollY={y} bind:innerHeight={winHeight} />

<Nav {segment} />
<progress value={progress} />

<div bind:clientHeight={docHeight}>

  <main>
    <slot />
  </main>
  <Footer />
</div>

