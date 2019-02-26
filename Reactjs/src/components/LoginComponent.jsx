import React, { Component } from "react";
import LoginService from "../services/LoginService.jsx";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errormsg: ""
    };

    this.serv = new LoginService();
  }

  OnPropertyChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // UserAuthentication() {
  //   //alert(`${this.state.Username} and ${this.state.Password}  wants to log in `);
  //   let user = { 
  //     UserName: this.state.username, 
  //     Password: this.state.password 
  //   };
  //   let history = this.props.history;
  //   this.serv
  //     .userAuth(user)
  //     .then(res => res.json())
  //     .then(resp => {
  //       console.log("api values" + JSON.stringify(resp));
  //       localStorage.setItem("token", `Bearer ${resp.token}`);
  //       if (resp.RoleId == 1) {          
  //         history.push("/home");

  //       } else if (resp.RoleId == 2) {          
  //         history.push("/users");

  //       } else if (resp.RoleId == 3) {
  //         let uId = resp.id;
  //         sessionStorage.setItem("UserId", uId);          
  //         history.push("/");
  //       }
  //     })
  //     .catch(error => console.log(error.status));
  // }
  

  UserAuthentication() {
    var usr = {
      UserName: this.state.username,
      Password: this.state.password,
      ip: "103.76.9.30"
    };
    var h = this.props.history;

    this.serv
      .userAuth(usr)
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
            console.log(res);

          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("roleid", res.RoleId);
          sessionStorage.setItem("username", res.UserName);
          h.push("/home");
        } else {
          this.setState({ errormsg: res.message });
        }
      });
    //console.log(userCrd)
  }

  onClickReset(e) {
    this.setState({ username: "" });
    this.setState({ password: "" });
  }

  render() {
    return (
      <div id="login">
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <h3 className="text-center text-info">Login</h3>
                <div className="error">{this.state.errormsg}</div>

                <div className="form-group">
                  <label htmlFor="username" className="text-info">
                    Username:
                  </label>
                  <br />
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={this.OnPropertyChange.bind(this)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="text-info">
                    Password:
                  </label>
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={this.OnPropertyChange.bind(this)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value="Login"
                    onClick={this.UserAuthentication.bind(this)}
                  />{" "}
                  &nbsp;
                  <input
                    type="button"
                    name="res"
                    className="btn btn-primary btn-md"
                    value="Reset"
                    onClick={this.onClickReset.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
