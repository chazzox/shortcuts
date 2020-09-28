export interface Config {
	links: { [key: string]: Link };
	boxes: { [key: string]: Box };
	columns: { [key: string]: Column };
	columnOrder: string[];
}

export interface Box {
	id: string;
	name: string;
	type: string;
	order?: string[];
	widgetType?: string;
	noteId?: string;
}

export interface Column {
	id: string;
	order: string[];
}

export interface Link {
	id: string;
	name: string;
	url: string;
	linkIconUrl: string;
}
