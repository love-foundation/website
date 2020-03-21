<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`/artists/${params.slug}.json`);
    const data = await res.json();

   	if (res.status === 200) {
			return { artist: data[0] };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>


<script>
  export let artist;
</script>


<style>
img {
  width: 100%;
  height: auto;
}
</style>

<h1>{artist.artist_name}</h1>
<img src="{artist.image.data.full_url}" alt="">