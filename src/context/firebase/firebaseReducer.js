import { SHOW_LOADER, FETCH_NOTES, ADD_NOTE, REMOVE_NOTE } from "../types";

const handlers = {
    [SHOW_LOADER]: state => ({ ...state, loading: true }),
    [ADD_NOTE]: (state, { payload }) => ({ ...state, notes: [...state.notes, payload] }),
    [FETCH_NOTES]: (state, { payload }) => ({ ...state, notes: payload, loading: false }),
    [REMOVE_NOTE]: (state, { payload }) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    DEFUALT: state => state
}


export const firebaseReducer = (state, action) => {

    const handle = handlers[action.type] || handlers.DEFUALT;

    return handle(state, action)

}