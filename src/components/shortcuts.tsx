import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';

import './shortcuts.scss';
import './dndStyles.scss';

const ReactGridLayout = WidthProvider(RGL);

const App: React.FC = () => {
	const isEditMode = true;

	const oneByOne = 120;
	const columnCount = Math.floor(window.innerWidth / (oneByOne * 4));

	const layout = [
		{ i: 'a', x: 0, y: 0, w: 1, h: 1 },
		{ i: 'b', x: 1, y: 0, w: 3, h: 2 },
		{ i: 'c', x: 4, y: 0, w: 1, h: 2 },
		{ i: 'd', x: 5, y: 0, w: 2, h: 4 }
	];

	return (
		<>
			<ReactGridLayout
				className="layout"
				layout={layout}
				cols={Math.floor(window.innerWidth / (oneByOne * 4)) * 4}
				rowHeight={window.innerWidth / (columnCount * 4)}
				isDraggable={isEditMode}
				isResizable={isEditMode}
				containerPadding={[0, 0]}
				margin={[0, 0]}
			>
				<div className="boxContainer" key="a">
					a
				</div>
				<div className="boxContainer" key="b">
					b
				</div>
				<div className="boxContainer" key="c">
					c
				</div>
				<div className="boxContainer" key="d">
					d
				</div>
			</ReactGridLayout>
		</>
	);
};

export default App;
