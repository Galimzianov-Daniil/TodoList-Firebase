import React, { useReducer } from "react";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";

import axios from "axios";
import { SHOW_LOADER, REMOVE_NOTE, ADD_NOTE, FETCH_NOTES } from "../types";

const URL = process.env.REACT_APP_DB_URL;


export const FirebaseState = ({ children }) => {
    const initialState = {
        notes: [],
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    const showLoader = () => dispatch({ type: SHOW_LOADER });

    const fetchNotes = async () => {
        showLoader();
        const response = await axios.get(`${URL}/notes.json`);
        let payload = [];

        if (response.data) {
            payload = Object.keys(response.data).map(key => {
                return {
                    ...response.data[key],
                    id: key
                }
            });
        }

        dispatch({ type: FETCH_NOTES, payload });
    }

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON()
        }

        const response = await axios.post(`${URL}/notes.json`, note);
        const payload = {
            ...note,
            id: response.data.name
        }

        dispatch({ type: ADD_NOTE, payload });

    }

    const removeNote = async id => {
        await axios.delete(`${URL}/notes/${id}.json`);

        dispatch({
            type: REMOVE_NOTE,
            payload: id
        });
    }

    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            loading: state.loading,
            notes: state.notes
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}