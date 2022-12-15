import React from "react";
import CategoryForm from "./CategoryForm";
import { useDispatch, useStateContext } from "./reducer";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const [inputText, setInputText] = React.useState("");
  const state = useStateContext();
  const dispatch = useDispatch();

  function deleteCategory(id) {
    dispatch({
      type: "deleteCategory",
      id,
    });
  }

  return (
    <div>
      <Link to="/">
        <button>Manage Links</button>
      </Link>
      <CategoryForm inputText={inputText} setInputText={setInputText} />
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Edit Category</th>
            <th>Delete Category</th>
          </tr>
        </thead>
        <tbody>
          {state.categories.map((row) => (
            <tr key={row.id}>
              <td>{row.value}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setInputText(row.value);
                    dispatch({
                      type: "allowingEditing",
                      id: row.id,
                    });
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteCategory(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
