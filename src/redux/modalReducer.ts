import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateType {
	isOpen: boolean;
	type: 'BOX' | 'LINK';
	containerId: string;
}

const ModalReducer = createSlice({
	name: 'modalReducer',

	initialState: { isOpen: false, type: 'BOX', containerId: '' } as initialStateType,
	reducers: {
		openModal(
			state,
			action: PayloadAction<{
				type: 'BOX' | 'LINK';
				containerId: string;
			}>
		) {
			state.type = action.payload.type;
			state.containerId = action.payload.containerId;
			state.isOpen = true;
		},
		closeModal(state) {
			state.isOpen = false;
		}
	}
});

export const { openModal, closeModal } = ModalReducer.actions;

export default ModalReducer;
