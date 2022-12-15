import React from "react";
import { useDispatch } from "./reducer";
import { nanoid } from "nanoid";

export default function UrlForm() {
  const [inputText, setInputText] = React.useState("");
  const dispatch = useDispatch();

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function shortenUrl() {
    if (inputText) {
      dispatch({
        type: "addUrl",
        id: nanoid(),
        short: nanoid().slice(0, 8),
        original: inputText,
      });
      setInputText("");
    }
  }

  return (
    <form>
      <label htmlFor="url">URL</label>
      <input
        value={inputText}
        onChange={handleChange}
        name="url"
        type="text"
        id="url"
      />
      <button onClick={shortenUrl} type="button">
        Shrink
      </button>
    </form>
  );
}
