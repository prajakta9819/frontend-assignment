import React from "react";

function DeleteModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Confirm Delete</h2>
        </div>
        <div className="modal-body">
          <h4>Are you sure you want to delete {props.friend.name}?</h4>
        </div>
        <div className="modal-footer">
          <button
            className="modal-yes"
            onClick={() => props.handleDelete(props.friend.id)}
          >
            Yes
          </button>
          <button className="modal-no" onClick={props.onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
