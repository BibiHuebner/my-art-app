import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Gallery from "./screen/Gallery";
import Header from "./components/Header";
import List from "./screen/List";
import ArtObject from "./components/ArtObject";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from "./screen/Details";

// to do activeClassName="active" end
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:id" component={Details}>
            <Details />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/List" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
