<script>
	import Cookies from 'js-cookie';
	let name = 'world';
</script>

<style lang="scss">
	#navbarContainer {
		width: 100%;
		display: flex;
		justify-content: center;
		#navbar {
			padding: 0;
			color: black;

			width: 90%;
			background-color: #070707;
			border-radius: 0px 0px 10px 10px;
			box-shadow: var(--pretty-box-shadow-dark);
			display: flex;
			justify-content: space-between;
			align-items: center;

			#searchBar {
				font-size: 15px;
				width: 70%;
				background-color: var(--background-major);
				color: var(--light-font-color);
				border-radius: 10px;
				border: none;
				padding: 5px 10px;
				&:focus {
					outline: none;
				}
			}
			a {
				text-decoration: none;
				color: var(--light-font-color);
				margin: 10px;
				font-size: 25px;
			}
		}
	}
</style>

<main id="navbarContainer">
	<main id="navbar">
		<a href="#/" class="nav-item title left">Shortcuts</a>
		<input class="nav-item icon" id="searchBar" type="text" bind:value={name} />
		<button
			class="nav-item"
			on:click={() => Object.keys(Cookies.get()).forEach(function (cookieName) {
					Cookies.remove(cookieName);
				})}>clear</button>
		<a href="#/settings/"><img src="" alt="" /><img src="images/controls.svg" alt="" width="30px" height="30px" /> </a>
	</main>
</main>
