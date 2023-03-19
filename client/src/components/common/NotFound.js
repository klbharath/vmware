import * as React from "react";
import { Link } from "react-router-dom";
import "../css/App.css";

export default function NotFound() {
  return (
    <div class="container">
      <h1>404. Page not found.</h1>
      <h1>
        {" "}
        <span class="ascii">(╯°□°）╯︵ ┻━┻</span>
      </h1>
      <Link to="/">Home</Link>
    </div>
  );
}
