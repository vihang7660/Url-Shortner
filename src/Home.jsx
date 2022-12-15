import React from "react";
import UrlForm from "./UrlForm";
import UrlTable from "./UrlTable";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Link to="/category">
        <button>Manage Categories</button>
      </Link>
      <UrlForm />
      <UrlTable />
    </main>
  );
}
