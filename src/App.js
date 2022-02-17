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
import Register from "./screen/Register";
import { ListContextProvider } from "./context/listContext";
import { AuthContextProvider } from "./context/authContext";
import { LikeContextProvider } from "./context/likeContext";
import ProtectedRoute from "./components/ProtectedRoute";

// to do activeClassName="active" end

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Header />
          <ListContextProvider>
            <LikeContextProvider>
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
                <Route exact path="/register">
                  <Register />
                </Route>
                <ProtectedRoute path="/gallery">
                  <Gallery />
                </ProtectedRoute>
                <Route path="/List" component={List} />
              </Switch>
            </LikeContextProvider>
          </ListContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
