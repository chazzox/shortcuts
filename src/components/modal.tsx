import React from 'react';
import ReactModal from 'react-modal';

import { addNewItem, editItem } from '@app/redux/gridReducer';
import type { AppDispatch, RootState } from '@app/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@app/redux/modalReducer';

const Input: React.FC<{
	name: string;
	description: string;
	placeholder: string;
	value: string;
	update: (arg0: string) => void;
}> = ({ name, description, value, update, placeholder }) => {
	return (
		<div>
			<h2>{name}</h2>
			<p>{description}</p>
			<input type="text" value={value} onChange={(event) => update(event.target.value)} placeholder={placeholder} />
		</div>
	);
};

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
					background: 'var(--tertiaryBackground)',
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
			<button
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
							dispatch(closeModal());
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
			</button>
		</ReactModal>
	);
};

export default Modal;
