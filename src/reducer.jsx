import React from "react";
import { nanoid } from "nanoid";

const StateContext = React.createContext(null);
const StateDispatchContext = React.createContext(null);

export function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    reducer,
    JSON.parse(localStorage.getItem("table")) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem("table", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={state}>
      <StateDispatchContext.Provider value={dispatch}>
        {children}
      </StateDispatchContext.Provider>
    </StateContext.Provider>
  );
}
export function useStateContext() {
  return React.useContext(StateContext);
}

export function useDispatch() {
  return React.useContext(StateDispatchContext);
}

function reducer(state, action) {
  if (action.type === "addUrl") {
    return {
      ...state,
      urlList: [
        ...state.urlList,
        {
          pin: false,
          original: action.original,
          short: action.short,
          count: 0,
          id: action.id,
          category: "",
        },
      ],
    };
  } else if (action.type === "incrementingCount") {
    return {
      ...state,
      urlList: state.urlList.map((item) =>
        item.id === action.id ? { ...item, count: item.count + 1 } : item
      ),
    };
  } else if (action.type === "addingCategory") {
    return {
      ...state,
      urlList: state.urlList.map((item) =>
        item.id === action.id ? { ...item, category: action.category } : item
      ),
    };
  } else if (action.type === "addingCategoryType") {
    return {
      ...state,
      categories: [
        ...state.categories,
        { value: action.name, id: action.id, isEditing: false },
      ],
    };
  } else if (action.type === "deleteCategory") {
    return {
      ...state,
      categories: state.categories.filter(
        (category) => category.id !== action.id
      ),
    };
  } else if (action.type === "allowingEditing") {
    return {
      ...state,
      categories: state.categories.map((category) =>
        category.id === action.id
          ? { ...category, isEditing: true }
          : { ...category, isEditing: false }
      ),
    };
  } else if (action.type === "editCategory") {
    return {
      ...state,
      categories: state.categories.map((category) =>
        category.isEditing
          ? { ...category, value: action.text, isEditing: false }
          : category
      ),
    };
  } else if (action.type === "pinningUrl") {
    let uncheckedList = state.urlList.filter((url) => url.id !== action.id);
    let checkedList = state.urlList
      .filter((url) => url.id === action.id)
      .map((item) => ({ ...item, pin: true }));
    return { ...state, urlList: [...checkedList, ...uncheckedList] };
  } else if (action.type === "unpinUrl") {
    let uncheckedList = state.urlList.filter((url) => url.id !== action.id);
    let checkedList = state.urlList
      .filter((url) => url.id === action.id)
      .map((item) => ({ ...item, pin: false }));
    return { ...state, urlList: [...uncheckedList, ...checkedList] };
  }
}

const initialState = {
  urlList: [],
  categories: [
    { value: "education", isEditing: false, id: nanoid() },
    { value: "eCommerce", isEditing: false, id: nanoid() },
    { value: "blog", isEditing: false, id: nanoid() },
  ],
};
