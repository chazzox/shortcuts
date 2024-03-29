export const URLregex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

export const defaults: Config = {
	links: {
		'link-0': {
			id: 'link-0',
			name: 'personal website',
			url: 'https://chazzox.github.io',
			linkIconUrl: 'https://chazzox.github.io/favicon.ico'
		},
		'link-1': {
			id: 'link-1',
			name: 'github repo',
			url: 'https://github.com/chazzox/shortcuts',
			linkIconUrl: 'https://i.imgur.com/qmi1Nb7.png'
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

export const empty: Config = { links: {}, boxes: {}, columns: {}, columnOrder: [] };

export const validation = {
	// goes through a list of variables and returns whether or not any of the variables passed are empty
	isEmpty: (param: any[]) => {
		let isEmpty = false;
		// iterating through list and checking none are empty
		param.map((item) => {
			if (item === '' || item === undefined || item === null) {
				isEmpty = true;
				return null;
			}
			return null;
		});
		return isEmpty;
	},
	// checking that there are no duplicates within the list
	isUnique: (obj: { [s: string]: any }, param: string) => {
		const names: string[] = [];
		let isUnique = true;
		//  getting all the key names out of the object
		Object.values(obj).map((id) => names.push(id.name));
		// checking that all names are not equal to the one that we're checking it against
		names.map((name) => {
			if (name === param) {
				isUnique = false;
				return null;
			}
			return null;
		});
		return isUnique;
	},
	// checking that a string is within a specified range
	withinRange: (lowerRng: number, upperRng: number, param: number) => {
		// checking that the input is within the input
		return param >= lowerRng && param <= upperRng;
	},
	// making sure that a list of urls are valid
	isURL: (params: any[]) => {
		let isValid = true;
		params.map((url) => {
			if (!URLregex.test(url)) {
				isValid = false;
				return null;
			}
			return null;
		});
		return isValid;
	}
};

export async function getImage() {
	const collectionId = 317099;
	const request = await window.fetch(
		`https://api.unsplash.com/collections/${collectionId}/photos?page=2&per_page=20&orientation=landscape`,
		{
			method: 'GET',
			headers: {
				Authorization: 'Client-ID 9657b2982a53f8bf4b567fe7899da7354456296f0d91a2f918a1bbcfec8a021e'
			}
		}
	);
	const results = await request.json();
	return results[Math.floor(Math.random() * results.length)].urls.regular;
}

export function cleanupURL(url: string) {
	url = url.replace(/(.*?:\/\/)|(www\.)/g, '').replace(/\/.*/, '');
	return url;
}
