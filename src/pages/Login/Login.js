import React, { Component, useState } from "react"
import axios from "axios"
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsernameInput(event) {
    setUsername(event.target.value)
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    let res = await axios({
      method: "POST",
      data: { username, password },
      withCredentials: true,
      url: "http://localhost:5000/user/login",
    })

    if (res.data) {
      console.log(username, password)
    }
  }

  return (
    <div>
      <div id="wrap" className="wrapper">
        <div className="title">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input type="text" required onChange={handleUsernameInput} />
            <label>Email Address</label>
          </div>

          <div className="field">
            <input type="password" required onChange={handlePasswordInput} />
            <label>Password</label>
          </div>

          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>

          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <a href="#">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
