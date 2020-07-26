import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { AlertContext } from "../context/alert/alertContext";

export const Alert = () => {

    const { alert, hide } = useContext(AlertContext);
    const className = `alert alert-${alert.type || "warning"} alert-dismissible`;

    return (
        <CSSTransition
            in={alert.visible}
            timeout={750}
            classNames={"alert"}
            mountOnExport
            unmountOnExit
        >
            <div className={className + " mt-2"} role="alert">

                <strong>Внимание! - </strong> {alert.text}

                <button onClick={hide} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    )



}