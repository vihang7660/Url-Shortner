import React from "react";
import UrlForm from "./UrlForm";
import UrlTable from "./UrlTable";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <h1>URL SHORTNER</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route path="category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
