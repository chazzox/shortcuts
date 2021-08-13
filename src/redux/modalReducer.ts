import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateType {
	isOpen: boolean;
	type: 'BOX' | 'LINK';
	id: string;
	values?: string[];
	action: 'EDIT' | 'NEW';
}

// there might be a better way to implement this instead of using redux (maybe using a context provider?)

const ModalReducer = createSlice({
	name: 'modalReducer',

	initialState: { isOpen: false, type: 'BOX', id: '', values: ['', '', ''], action: 'NEW' } as initialStateType,
	reducers: {
		openModal(state, action: PayloadAction<Omit<initialStateType, 'isOpen'>>) {
			state.type = action.payload.type;
			state.id = action.payload.id;
			state.isOpen = true;
			action.payload.values && (state.values = action.payload.values);
			state.action = action.payload.action;
		},
		closeModal(state) {
			state.isOpen = false;
			state.values = ['', '', ''];
		}
	}
});

export const { openModal, closeModal } = ModalReducer.actions;

export default ModalReducer;
