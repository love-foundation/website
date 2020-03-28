<script>
  export let content;

  let wysiwyg;
  let layout;

  wysiwyg = content.text;
  layout = content.textLayout;

  let classNames = "";
  switch (layout) {
    case "two_columns":
      classNames = "column is-8 two-col";
      break;
    case "full_width":
      classNames = "column is-8";
      break;
    case "one_column":
      classNames = "column is-4";
  }
</script>

<style lang="scss">
  .two-col {
    columns: 2;
    column-fill: balance;
  }
</style>

<section class="columns is-centered">
  <div class={classNames}`>
    {@html wysiwyg}
  </div>
</section>
