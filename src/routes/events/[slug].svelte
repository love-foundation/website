<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/events/${params.slug}.json`);
    const data = await res.json();

   	if (res.status === 200) {
			return { event: data[0] };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>


<script>
  export let event;
</script>


<style>
img {
  width: 100%;
  height: auto;
}
</style>

<h1>{event.name}</h1>
<img src="{event.poster.data.full_url}" alt="">