import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Gallery from "./screen/Gallery";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
