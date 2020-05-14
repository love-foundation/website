 <script>
  import GridItem from "../Grid/GridItem.svelte";

  export let upcomingEvents;

 </script>

 <section>
    <h2>Upcoming Events</h2>
    <ul>
    {#each upcomingEvents as upcomingEvent}
       <GridItem item={upcomingEvent} showDate={true} cardClass={'push--bottom--small is-4'} />
    {/each}
    </ul>
  </section>