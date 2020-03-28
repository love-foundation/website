<script>
  import Select from "svelte-select";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let title = "";
  export let filters = {};

  function selected(key, event) {
    dispatch("selected", { [key]: event.detail.value })
  }

</script>

<style lang="scss">
  .select {
    --border: none;
    --placeholderColor: black;
    --inputFontSize: 3.6rem;
    --height: 44px;
    --itemIsActiveColor: #0597F2;
    --itemHoverBG: #0597F2;
  }
  :global(input) {
    font-family: $family-primary;
    color: $black;
    font-size: 36px;
    font-size: 3.6rem;
    cursor: pointer !important;
    &::placeholder {
      opacity: 1;
    }
  }
    :global(.selectedItem) {
      font-size: 36px !important;
      font-size: 3.6rem !important;
      color: $black;
      overflow-x: visible !important;
      width: auto;
    }
    :global(.selection) {
        overflow-x: visible !important;
        text-transform: capitalize !important;
      }
</style>

<div class="topbar columns is-horizontal">
  <h2 class="column is-2">{title}</h2>
  <div class="column" />

  {#each Object.entries(filters) as [key, { options, placeholder }]}
    <div class="column is-2">
    <div class="select">
      <Select
        items={options}
        placeholder={placeholder}
        on:select={e => { selected(key, e) }}
        on:clear={() => { dispatch("clear", key) }} />
    </div>
  </div>
  {/each}

  <div class="column is-2">
    <div class="select">Sort</div>
  </div>
</div>
