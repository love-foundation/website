<script>
export let text = '';
export let imageOne = null;
export let imageTwo = null;
export let type = 'text_only';


</script>

<section>
{#if type == 'text_only'}
   {@html text}
{:else if  type == 'image_left'}
   <div>
      <img src="{imageOne.data.full_url}" alt="">
   </div>
   <div>
      {@html text}
   </div>
{:else if type == 'image_right'}
   <div>
      {@html text}
   </div>
    <div>
      <img src="{imageOne.data.full_url}" alt="">
   </div>
{:else if type == 'double_image'}
   <div>
      <img src="{imageOne.data.full_url}" alt="">
   </div>
   <div>
      <img src="{imageTwo.data.full_url}" alt="">
   </div>
{/if}
</section>
