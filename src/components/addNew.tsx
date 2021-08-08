import React from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

import Plus from '../assets/plus.png';

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

const InputWrapper = styled.div``;

const Input: React.FC<{
	name: string;
	description: string;
	placeholder: string;
	value: string;
	update: () => void;
}> = ({ name, description, value, update, placeholder }) => {
	return (
		<InputWrapper>
			<h2>{name}</h2>
			<span>{description}</span>
			<input type="text" value={value} onChange={update} placeholder={placeholder} />
		</InputWrapper>
	);
};

const Complete = styled.button``;

const AddNewItem: React.FC<{ type: 'BOX' | 'LINK' }> = ({ type }) => {
	const [isOpen, setIsOpen] = React.useState(false);

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
					setIsOpen(false);
				}}>
				<h1>Add {type.toLowerCase()}!</h1>
				{type === 'BOX' ? (
					<Input
						name="Title"
						description="This is the large name above that will be displayed."
						placeholder="Box Title..."
						value="test"
						update={() => {}}
					/>
				) : (
					<>
						<Input
							name="Enter the Title of the Link"
							description="This is the name that will be displayed."
							placeholder="Link Title..."
							value="test"
							update={() => {}}
						/>
						<Input
							name="Enter the URL of the Link"
							description="This is the URL where link will go to."
							placeholder="Link URL..."
							value="test"
							update={() => {}}
						/>
						<Input
							name="Enter the URL of the Icon"
							description="This will make your shortcut pretty."
							placeholder="Icon URL (OPTIONAL)..."
							value="test"
							update={() => {}}
						/>
					</>
				)}
				<Complete>Apply Changes</Complete>
			</ReactModal>
		</>
	);
};

export default AddNewItem;
