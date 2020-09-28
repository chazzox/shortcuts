const test = {
	links: {
		'link-0': {
			id: 'link-0',
			name: 'personal website',
			url: 'https://chazzox.github.io',
			linkIconUrl: 'https://chazzox.github.io/chazzox.github.io/static/media/logo.6a2b7fd3.png'
		},
		'link-1': {
			id: 'link-1',
			name: 'github repo',
			url: 'https://github.com/chazzox/shortcuts',
			linkIconUrl: 'https://imgur.com/a/kjgkQ7u'
		},
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
		}
	},
	boxes: {
		'box-1': {
			id: 'box-1',
			name: 'Social',
			type: 'default',
			order: ['link-0', 'link-1', 'link-2', 'link-3']
		},
		'box-2': {
			id: 'box-2',
			name: 'Updates',
			type: 'default',
			order: ['link-4', 'link-5', 'link-6', 'link-7']
		},
		'box-3': {
			id: 'box-3',
			name: 'Videos',
			type: 'default',
			order: ['link-8', 'link-9', 'link-10', 'link-11']
		},
		'box-4': {
			id: 'box-4',
			name: 'Cloud',
			type: 'default',
			order: ['link-12', 'link-13', 'link-14']
		}
	},
	columns: {
		'column-1': {
			id: 'column-1',
			order: ['box-1']
		},
		'column-2': {
			id: 'column-2',
			order: ['box-2']
		},
		'column-3': {
			id: 'column-3',
			order: ['box-3']
		},
		'column-4': {
			id: 'column-4',
			order: ['box-4']
		}
	},
	columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
};

export default test;
