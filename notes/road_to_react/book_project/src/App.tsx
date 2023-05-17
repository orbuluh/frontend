import "./App.css";
import React, { Component, useCallback, useState } from "react";
import axios from "axios";

const Details = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span />
      <span>{item.author}</span>
      <span>
        <button type="button" onClick={onRemoveItem.bind(null, item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

const Listify = ({ itemsToList, onRemoveItem }) => (
  <ul>
    {itemsToList.map((item) => (
      <Details key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const useLocalStorageState = (key, initialStateVal) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialStateVal
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id}>
        {label}
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

function App() {
  const storiesReducer = (state, action) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "STORIES_FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case "REMOVE_STORY":
        return {
          ...state,
          data: state.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
    }
  };

  const [stories, dispatchStoriesState] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [searchTerm, setSearchTerm] = useLocalStorageState("search", "");

  const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (vent) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleFetchStories = React.useCallback(async () => {
    dispatchStoriesState({ type: "STORIES_FETCH_INIT" });

    try {
      const result = await axios.get(url);
      dispatchStoriesState({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits, //axios put payload in .data
      });
    } catch {
      dispatchStoriesState({
        type: "STORIES_FETCH_FAILURE",
      });
    }
    // as now we need to re-redner when url change, and url only change when
    // handleSearchSubmit
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStoriesState({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  return (
    <>
      <h1>Viewer</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused // using isFocused as an attribute == `isFocused={true}`.
        onInputChange={handleSearchInput}
      >
        <strong>!!!!!!</strong>
      </InputWithLabel>
      <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>
        Submit
      </button>
      <hr />
      {stories.isError && <p>Something went wrong while loading...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <Listify itemsToList={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </>
  );
}

export default App;
