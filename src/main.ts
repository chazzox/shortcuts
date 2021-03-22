import { routes } from 'svelte-hash-router';

import App from './App.svelte';
import Home from './routes/Home.svelte';
import Settings from './routes/Settings.svelte';

routes.set({
	'/': Home,
	'/settings/': Settings
});

export default new App({ target: document.body });
