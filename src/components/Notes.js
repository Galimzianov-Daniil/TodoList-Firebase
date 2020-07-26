import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const Notes = ({ notes, onRemove }) => {

    return (
        <TransitionGroup component="ul" className="list-group mt-2">

            {notes.map(note => (

                <CSSTransition key={note.id} classNames={"note"} timeout={800}>
                    <li className="list-note list-group-item">

                        <div>
                            <strong className="mr-2">{note.title}</strong>
                            <span>{note.date}</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => onRemove(note.id)}
                            className="btn btn-danger btn-sm">&times;</button>

                    </li>
                </CSSTransition>

            ))}


        </TransitionGroup>
    )

}