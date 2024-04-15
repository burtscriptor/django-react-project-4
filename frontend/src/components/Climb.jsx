import React from "react";
import "../styles/Note.css"

const Note = ({ climb, onDelete }) => {
    // const formattedDate = new Date(climb.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <p className="note-title">{climb.style}</p>
            <p className="note-content">{climb.goal} {climb.grade} {climb.comments}</p>
            {/* <p className="note-date">{formattedDate}</p> */}
            <button className="delete-button" onClick={() => onDelete(climb)}>
                Delete
            </button>
        </div>
    );
}

export default Note;