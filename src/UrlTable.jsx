import React from "react";
import { useStateContext } from "./reducer";
import { useDispatch } from "./reducer";
import unChecked from "./assets/bookmarkUnchecked.png";
import checked from "./assets/bookmarkChecked.png";

export default function UrlTable() {
  const state = useStateContext();
  const dispatch = useDispatch();

  function incrementCount(id) {
    dispatch({
      type: "incrementingCount",
      id,
    });
  }

  function pinningUrl(id) {
    dispatch({
      type: "pinningUrl",
      id,
    });
  }

  function unPin(id) {
    dispatch({
      type: "unpinUrl",
      id,
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pin</th>
            <th>Original URL</th>
            <th>Short</th>
            <th>Count</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {state.urlList.map((row) => (
            <tr key={row.id}>
              <td>
                <img
                className="bookmark"
                  onClick={() => {
                    if (row.pin) {
                      unPin(row.id);
                    } else {
                      pinningUrl(row.id);
                    }
                  }}
                  src={row.pin ? checked : unChecked}
                  alt="bookmark"
                />
              </td>
              <td>
                <a
                  href={row.original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.original}
                </a>
              </td>
              <td onClick={() => incrementCount(row.id)}>
                <a
                  href={row.original}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.short}
                </a>
              </td>
              <td>{row.count}</td>
              <td>
                <form>
                  <select
                    value={row.category}
                    onChange={(event) =>
                      dispatch({
                        type: "addingCategory",
                        category: event.target.value,
                        id: row.id,
                      })
                    }
                    id="amount"
                    name="amount"
                  >
                    {state.categories.map((category) => (
                      <option key={category.id} value={category.value}>
                        {category.value}
                      </option>
                    ))}
                  </select>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
