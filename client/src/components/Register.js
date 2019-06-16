import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  onChange = e => {};

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Register Component</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Name" onChange={this.onChange} />
          <input type="email" placeholder="email" onChange={this.onChange} />
          <input
            type="password"
            placeholder="Password"
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
