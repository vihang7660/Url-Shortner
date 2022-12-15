import React from "react";
import { useDispatch, useStateContext } from "./reducer";
import { nanoid } from "nanoid";

export default function CategoryForm({ inputText, setInputText }) {
  const state = useStateContext();
  const dispatch = useDispatch();

  function addCategory() {
    if (inputText) {
      dispatch({
        type: "addingCategoryType",
        id: nanoid(),
        name: inputText,
      });
      setInputText("");
    }
  }

  function editCategory(text) {
    dispatch({
      type: "editCategory",
      text,
    });
    setInputText("");
  }

  return (
    <form>
      <label htmlFor="category">Category</label>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        type="text"
        id="category"
      />
      <button
        type="button"
        onClick={() => {
          {
            if (
              state.categories.filter((category) => category.isEditing)
                .length === 0
            ) {
              addCategory();
            } else {
              editCategory(inputText);
            }
          }
        }}
      >
        {state.categories.filter((category) => category.isEditing).length === 0
          ? "Add"
          : "Edit"}
      </button>
    </form>
  );
}
