import React from 'react';
import { useState } from 'react';

import { storeToken } from "../auth";
import { Redirect , Route} from "react-router-dom"




const Login = (props) => {
  const [user, setUser] = useState("");
  const { setAuthorized, setCurrentUser, loggedIn, setLoggedIn } = props;

  function helperHandleSubmit(event) {
    setUser({ ...user, password: event.target.value });
    setCurrentUser(user.username);

  }

  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username, password: user.password }),
      }
    )
      .then((response) => response.json())
      .then((result) => {

        if (result.message === "Logged in!") {
          alert(result.message);
          setAuthorized(result.token)
          setLoggedIn(result.token)
          storeToken(result.token);
        } else {
          alert(result.message);
          
        }
      })
      .catch(console.error);
  };
  if (loggedIn) {
    return <Redirect to="/" />
  }else{
    return (
      <form onSubmit={handleSubmit}>
        <h1> Login:</h1>
        <label>Username:</label>
        <input
          name="Username"
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Password:</label>
        <input type="password" required onChange={(e) => helperHandleSubmit(event)} />
        <button type="submit">submit</button>
      </form>
    );
  }
};





const LogOut = (props) => {
  const { setAuthorized, setCurrentUser, authorized } = props;



  function handleLogout(event) {
    event.preventDefault();
    setAuthorized(false);
    setCurrentUser("");
    <Route exact path="/LogOut">
      <Redirect to="/Login" component={Login} />
    </Route>;
  }

  return (
    <div>
      {authorized ? (
        <div>

          <button onClick={handleLogout}>Log out</button>{" "}
        </div>
      ) : null}
    </div>
  );
};





const Register = (props) => {

  const [user, setUser] = useState("");

  const { setAuthorized, loggedIn, setLoggedIn } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log (user.username)
    console.log (user.password)
    fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username:user.username, password:user.password }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.message === "Signed up!") {
          alert("Signed Up.");
          setAuthorized(result.token)
          setLoggedIn(result.token);
        } else {
          alert(result.message);
        }
      })
      .catch(console.error);
  };
  if (loggedIn) {
    return <Redirect to="/" />
  }else{
    return (
      <form onSubmit={handleSubmit}>
        <h1> Registration:</h1>
        <label>Username:</label>
        <input
          name="Username"
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">submit</button>
      </form>
    );
  }    
};



export { Login, LogOut, Register };