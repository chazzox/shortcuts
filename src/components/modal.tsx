import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import { addNewItem, editItem } from '@app/redux/gridReducer';
import type { AppDispatch, RootState } from '@app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@app/redux/modalReducer';
import { Button } from './styled';

const InputWrapper = styled.div`
	& > h2 {
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		font-weight: bold;
	}
	& > p {
		color: rgba(255, 255, 255, 0.6);
	}
`;

const TextInput = styled.input`
	display: block;
	padding: 8px;
	color: ${(props) => props.theme.colors.tertiaryText};
	padding: 4px;
	color: #47474a;
	font-size: 20px;
	border-radius: 8px;
	border: none;
	&:focus {
		outline: none;
	}
`;

const Input: React.FC<{
	name: string;
	description: string;
	placeholder: string;
	value: string;
	update: (arg0: string) => void;
}> = ({ name, description, value, update, placeholder }) => {
	return (
		<InputWrapper>
			<h2>{name}</h2>
			<p>{description}</p>
			<TextInput
				type="text"
				value={value}
				onChange={(event) => update(event.target.value)}
				placeholder={placeholder}
			/>
		</InputWrapper>
	);
};

const Complete = styled(Button)`
	margin: 15px 0px;
`;

const Modal = () => {
	const dispatch = useDispatch<AppDispatch>();

	const type = useSelector((state: RootState) => state.modal.type);
	const id = useSelector((state: RootState) => state.modal.id);
	const isOpen = useSelector((state: RootState) => state.modal.isOpen);
	// eslint-disable-next-line
	const values = useSelector((state: RootState) => state.modal.values) || ['', '', ''];
	const action = useSelector((state: RootState) => state.modal.action);

	const [title, setTitle] = React.useState(values[0]);
	const [linkURL, setLinkURL] = React.useState(values[1]);
	const [iconURL, setIconURL] = React.useState(values[2]);

	const [errorMSG, setErrorMessage] = React.useState('');

	React.useEffect(() => {
		if (isOpen) {
			setTitle(values[0]);
			setLinkURL(values[1]);
			setIconURL(values[2]);
		}
	}, [values, isOpen]);

	return (
		<ReactModal
			isOpen={isOpen}
			shouldCloseOnEsc={true}
			style={{
				overlay: {
					backgroundColor: 'none',
					WebkitBackdropFilter: 'blur(8px)',
					backdropFilter: 'blur(8px)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				},
				content: {
					background: 'black',
					width: '600px',
					position: 'initial',
					borderRadius: '8px',
					border: 'none',
					height: 'fit-content'
				}
			}}
			onRequestClose={() => {
				dispatch(closeModal());
			}}>
			<h1>Add {type.toLowerCase()}!</h1>
			{type === 'BOX' ? (
				<Input
					name="Title"
					description="This is the large name above that will be displayed."
					placeholder="Box Title..."
					value={title}
					update={setTitle}
				/>
			) : (
				<>
					<Input
						name="Enter the Title of the Link"
						description="This is the name that will be displayed."
						placeholder="Link Title..."
						value={title}
						update={setTitle}
					/>
					<Input
						name="Enter the URL of the Link"
						description="This is the URL where link will go to."
						placeholder="Link URL..."
						value={linkURL}
						update={setLinkURL}
					/>
					<Input
						name="Enter the URL of the Icon"
						description="This will make your shortcut pretty."
						placeholder="Icon URL (OPTIONAL)..."
						value={iconURL}
						update={setIconURL}
					/>
				</>
			)}
			{errorMSG}
			<Complete
				onClick={() => {
					if (true) {
						if (action === 'NEW') {
							dispatch(
								addNewItem({
									type: type,
									typeContent:
										type === 'BOX'
											? { name: title, type: 'default', order: [] }
											: { name: title, linkIconUrl: iconURL, url: linkURL },
									containerId: id
								})
							);
							// dispatch(closeModal());
						} else if (action === 'EDIT') {
							dispatch(
								editItem({
									type: type,
									itemId: id,
									content: { name: title }
								})
							);
							dispatch(closeModal());
						}
					} else {
						setErrorMessage(
							'Validation failed, please make sure that all nessassaery forms are complete and match their purpose'
						);
					}
				}}>
				Apply Changes
			</Complete>
		</ReactModal>
	);
};

export default Modal;
