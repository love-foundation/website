<script>
  import { stores } from "@sapper/app";

  const { session } = stores();

  $: necessaryAccepted = $session.cookieConsent.necessary
</script>

<svelte:head>
  <title>Love Foundation - Support</title>
</svelte:head>


<h1 class="pad--bottom--small centered">Support us financially</h1>

<section>
  {#if necessaryAccepted}
    <div>
      <iframe title="Betterplace donation form"  style="max-width: 600px; max-height: none; width: 100%; background-color: transparent; overflow: hidden; height: 849px;" src="https://www.betterplace.org/de/donate/iframe/projects/96620?background_color=ffffff&amp;color=0482d1&amp;donation_amount=5&amp;bottom_logo=false&amp;default_payment_method=&amp;default_interval=monthly&amp;utm_campaign=external_donation_forms&amp;utm_source=domain:%20&amp;utm_medium=project_96620&amp;utm_content=" id="iFrameResizer0" scrolling="no" width="100%" height="1200" frameborder="0"></iframe>
    </div>
  {:else}
    <h2 class="centered">Hey! You have to accept necessary cookies so we can show you our donation form here.</h2>
  {/if}

</section>

<style>
  div {
    text-align: center;
  }
</style>
