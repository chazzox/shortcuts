import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateType {
	isOpen: boolean;
	type: 'BOX' | 'LINK';
	containerId: string;
	values: string[];
}

const ModalReducer = createSlice({
	name: 'modalReducer',

	initialState: { isOpen: false, type: 'BOX', containerId: '', values: ['', '', ''] } as initialStateType,
	reducers: {
		openModal(state, action: PayloadAction<{ type: 'BOX' | 'LINK'; containerId: string; values?: string[] }>) {
			state.type = action.payload.type;
			state.containerId = action.payload.containerId;
			state.isOpen = true;
			action.payload.values && (state.values = action.payload.values);
		},
		closeModal(state) {
			state.isOpen = false;
			state.values = ['', '', ''];
		}
	}
});

export const { openModal, closeModal } = ModalReducer.actions;

export default ModalReducer;
