const newUser = {
	themeInfo: {
		'main-bg-color': '292c30ff',
		'nav-bg-color': '000000ff',
		'box-modal-bg-color': '2f3439ff',
		'main-text-color': 'ffffffff',
		'secondary-font-color': '000000ff'
	},

	config: {
		links: {},
		boxes: {},
		columns: {
			'column-1': {
				id: 'column-1',
				boxOrder: []
			},
			'column-2': {
				id: 'column-2',
				boxOrder: []
			},
			'column-3': {
				id: 'column-3',
				boxOrder: []
			},
			'column-4': {
				id: 'column-4',
				boxOrder: []
			}
		},
		columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
	},

	searchHistory: [],

	notes: {
		'note-1': {
			value: ''
		}
	}
};

export { newUser };
