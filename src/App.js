import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AdminPage} />
        <Route path="/:name" component={UserPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
