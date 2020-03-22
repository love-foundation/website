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

<div class="topbar columns is-horizontal">
  <h2 class="column is-2">{title}</h2>
  <div class="column" />
  <div class="column is-2">
    <div class="select">
      <Select
        items={filterOne}
        placeholder={placeholderOne}
        bind:selectedValueOne />
    </div>
  </div>
  <div class="column is-2">
    <div class="select">
      <Select
        items={filterTwo}
        placeholder={placeholderTwo}
        bind:selectedValueTwo />
    </div>
  </div>
  <div class="column is-2">
    <div class="select">Sort</div>
  </div>
</div>
