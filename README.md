# Love Foundation Website

This is the repository containing the Love Foundation Website. The website is based on SvelteKit, a SSR-ready app creator based on Svelte. On the backend this site is fetching information from Directus, our Headless cms.



## Running the project

```bash
npm install
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

Consult [kit.svelte.dev](https://kit.svelte.dev) for help getting started.

## Environment Variables

The project uses the following environment variables:

- `VITE_DIRECTUS_URL`: The URL of the Directus instance.
- `VITE_DIRECTUS_TOKEN`: The token to use for the Directus instance.

The `VITE_DIRECTUS_URL` should be any directus instance of Love Foundation. Generally, it's totally fine to use the production instance for testing, for development you should rather use a local instance or work with mock fixtures.

The `VITE_DIRECTUS_TOKEN` can be generated in your user profile on the directus instance. Head to your profile and generate it. If you can't see an option, reach out.

# OUTDATED

## Structure

Sapper expects to find two directories in the root of your project —  `src` and `static`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.


#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — *pages*, and *server routes*.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

* A file called `src/routes/about.svelte` corresponds to the `/about` route. A file called `src/routes/blog/[slug].svelte` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
* The file `src/routes/index.svelte` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.svelte` is treated the same as `src/routes/about.svelte`.
* Files and directories with a leading underscore do *not* create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would *not* create a `/_helpers/datetime` route


#### src/styles

This is where global syles of the repository live. Generally, we try to have as many styles inside components, but some generals like fonts (and properties) are stored in the global.scss file. Utility mixins go to utilities.scss, while general variable settings are inside the variables.scss. Any scss that is inside variables.scss gets prepended to *EVERY* component with a `<style lang="scss">` section.

### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](src/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@sapper/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).


## Bundler config

Sapper uses Rollup or webpack to provide code-splitting and dynamic imports, as well as compiling your Svelte components. With webpack, it also provides hot module reloading. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.


## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

The site is deployed via drone automatically to the Love Foundation Server. If you want to test a production static build locally, you can run `npm run export:production` or `npm run export` for a non-productionized export


## Using external components

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an *external dependency*. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @sveltejs/svelte-virtual-list
```


## Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
