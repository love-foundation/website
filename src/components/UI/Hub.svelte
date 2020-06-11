<script>
export let hub;

let {city, facebook, instagram} = hub;
</script>

<style lang="scss">
  .hub-box {
    text-align: center;
    margin: 5%;
    padding: 5%;
    color: $blue;
  }
  .hub-box:hover {
    background-color: aliceblue;
  }
  .hub-name {
    text-decoration: none;
    font-size: 150%;
    color: #575757;
  }
</style>

<div class="column is-4">
  <div class="hub-box">
    <h3>{city}</h3>
    {#if facebook}
       <a href={`${facebook}`} class="hub-name">Facebook</a>
       <br />
    {/if}
    {#if instagram}
       <a href={`${instagram}`} class="hub-name">Instagram</a>
    {/if}
  </div>
</div>
