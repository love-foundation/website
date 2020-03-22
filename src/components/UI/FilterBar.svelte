<script>
  import Select from "svelte-select";

  export let filterOne = [];
  export let placeholderOne = "";
  export let filterTwo = [];
  export let placeholderTwo = "";



  export let title = "";

  let selectedValueOne = undefined;
  let selectedValueTwo = undefined;
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
  <div class="column is-2">
    <div class="select">
      <Select
        items={filterOne}
        placeholder={placeholderOne}
        bind:selectedValueOne
        on:select />
    </div>
  </div>
  <div class="column is-2">
    <div class="select">
      <Select
        items={filterTwo}
        placeholder={placeholderTwo}
        bind:selectedValueTwo
        on:select />
    </div>
  </div>
  <div class="column is-2">
    <div class="select">Sort</div>
  </div>
</div>
