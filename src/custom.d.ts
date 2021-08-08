interface Config {
	links: { [key: string]: LinkType };
	boxes: { [key: string]: BoxType };
	columns: { [key: string]: ColumnType };
	columnOrder: string[];
}

interface BoxType {
	id: string;
	name: string;
	type: string;
	order: string[];
	widgetType?: string;
	noteId?: string;
}

interface ColumnType {
	id: string;
	order: string[];
}

interface LinkType {
	id: string;
	name: string;
	url: string;
	linkIconUrl: string;
}
