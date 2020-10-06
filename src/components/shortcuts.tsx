import React, { useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

import './shortcuts.scss';
import './dndStyles.scss';

const ReactGridLayout = WidthProvider(RGL);

const App = () => {
	const isEditMode = true;

	const oneByOne = 120;
	const columnCount = Math.floor(window.innerWidth / (oneByOne * 4));

	const [layout, setLayout] = useState([
		{ i: 'a', x: 0, y: 0, w: 1, h: 1 },
		{ i: 'b', x: 1, y: 0, w: 3, h: 2 },
		{ i: 'c', x: 4, y: 0, w: 1, h: 2 },
		{ i: 'd', x: 5, y: 0, w: 2, h: 4 }
	]);

	const [layoutContent, setLayoutContent] = useState([
		{ content: 'name jeff', id: 'a' },
		{ content: 'name 1', id: 'b' },
		{ content: 'name ', id: 'c' },
		{ content: 'my name jeff', id: 'd' }
	]);

	const addNew = () => {
		const key = `${layout.length}`;
		setLayout(
			layout.concat({
				i: key,
				x: (layout.length * 2) % (Math.floor(window.innerWidth / (oneByOne * 4)) * 4),
				y: Infinity,
				w: 3,
				h: 1
			})
		);
		setLayoutContent(layoutContent.concat({ id: key, content: 'kek: ' + key }));
	};

	return (
		<>
			<button onClick={() => addNew()}>add</button>
			<ReactGridLayout
				className="layout"
				layout={layout}
				cols={Math.floor(window.innerWidth / (oneByOne * 4)) * 4}
				rowHeight={window.innerWidth / (columnCount * 4)}
				isDraggable={isEditMode}
				isResizable={isEditMode}
				containerPadding={[0, 0]}
				margin={[0, 0]}
				onLayoutChange={(newLayout) => setLayout(newLayout as (RGL.Layout & { content: { text: string } })[])}
			>
				{layoutContent.map(({ content, id }) => (
					<span className="boxContainer" key={id}>
						{content}
					</span>
				))}
			</ReactGridLayout>
		</>
	);
};

export default App;
