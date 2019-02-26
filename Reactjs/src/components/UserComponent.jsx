import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import UserService from "./../services/UserService.jsx";

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "0",
      userName: "",
      emailAddress: "",
      password: "",
      roleId: "",
      errorMsg: "",
      successMsg: "",
      users: []
    };

    this.serv = new UserService();
    this.token = sessionStorage.getItem("token");
    this.RoleName = sessionStorage.getItem("RoleName");

    // if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
    //     var h = this.props.history;
    //     h.push('/login');
    // }
  }

  OnPropertyChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onUserSubmit() {
      
    if (this.state.userId === "0") {
      this.setState({ errormsg: "Please Enter User Id" });
    } 
    else if (this.state.userName === "") {
      this.setState({ errormsg: "Please Enter User Name" });
     }
     else if (this.state.emailAddress === "") {
        this.setState({ errormsg: "Please Enter Email" });
      }
      else if (this.state.password === "") {
        this.setState({ errormsg: "Please Enter Password" });
      }
      else if (this.state.roleId === "") {
        this.setState({ errormsg: "Please Enter Role Id" });
      } else {
        alert("User Created")
      var user = {
        UserId: this.state.userId,
        UserName: this.state.userName,
        EmailAddress: this.state.emailAddress,
        Password: this.state.password,
        RoleId: this.state.roleId
      };

      this.serv
        .postUsers(user, this.token)
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            //console.log(res.message)
            console.log("while binding data of user"+JSON.stringify(user));
            this.setState({ successMsg: res.message });
            this.onClickClear();

            // let tempArray = this.state.users.slice();
            // tempArray.push(res.data);
            // this.setState({ users: tempArray });
          } else {
            this.setState({ errormsg: res.message });
          }
        });
    }
  }

  onClickClear() {
     
      this.setState({userId: "0"});
      this.setState({userName: ""});
      this.setState({emailAddress: ""});
      this.setState({password: ""});
      this.setState({roleId: ""});
  }

//   componentDidMount(){
//     let prds = this.serv.getUsers(this.token)
//                         .then((data) => data.json())
//                         .then((value)=>{
//                            //console.log(JSON.stringify(value.data));
//                            this.setState({users:value.data})
//                         })
//                         .catch(error =>{
//                             console.log(`Error Status ${error.status}`);
//                         });
// }

  render() {
    return (
      <div className="container">
        <HeaderComponent />
        <div className="main-content">
          <div id="newuser">
            <div className="container">
              <div
                id="login-row"
                className="row justify-content-center align-items-center"
              >
                <div id="login-column" className="col-md-6">
                  <div id="login-box" className="col-md-12">
                    <div className="error">{this.state.errormsg}</div>
                    <div className="success">{this.state.successMsg}</div>
                    
                      <h4 className="text-center text-info">Add New User</h4>

                      <div className="form-group">
                        <label htmlFor="userid" className="text-info">
                          UserId:
                        </label>
                        <br />
                        <input
                          type="text"
                          name="userId"
                          id="userid"
                          className="form-control"
                          placeholder="Enter user id"
                          onChange={this.OnPropertyChange.bind(this)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="username" className="text-info">
                          Username:
                        </label>
                        <br />
                        <input
                          type="text"
                          name="userName"
                          id="username"
                          className="form-control"
                          placeholder="Enter user Name"
                          onChange={this.OnPropertyChange.bind(this)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="text-info">
                          Email Address:
                        </label>
                        <br />
                        <input
                          type="email"
                          name="emailAddress"
                          id="email"
                          className="form-control"
                          placeholder="Create Email"
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
                          placeholder="Create Password"
                          onChange={this.OnPropertyChange.bind(this)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="roleid" className="text-info">
                          Role Id:
                        </label>
                        <br />
                        <input
                          type="text"
                          name="roleId"
                          id="roleid"
                          className="form-control"
                          placeholder="Enter Role ID"
                          onChange={this.OnPropertyChange.bind(this)}
                        />

                        {/* <select
                    className="form-control"                
                    name="roleId"
                  > <option>Select Role</option>
                  </select> */}
                      </div>

                      <div className="form-group">
                        <input
                          type="submit"
                          name="submit"
                          className="btn btn-info btn-md"
                          value="Add User"
                          onClick={this.onUserSubmit.bind(this)}
                        />
                        &nbsp;
                        <input
                          type="button"
                          value="Clear"
                          className="btn btn-primary"
                          onClick={this.onClickClear.bind(this)}
                        />
                      </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>        
        <FooterComponent />
      </div>
    );
  }
}

// class TableRow extends Component {
//     constructor(props) {
//       super(props);
//     }
  
//     render() {
//       return (
//         <tr>
//           {Object.keys(this.props.users[0]).map((r, i) => (
//             <td>{this.props.row[r]}</td>
//           ))}
//         </tr>
//       );
//     }
//   }
  

export default UserComponent;
