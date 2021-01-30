<div class="pageTitle">
	<h1>Settings</h1>
</div>
<div class="settingsBoxContainer">
	<div class="setting">
		<span class="settingBoxTitle">Colors</span>
		<div class="settingBoxContent">Customisation to be written</div>
	</div>
	<div class="setting">
		<span class="settingBoxTitle">Linked Accounts</span>
		<div class="settingBoxContent">Widget Accounts to appear hear shortly</div>
	</div>
	<div class="setting">
		<span class="settingBoxTitle">Backup/Import</span>
		<div class="settingBoxContent">Upload a new config or download your current one here</div>
	</div>
	<div class="setting">
		<span class="settingBoxTitle">Cookies/Local storage</span>
		<div class="settingBoxContent">
			Vew/Delete your stored cookies/Local storage (delting your local storage will remove your config), Deleting
			cookies will mean you will have to login to your connected accounts again (probably)
		</div>
	</div>
</div>

<style lang="scss">
	.pageTitle {
		display: flex;
		justify-content: center;
		& > h1 {
			color: var(--light-font-color);
		}
	}
	.settingsBoxContainer {
		display: flex;

		flex-direction: row;
		flex-flow: wrap;
		justify-content: space-evenly;

		.setting {
			margin: 10px;
			flex: 0 1 540px;
			color: var(--light-font-color);
			background-color: var(--background-major);
			padding: 10px;
			height: calc(100vh * 0.25);
			border-radius: 15px;
			box-shadow: var(--pretty-box-shadow-dark);
			display: flex;
			flex-direction: column;

			.settingBoxTitle {
				text-align: center;
				font-size: 20px;
				font-weight: 600;
			}
			.settingBoxContent {
				padding: 15px;
			}
		}
	}
</style>
