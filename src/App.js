import { render } from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { useState } from "react";
import ThemeContext from "./ThemeContext";
import './style.css';


const App = () => {
  const theme = useState("grey")
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<StrictMode>
  <App />
</StrictMode>,
  document.getElementById("root"));

export default App
