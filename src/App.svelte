<script lang="ts">
	import Router from 'svelte-hash-router';

	import Auth from './store/auth';

	import Nav from './components/Nav.svelte';
	import Tutorial from './components/Tutorial.svelte';
</script>

<style>
	:global(:root) {
		--dark-font-color: black;
		--light-font-color: white;
		--background-major: #1a1c1d;
		--background-major-inv: white;
		--svg-col-prim: white;
		--svg-col-secon: black;
		--background-minor: #ffe5b2;
		--page-background: #26262c;
		--pretty-box-shadow-dark: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
			rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
		--pretty-box-shadow-light: rgba(255, 255, 255, 0.2) 0px 12px 28px 0px, rgba(255, 255, 255, 0.1) 0px 2px 4px 0px,
			rgba(0, 0, 0, 0.05) 0px 0px 0px 1px inset;
		font-family: Manrope, sans-serif;
		box-sizing: border-box;
	}

	:global(:root.light) {
		--dark-font-color: black;
		--light-font-color: white;
		--background-major: #ffe5b2;
		--background-minor: grey;
		--page-background: #c9baba;
		--svg-col-prim: black;
		--svg-col-secon: white;
	}

	:global(body, html) {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}
	:global(body) {
		background-color: var(--page-background);
		overflow-x: hidden;
	}
</style>

{#if !$Auth.isNew}
	<Tutorial />
{:else}
	<Nav />
	<Router />
{/if}
