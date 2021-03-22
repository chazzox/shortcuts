<script>
	import Cookies from 'js-cookie';
	import Auth from '../store/gridMode';
	let blankSelected = true;
</script>

<div class="center">
	<div id="tutorialBox">
		<h1>Shortcuts - A New Page Replacement</h1>
		<h3>What is this site for?</h3>
		<span>
			Basically just a place for you to chuck a bunch of links you use frequently so that you have an easy place to
			access them. This might eventually become a chome extention, but until then i recomend just setting it as the new
			tab site in your browsers settings</span>
		<h3>Select preset:</h3>
		<div id="presetContainer">
			<div class={blankSelected ? 'presetButton selected' : 'presetButton'}>
				<img
					src="images/blank.png"
					alt=""
					on:click={() => {
						blankSelected = true;
					}} />
				<span>Blank</span>
			</div>
			<div class={!blankSelected ? 'presetButton selected' : 'presetButton'}>
				<img
					src="images/default.png"
					alt=""
					on:click={() => {
						blankSelected = false;
					}} />
				<span>Default</span>
			</div>
		</div>
		<button
			class="genButton small"
			on:click={() => {
				Cookies.set('hasConfig', true, { expires: 365, sameSit: 'strict' });
				Auth.setIsNew(true);
			}}>
			Continue
		</button>
	</div>
</div>

<style lang="scss">
	#tutorialBox {
		color: var(--light-font-color);
		width: 50%;
		border-radius: 15px;
		padding: 15px;
		background-color: var(--background-major);
		text-align: center;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
			rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
		#presetContainer {
			display: flex;
			justify-content: center;
		}
		min-width: 600px;
		button {
			width: 200px;
			height: 50px;
			border: 1px solid rgba(94, 91, 91, 0.3);
			background: transparent;
			cursor: pointer;
			transition: all 0.5s;
			font-size: 15px;
			color: var(--light-font-color);
			&:hover {
				border: 1px solid #7c7c7c;
			}
		}
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.presetButton {
		padding: 10px;
		margin: 15px 25px;
		display: inline-grid;
		> img {
			border: 2px solid hsla(0, 0%, 100%, 0);
			border-radius: 15px;
			height: 120px;
			&:hover {
				cursor: pointer;
			}
		}
		&.selected > img {
			border: 2px solid #51a0d5 !important;
		}
	}
</style>
