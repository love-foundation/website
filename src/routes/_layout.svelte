<script context="module">
  export function preload({ params, query }, session) {
    return this.fetch(`events.json`)
      .then((r) => r.json())
      .then((events) => {
        session.events = events
        return { events }
      })

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
  import Nav from '../components/UI/Nav.svelte'
  import Footer from '../components/UI/Footer.svelte'
  import { stores } from '@sapper/app'
  import CookieBar from '../components/UI/CookieBar.svelte'

  const { page } = stores()

  export let segment

  let winHeight = 0
  let y = 0
  let progress = 0
  let docHeight = 0
  let mainClasses = ''

  mainClasses = $page.path === '/events' ? 'events' : ''

  $: if (docHeight > winHeight) {
    progress = y / (docHeight - winHeight)
  }
</script>

<style lang="scss">
  main {
    position: relative;
    max-width: $max-width;
    background-color: white;
    padding: 0.5em;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: $desktop-header-height;

    @include desktop {
      padding: 2em;
    }
    &.events {
      padding: unset !important;
    }
  }

  progress {
    top: 0;
    position: fixed;
    width: 100%;
    height: 5px;
    border: none;
    background: transparent;
    z-index: 1000;
    -webkit-appearance: none !important;

    &[value]::-webkit-progress-value {
      background: $black !important;
    }

    &[value]::-webkit-progress-value {
      background: $black !important;
    }

    &::-webkit-progress-bar {
      background-color: none !important;
      background: none !important;
      border: none !important;
      -webkit-appearance: none !important;
    }

    &::-moz-progress-bar {
      background: none !important;
      border: none !important;
    }

    &[value]::-moz-progress-bar {
      background: $black !important;
    }
  }
</style>

<svelte:head>
  <style src="../styles/global.scss">
  </style>
  <!-- Matomo -->
  <script type="text/javascript">
    var _paq = (window._paq = window._paq || [])
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['requireCookieConsent'])
    _paq.push(['trackPageView'])
    _paq.push(['enableLinkTracking'])
    ;(function () {
      var siteId = process.env.NODE_ENV === 'production' ? 2 : 1
      var u = '//matomo.love-foundation.org/'
      _paq.push(['setTrackerUrl', u + 'matomo.php'])
      _paq.push(['setSiteId', siteId])
      var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0]
      g.type = 'text/javascript'
      g.async = true
      g.src = u + 'matomo.js'
      s.parentNode.insertBefore(g, s)
    })()
  </script>
  <!-- End Matomo Code -->
</svelte:head>

<svelte:window bind:scrollY={y} bind:innerHeight={winHeight} />

<Nav {segment} />
<progress value={progress} />

<div bind:clientHeight={docHeight}>
  <main class={mainClasses}>
    <slot />
  </main>
  <Footer />
</div>

<CookieBar />
