import React from "react";
import { Provider } from "react-redux";
// import Routes from "./routes";
import store from "./store";
import "./css/App.css";
import AppBar from "./components/AppBar";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="App-header">
            <h2>Welcome! Food Service Department</h2>
          </div>
          <AppBar />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
