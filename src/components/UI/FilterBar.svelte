<script>
  import Select from "svelte-select";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let title = "";
  export let filters = {};

  let sort = false;

  function selected(key, event) {
    dispatch("selected", { [key]: event.detail.value });
  }

  const setActiveClass = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.target.children.length > 1
          ? mutation.target.parentNode.classList.add("active")
          : mutation.target.parentNode.classList.remove("active");
      }
    }
  };

  const selectAction = node => {
    node.children[0].children.length > 1
      ? node.classList.add("active")
      : node.classList.remove("active");

    const config = { childList: true };
    const observer = new MutationObserver(setActiveClass);
    observer.observe(node.children[0], config);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  };
</script>

<style lang="scss">
  .select {
    --border: none;
    --placeholderColor: black;
    --inputFontSize: 3.6rem;
    --height: 54px;
    --itemIsActiveColor: #0597f2;
    --itemHoverBG: #0597f2;
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 12px solid #000;
      clear: both;
    }
    &.focused {
      &::after {
        transform: rotate(180deg) translateY(50%);
      }
    }
    &.active {
      &::after {
        display: none;
      }
    }
  }

  h2 {
    &.vcentered {
      display: flex;
      align-items: center;
      height: 100%;
    }
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
  <div class="column is-2">
    <h2 class="vcentered">{title}</h2>
  </div>
  <div class="column" />

  {#each Object.entries(filters) as [key, { options, placeholder, value }]}
    <div class="column is-2">
      <div use:selectAction class="select" class:active={false}>
        <Select
          selectedValue={value}
          items={options}
          {placeholder}
          on:select={e => {
            selected(key, e);
          }}
          on:clear={() => {
            dispatch('clear', key);
          }} />
      </div>
    </div>
  {/each}

  <div class="column is-2">
    <h2
      class="select vcentered"
      class:focused={sort}
      on:click={() => {
        dispatch('sort');
        sort = !sort;
      }}>
      Sort
    </h2>
  </div>
</div>
