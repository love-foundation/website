<script>
  import { stores } from "@sapper/app";

  const { session } = stores();

  $: necessaryAccepted = $session.cookieConsent.necessary
</script>

<svelte:head>
  <title>Love Foundation - Support</title>
  {#if necessaryAccepted}
    <script src="https://www.helpmundo.de/helptools/donations/16431/0/init.js?type=dom&newLocal=de" type="text/javascript"></script>
  {/if}
</svelte:head>


<h1 class="pad--bottom--small centered">Support us financially</h1>

<section>
  {#if necessaryAccepted}
    <div id="donationform-default"></div>
  {:else}
    <h2 class="centered">Hey! You have to accept necessary cookies so we can show you our donation form here.</h2>
  {/if}

</section>
