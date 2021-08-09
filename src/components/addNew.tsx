import React from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

import Plus from 'assets/plus.png';
import { addBox, addLink } from 'redux/gridReducer';
import store, { AppDispatch } from 'redux/store';

const AddButton = styled.button`
	height: 50px;
	width: 50px;
	border-radius: 25px;
	background: white;
	transition: width 0.1s ease-in;
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
	transition: transform 0.1s ease-in;
	height: 80%;
	align-self: center;
`;

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
	color: ${(props) => props.theme.color.tertiaryTextColor};
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

type ModalProps = React.FC<{
	containerId: string;
	closeModal: () => void;
}>;

const BoxModal: ModalProps = ({ closeModal, containerId }) => {
	const [boxName, setBoxName] = React.useState('');
	const dispatch: AppDispatch = store.dispatch;
	return (
		<>
			<Input
				name="Title"
				description="This is the large name above that will be displayed."
				placeholder="Box Title..."
				value={boxName}
				update={setBoxName}
			/>
			<Complete
				onClick={() => {
					dispatch(addBox({ name: boxName, type: 'defauls', columnId: containerId }));
					closeModal();
				}}>
				Apply Changes
			</Complete>
		</>
	);
};

const LinkModal: ModalProps = ({ closeModal, containerId }) => {
	const [linkTitle, setLinkTitle] = React.useState('');
	const [linkURL, setLinkURL] = React.useState('');
	const [iconURL, setIconURL] = React.useState('');

	const dispatch: AppDispatch = store.dispatch;

	return (
		<>
			<Input
				name="Enter the Title of the Link"
				description="This is the name that will be displayed."
				placeholder="Link Title..."
				value={linkTitle}
				update={setLinkTitle}
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
			<Complete
				onClick={() => {
					dispatch(addLink({ name: linkTitle, linkIconUrl: iconURL, url: linkURL, boxId: containerId }));
					closeModal();
				}}>
				Apply Changes
			</Complete>
		</>
	);
};

const Complete = styled.button`
	background-color: ${(props) => props.theme.color.primaryColor};
	border: none;
	padding: 8px;
	font-size: 15px;
	margin: 15px 0px;
	border-radius: 8px;
	transition: background-color 0.1s ease-in;
	&:hover {
		background-color: ${(props) => props.theme.color.primaryColorInv};
		color: ${(props) => props.theme.color.darkText};
	}
`;

const AddNewItem: React.FC<{ type: 'BOX' | 'LINK'; containerId: string }> = ({ type, containerId }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const closeModal = () => {
		setIsOpen(false);
	};
	return (
		<>
			<AddButton
				onClick={() => {
					setIsOpen(!isOpen);
				}}>
				<PlusPng src={Plus} />
			</AddButton>
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
				onRequestClose={closeModal}>
				<h1>Add {type.toLowerCase()}!</h1>
				{type === 'BOX' ? (
					<BoxModal closeModal={closeModal} containerId={containerId} />
				) : (
					<LinkModal closeModal={closeModal} containerId={containerId} />
				)}
			</ReactModal>
		</>
	);
};

export default AddNewItem;
