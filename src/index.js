import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Login, LogOut, Register } from "./components/users"





function App() {

  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  
  return (
    <Router>

      <div>
        <nav>
          <ul>
            {!authorized ? (
              <li>
                <Link to="/Register">Register</Link>
              </li>
            ) : null}
            {!authorized ? (
              <li>
                <Link to="/Login">Login</Link>
              </li>
            ) : null}
            {authorized ? (
              <li>
                <Link to="/LogOut">LogOut</Link>
              </li>
            ) : null}
          </ul>
        </nav>

        <Switch>
          
          <Route path="/Register">
            {!authorized ? <Register setAuthorized={setAuthorized} /> : null}
          </Route>
          <Route path="/Login">
            {!authorized ? (
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setAuthorized={setAuthorized}
                authorized={authorized}
              />
            ) : null}
          </Route>
          
          <Route path="/LogOut">
            <LogOut
              setCurrentUser={setCurrentUser}
              setAuthorized={setAuthorized}
              authorized={authorized}
            />
          </Route>
          
          
        </Switch>
      </div>
    </Router>
  );
}



export default App;







ReactDOM.render(<App />, document.getElementById('root'))

