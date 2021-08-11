import React from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

import Plus from 'assets/plus.png';
import { addNew } from 'redux/gridReducer';
import store, { AppDispatch } from 'redux/store';
// import { validation } from 'utils';

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

const Complete = styled.button`
	background-color: ${(props) => props.theme.colors.secondaryBackground};
	border: none;
	padding: 8px;
	font-size: 15px;
	margin: 15px 0px;
	border-radius: 8px;
	transition: background-color 0.1s ease-in;
	&:hover {
		background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
		color: ${(props) => props.theme.colors.primaryText};
	}
`;

const AddNewItem: React.FC<{ type: 'BOX' | 'LINK'; containerId: string }> = ({ type, containerId }) => {
	const dispatch: AppDispatch = store.dispatch;

	const [title, setTitle] = React.useState('');
	const [linkURL, setLinkURL] = React.useState('');
	const [iconURL, setIconURL] = React.useState('');

	const [errorMSG, setErrorMessage] = React.useState('');
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
							dispatch(
								addNew({
									type: type,
									typeContent:
										type === 'BOX'
											? { name: title, type: 'default', order: [] }
											: { name: title, linkIconUrl: iconURL, url: linkURL },
									containerId: containerId
								})
							);
							closeModal();
						} else {
							setErrorMessage(
								'Validation failed, please make sure that all nessassaery forms are complete and match their purpose'
							);
						}
					}}>
					Apply Changes
				</Complete>
			</ReactModal>
		</>
	);
};

export default AddNewItem;
