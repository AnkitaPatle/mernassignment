import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import RoleService from "./../services/RoleService.jsx";

class RoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleid: "0",
      rolename: "",
      errorMsg: "",
      successMsg: "",
      roles: []
    };

    this.serv = new RoleService();
    this.token = sessionStorage.getItem("token");
    //console.log(this.token)
    this.roleName = sessionStorage.getItem("roleName");
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

  RoleSubmit() {
    if (this.state.roleid === "0") {
      this.setState({ errormsg: "Please Enter Role Id" });
    } else if (this.state.rolename === "") {
      this.setState({ errormsg: "Please Enter Role Name" });
    } else {
      var role = {
        RoleId: this.state.roleid,
        RoleName: this.state.rolename
      };

      this.serv
        .postRole(role, this.token)
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            //console.log(res.message)

            this.setState({ successMsg: res.message });
            this.onClickClear();

            let tempArray = this.state.roles.slice();
            tempArray.push(res.data);
            this.setState({ roles: tempArray });
            
          } else {
            this.setState({ errormsg: res.message });
          }
        });
    }
  }

  onClickClear(e) {
    this.setState({ roleid: "0" });
    this.setState({ rolename: "" });
    this.setState({ errorMsg: "" });
  }

  componentDidMount() {
    let prds = this.serv
      .getRoles(this.token)
      .then(data => data.json())
      .then(value => {
        //console.log(JSON.stringify(value.data));
        this.setState({ roles: value.data });
      })
      .catch(error => {
        console.log(`Error Status ${error.status}`);
      });
  }

  render() {
    return (
      <div className="container">
        <HeaderComponent />

        <div className="main-content">
          <div className="row">
            <div className="col-md-3" />

            <div className="col-md-5 role-border">
              <div className="error">{this.state.errormsg}</div>
              <div className="success">{this.state.successMsg}</div>
              <form>
                <div className="form-group">
                  <label htmlFor="roleId"> Role Id</label>
                  <input
                    type="text"
                    className="form-control"
                    name="roleid"
                    onChange={this.OnPropertyChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rolename"> Role Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="rolename"
                    onChange={this.OnPropertyChange.bind(this)}
                  />
                </div>
                <input
                  type="button"
                  value="Submit"
                  className="btn btn-success"
                  onClick={this.RoleSubmit.bind(this)}
                />
                &nbsp;
                <input
                  type="button"
                  value="Clear"
                  className="btn btn-default"
                  onClick={this.onClickClear.bind(this)}
                />
              </form>
            </div>
          </div>
          <br />

          <div className="row roletable">
            <div className="col-md-2" />

            <div className="col-md-8 border-table">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>_Id</th>
                    <th>Role Id</th>
                    <th>Role Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.roles.map((r, i) => (
                    <TableRow key={i} row={r} roles={this.state.roles} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        {Object.keys(this.props.roles[0]).map((r, i) => (
          <td>{this.props.row[r]}</td>
        ))}
      </tr>
    );
  }
}

export default RoleComponent;
