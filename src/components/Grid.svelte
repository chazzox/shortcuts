<script lang="typescript">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import gridMode from '../store/gridMode';

	function prettierLink(url: string) {
		return url.replace(/(.*?:\/\/)|(www\.)/g, '').replace(/\/.*/, '');
	}

	let links: { [key: string]: { id: string; name: string; url: string; linkIconUrl: string } } = {
		'link-2': {
			id: 'link-2',
			name: 'Reddit',
			url: 'https://www.reddit.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/reddit.png'
		},
		'link-3': {
			id: 'link-3',
			name: 'Steam',
			url: 'https://store.steampowered.com/',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/steam.png'
		},
		'link-4': {
			id: 'link-4',
			name: 'Instagram',
			url: 'https://www.Instagram.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/instagram.png'
		},
		'link-5': {
			id: 'link-5',
			name: 'Inbox',
			url: 'https://www.mail.google.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/inbox.png'
		},
		'link-6': {
			id: 'link-6',
			name: 'Discord',
			url: 'https://www.discord.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/discord.png'
		},
		'link-7': {
			id: 'link-7',
			name: 'Imgur',
			url: 'https://www.imgur.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/imgur.png'
		},
		'link-8': {
			id: 'link-8',
			name: 'Rust Dev Log',
			url: 'https://www.facepunch.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/rust.png'
		},
		'link-9': {
			id: 'link-9',
			name: 'PUBG News',
			url: 'https://www.playbattlegrounds.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/pubg.png'
		},
		'link-10': {
			id: 'link-10',
			name: 'CS:GO Path Notes',
			url: 'https://www.blog.counter-strike.net/index.php/category/updates/',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/csgo.png'
		},
		'link-11': {
			id: 'link-11',
			name: 'Youtube',
			url: 'https://www.youtube.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/youtube.png'
		},
		'link-12': {
			id: 'link-12',
			name: 'Twitch',
			url: 'https://www.twitch.tv',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/twitch.png'
		},
		'link-13': {
			id: 'link-13',
			name: 'Netflix',
			url: 'https://www.netflix.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/netflix.png'
		},
		'link-14': {
			id: 'link-14',
			name: 'Channel4',
			url: 'https://www.channel4.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/channel4.png'
		},
		'link-15': {
			id: 'link-15',
			name: 'BBC iPlayer',
			url: 'https://www.bbc.co.uk/iplayer',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/iplayer.png'
		},
		'link-16': {
			id: 'link-16',
			name: 'Twitter',
			url: 'https://www.twitter.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/twitter.png'
		},
		'link-17': {
			id: 'link-17',
			name: 'Icloud',
			url: 'https://www.icloud.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/icloud.png'
		},
		'link-18': {
			id: 'link-18',
			name: 'PCPartPicker',
			url: 'https://www.PCPartPicker.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/partpicker.png'
		},
		'link-19': {
			id: 'link-19',
			name: 'MediaFire',
			url: 'https://www.mediafire.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/mediafire.png'
		},
		'link-20': {
			id: 'link-20',
			name: 'Speedtest',
			url: 'https://www.Speedtest.net',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/speedtest.png'
		},
		'link-21': {
			id: 'link-21',
			name: 'FileMail',
			url: 'https://www.FileMail.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/filemail.png'
		},
		'link-22': {
			id: 'link-22',
			name: 'Goo.gl',
			url: 'https://www.Goo.gl',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/googleshort.png'
		},
		'link-23': {
			id: 'link-23',
			name: 'TempMail',
			url: 'https://www.TempMail.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/tempmail.png'
		},
		'link-24': {
			id: 'link-24',
			name: 'nationwide',
			url: 'https://www.LLoydsBank.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/llyods.png'
		},
		'link-25': {
			id: 'link-25',
			name: 'Amazon',
			url: 'https://www.Amazon.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/amazon.png'
		},
		'link-26': {
			id: 'link-26',
			name: 'PayPal',
			url: 'https://www.PayPal.com',
			linkIconUrl: 'https://pinpal.github.io/shortcuts/icons/paypal.png'
		}
	};

	let boxes: { [key: string]: { id: string; name: string; type: string; linkOrder: string[] } } = {
		'box-1': {
			id: 'box-1',
			name: 'Social',
			type: 'default',
			linkOrder: ['link-2', 'link-3', 'link-4', 'link-5', 'link-6', 'link-7', 'link-8']
		},
		'box-2': {
			id: 'box-2',
			name: 'Updates',
			type: 'default',
			linkOrder: ['link-9', 'link-10', 'link-11']
		},
		'box-3': {
			id: 'box-3',
			name: 'Videos',
			type: 'default',
			linkOrder: ['link-12', 'link-13', 'link-14', 'link-15', 'link-16']
		},
		'box-5': {
			id: 'box-5',
			name: 'Cloud',
			type: 'default',
			linkOrder: ['link-17', 'link-18']
		},
		'box-6': {
			id: 'box-6',
			name: 'Utilities',
			type: 'default',
			linkOrder: ['link-19', 'link-20', 'link-21', 'link-22']
		},
		'box-7': {
			id: 'box-7',
			name: 'Shopping',
			type: 'default',
			linkOrder: ['link-23', 'link-24', 'link-25', 'link-26']
		}
	};

	let columns = [
		{
			id: 'column-1',
			boxOrder: ['box-1']
		},
		{
			id: 'column-2',
			boxOrder: ['box-3', 'box-5']
		},
		{
			id: 'column-3',
			boxOrder: ['box-6', 'box-2']
		},
		{
			id: 'column-4',
			boxOrder: ['box-7']
		}
	];

	const flipDurationMs = 50;

	function finaliseDrag(event: drag) {
		console.log(event);
	}

	function considerDrag(event: drag) {
		// console.log(event);
	}
</script>

<div class="board">
	{#each columns as column (column.id)}
		<div
			class="column"
			use:dndzone={{
				items: column.boxOrder.map((boxId) => boxes[boxId]),
				flipDurationMs,
				dragDisabled: $gridMode.dragDisabled
			}}
			on:consider={(e) => considerDrag(e)}
			on:finalize={(e) => finaliseDrag(e)}>
			{#each column.boxOrder.map((boxId) => boxes[boxId]) as box (box.id)}
				<div class="box" animate:flip={{ duration: flipDurationMs }}>
					<span class="boxTitle">{box.name}</span>
					<div
						class="boxContent"
						use:dndzone={{
							items: boxes[box.id].linkOrder.map((linkId) => links[linkId]),
							flipDurationMs,
							dragDisabled: true
						}}
						on:consider={(e) => considerDrag(e)}
						on:finalize={(e) => finaliseDrag(e)}>
						{#each box.linkOrder.map((linkId) => links[linkId]) as link (link.id)}
							<a href={link.url} animate:flip={{ duration: flipDurationMs }} class="rowitem">
								<div class="columnbox lefticons">
									<img class="appicon" src={link.linkIconUrl} alt="" />
								</div>
								<div class="columnbox rightwords">
									<div class="linkName">{link.name}</div>
									<div class="appurl">{prettierLink(link.url)}</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.board {
		height: 90vh;
		width: 100%;
		padding: 0.5em;
		display: flex;
		justify-content: space-around;
		&:focus {
			outline: none;
		}
		> .column {
			flex: 1;
			padding: 0.5em;
		}
	}

	.box,
	.boxContent,
	.column,
	.rowitem {
		outline: none !important;
	}

	.box {
		margin-top: 25px;
		.boxTitle {
			margin-bottom: 1em;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
		}
		.boxContent {
			margin: 10px;
			color: var(--light-font-color);
			background-color: var(--background-major);
			padding: 10px;
			border-radius: 15px;
			box-shadow: var(--pretty-box-shadow-dark);
		}
	}

	/*App Icons*/
	.appicon {
		display: inline-block;
		vertical-align: top;
		width: 50%;
		height: 50%;
		transition: all 0.3s ease;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		-ms-transition: all 0.3s ease;
	}
	/*App Names*/
	.linkName {
		color: white;
		font-size: 18px;
		margin-top: 10px;
		transition: all 0.3s ease;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		-ms-transition: all 0.3s ease;
	}
	/*App URL*/
	.appurl {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0px;
		opacity: 0;
		transition: all 0.3s ease;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		-ms-transition: all 0.3s ease;
	}

	/*Fancy Animation for rows of apps*/
	.rowitem {
		transition: all 0.3s ease;
		-webkit-transition: all 0.3s ease;
		-moz-transition: all 0.3s ease;
		-o-transition: all 0.3s ease;
		-ms-transition: all 0.3s ease;
		&:after {
			padding: 4%;
			content: '';
			display: table;
			clear: both;
		}

		&:hover {
			margin-top: 10px;
			margin-bottom: 10px;
			.appicon {
				width: 100%;
				height: 100%;
			}

			.linkName {
				font-size: 25px;
				margin-left: 14px;
				margin-top: 0px;
			}

			.appurl {
				font-size: 18px;
				margin-left: 14px;
				opacity: 1;
			}
			.lefticons {
				width: 20%;
			}
			.rightwords {
				width: 80%;
			}
		}
	}

	/*Links*/
	.columnbox {
		float: left;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
</style>
