import React, { useEffect } from 'react';
import GridLayout from 'react-grid-layout';

import 'stylesheets/componentStyles/grid.scss';
import GoodButton from './GoodButton';

const Shortcuts = () => {
	let layout = [
		{ i: 'a', x: 0, y: 0, w: 1, h: 2 },
		{ i: 'b', x: 1, y: 0, w: 3, h: 2 },
		{ i: 'c', x: 4, y: 0, w: 1, h: 2 }
	];

	return (
		<div className="appContainer">
			<GoodButton
				text="Add New"
				type="small"
				onPress={() =>
					(layout = [
						...layout,
						...[
							{
								i: 'n' + layout.length,
								x: Infinity,
								y: Infinity, // puts it at the bottom
								w: 2,
								h: 2
							}
						]
					])
				}
			/>
			<div id="dndContainer">
				<GridLayout className="layout" layout={layout} cols={12} rowHeight={15} width={document.body.clientWidth}>
					{layout.map(({ i }) => (
						<div className="box" key={i}>
							{i}
						</div>
					))}
				</GridLayout>
			</div>
		</div>
	);
};

export default Shortcuts;
