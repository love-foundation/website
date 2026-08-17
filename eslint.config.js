import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import svelteConfig from './svelte.config.js';

export default tseslint.config(
	{
		ignores: [
			'.svelte-kit/',
			'build/',
			'node_modules/',
			'playwright-report/',
			'test-results/',
			'blob-report/',
			'static/'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: tseslint.parser,
				svelteConfig
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				// Downgraded: the existing violations predate the ESLint 8 -> 10 upgrade.
				// Lint was previously crashing on an invalid .eslintrc.cjs, so these were
				// never reported.
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],

			// This app is served from the domain root and sets no `paths.base`, so
			// routing every link and `goto` through `resolve()` buys nothing.
			'svelte/no-navigation-without-resolve': 'off',

			// Content modules deliberately render sanitised HTML authored in Directus.
			'svelte/no-at-html-tags': 'off',

			// Adding `{#each}` keys changes list reconciliation behaviour, so these are
			// surfaced rather than enforced until the affected lists have been retested.
			'svelte/require-each-key': 'warn',
			'svelte/valid-each-key': 'warn'
		}
	},
	{
		files: ['**/*.svelte'],
		rules: {
			// ESLint's flow analysis does not model Svelte's `$:` reactive statements, so
			// initialisers that are later recomputed reactively look dead to it.
			'no-useless-assignment': 'off'
		}
	}
);
