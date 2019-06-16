import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("http://localhost:5000/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => {
        alert(err.response.data.email);
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });

    if (this.state.errors) {
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1>Register Component</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            autoFocus={true}
            onChange={this.onChange}
          />
          <p>{this.state.errors.name}</p>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.onChange}
          />
          <p>{this.state.errors.email}</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.onChange}
          />
          <p>{this.state.errors.password}</p>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={this.onChange}
          />
          <p>{this.state.errors.password2}</p>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
