<footer>
	<div class="container fluid">
		<div class="columns">
			<div class="column is-2">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/about" data-sveltekit-preload-data>About</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/projects">Projects</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/events">Events</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/artists">Artists</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/lovecasts">Lovecasts</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/support">Support</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/privacy">Privacy Policy</a>
					</li>
				</ul>
			</div>
			<div class="column is-2">
				<ul>
					<li>
						<div class="content">Love Foundation e.V.</div>
						<a data-sveltekit-preload-data href="/impressum">Impressum</a>
					</li>
					<li>
						<a data-sveltekit-preload-data href="/vereniging">Vereniging Love Foundation</a>
					</li>
				</ul>
			</div>
			<div class="column" />
			<div class="column is-3 is-flex">
				<div class="columns is-mobile low">
					<a
						class="column"
						rel="external nofollow noopener noreferrer"
						href="https://www.instagram.com/lovefoundation_global/"
					>
						<div class="blob">
							<h2>INS</h2>
						</div>
					</a>
					<a
						class="column"
						rel="external nofollow noopener noreferrer"
						href="https://www.facebook.com/LoveFoundation"
					>
						<div class="blob">
							<h2>FB</h2>
						</div>
					</a>
					<a
						class="column"
						rel="external nofollow noopener noreferrer"
						href="https://www.soundcloud.com/love-foundation"
					>
						<div class="blob">
							<h2>SC</h2>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		background: $light-grey;
		padding: 50px 60px;
	}

	ul {
		list-style-type: none;
		li {
			line-height: 33px;
		}
	}
	a {
		text-decoration: none;
		cursor: pointer;
	}

	.blob {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 2px solid $black;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		align-self: bottom;

		@include desktop {
			width: 100px;
			height: 100px;
		}
		&:hover {
			border-color: $dark-grey;
		}
	}

	.low {
		align-self: flex-end;
	}
</style>
