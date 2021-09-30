import React, { useState } from "react";
import FriendName from "./FriendName";
import Pagination from "./Pagination";

function FriendList(props) {
  //Display friend list
  const [friendList, setFriendList] = useState([]);
  const [name, setName] = useState("");
  const [pageData, setPageData] = useState([]);

  //pagination
  const setPaginationData = (data) => {
    setPageData(data);
  };

  //search function
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function onSearch(event) {
    const filtered = friendList.filter((friend) =>
      friend.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSearchValue(event.target.value);
    setSearchResults(filtered);
  }

  //capitalize 1st letter of name
  const capitalize = (name) => {
    let splitted = name.split(" ");
    splitted = splitted.map(
      (str) => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
    );
    return splitted.join(" ");
  };

  //name change
  function handleChange(event) {
    setName(event.target.value);
  }

  //delete friend
  function handleDelete(id) {
    const updatedList = friendList.filter((friend) => friend.id !== id);
    setFriendList(updatedList);
  }

  //fav friend
  function handleFavorite(id) {
    const updatedList = friendList.map((friend) => {
      if (friend.id === id) {
        return {
          ...friend,
          isFavorite: !friend.isFavorite,
        };
      } else return friend;
    });
    setFriendList(updatedList);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (name !== "") {
      const friend = {
        id: friendList.length,
        name: capitalize(name),
        isFavorite: false,
      };
      const updatedList = [...friendList, friend];
      setFriendList(updatedList);
      setName("");
    }
  }

  function handleSort() {
    let sortedList = [...friendList];
    sortedList.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) {
        return -1;
      } else if (!a.isFavorite && b.isFavorite) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    setFriendList(sortedList);
  }

  return (
    <div className="wrapper">
      <div className="input-container">
        <input
          placeholder="Search Friend"
          type="text"
          value={searchValue}
          onChange={onSearch}
        />
      </div>
      <div className="info-wrapper">
        <div className="friendlist-container">
          <header>
            <h4>Friends List</h4>
            <button className="button-sort" onClick={handleSort}>
              Sort
            </button>
          </header>
          <form onSubmit={handleSubmit}>
            <input
              className="add-input"
              placeholder="Enter your Friend's name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </form>
        </div>

        {searchValue === ""
          ? pageData.map((friend) => (
              <FriendName
                key={friend.id}
                friend={friend}
                handleFavorite={handleFavorite}
                handleDelete={handleDelete}
              />
            ))
          : searchResults.map((friend) => (
              <FriendName
                key={friend.id}
                friend={friend}
                handleFavorite={handleFavorite}
                handleDelete={handleDelete}
              />
            ))}
      </div>

      <div>
        {friendList.length > 0 ? (
          <Pagination
            updateList={setPaginationData}
            list={searchValue ? searchResults : friendList}
          />
        ) : (
          <h4>No Friends to display</h4>
        )}
      </div>
    </div>
  );
}

export default FriendList;
