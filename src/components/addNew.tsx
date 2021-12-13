import React from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@app/redux/store';
import { openModal } from '@app/redux/modalReducer';
import Plus from '../assets/plus.png';

const AddNewItem: React.FC<{ type: 'BOX' | 'LINK'; id: string }> = (props) => {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<button
			onClick={() => {
				dispatch(openModal({ ...props, action: 'NEW' }));
			}}>
			<img src={Plus} />
		</button>
	);
};

export default AddNewItem;
