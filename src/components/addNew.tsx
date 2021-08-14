import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@app/redux/store';
import { openModal } from '@app/redux/modalReducer';
import Plus from '../assets/plus.png';

const AddButton = styled.button`
	height: 40px;
	width: 40px;
	border-radius: 25px;
	background: white;
	transition: width 0.3s ease;
	border: none;
	cursor: pointer;
	padding: 0;
	align-self: center;
	display: flex;
	justify-content: center;
	&:hover {
		width: 100%;
		& > img {
			transform: rotate(90deg);
		}
	}
`;

const PlusPng = styled.img`
	transition: transform 0.3s ease;
	height: 80%;
	align-self: center;
`;

const AddNewItem: React.FC<{ type: 'BOX' | 'LINK'; id: string }> = (props) => {
	const dispatch = useDispatch<AppDispatch>();
	return (
		<AddButton
			onClick={() => {
				dispatch(openModal({ ...props, action: 'NEW' }));
			}}>
			<PlusPng src={Plus} />
		</AddButton>
	);
};

export default AddNewItem;
