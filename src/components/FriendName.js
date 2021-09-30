import React, { useState } from "react";
import DeleteModal from "./DeleteModal";

function FriendName(props) {
  //display Delete Modal
  const [show, setShow] = useState(false);

  return (
    <div className="container">
      <div className="info">
        <h4 className="title">{props.friend.name}</h4>
        <p id="subtitle">is your friend</p>
      </div>
      <div className="button-container">
        <button
          className="favorite-button"
          onClick={() => props.handleFavorite(props.friend.id)}
        >
          {props.friend.isFavorite ? (
            <i className="ri-star-fill"></i>
          ) : (
            <i className="ri-star-line"></i>
          )}
        </button>
        <button
          className="delete-button"
          // onClick={() => props.handleDelete(props.friend.id)}
          onClick={() => setShow(true)}
        >
          {<i className="ri-delete-bin-line"></i>}
        </button>
        <DeleteModal
          show={show}
          onClose={() => setShow(false)}
          friend={props.friend}
          handleDelete={props.handleDelete}
        />
      </div>
    </div>
  );
}

export default FriendName;
